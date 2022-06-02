import { initializeApp, getApps } from "firebase/app"
import { 
  getAuth, 
  signInWithPopup, 
  GithubAuthProvider, 
  onAuthStateChanged, 
  signOut
} from "firebase/auth"
import { 
  addDoc, 
  collection,
  doc,
  deleteDoc,
  getDocs, 
  getFirestore,
  query, 
  orderBy,
  where
} from 'firebase/firestore'

const firebaseConfig = {}

!getApps().length && initializeApp(firebaseConfig)
const githubProvider = new GithubAuthProvider()
const db = getFirestore()

const mapToUser = (user) => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onUserChanged = (onChange) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const currentUser = user ? mapToUser(user) : null
    onChange(currentUser)
  })
}

export const loginWithGitHub = () => {
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider);
}

export const onSignOut = () => {
  const auth = getAuth();
  signOut(auth);
}

export const saveFavorite = async (location) => {
  const auth = getAuth()
  const { email } = auth.currentUser
  const collectionRef = collection(db, email)
  
  const q = query(collectionRef, where('location', '==', location))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.size) {
    return false
  } else {
    await addDoc(collectionRef, { location }) 
    return true
  }
}

export const getFavorites = async () => {
  const auth = getAuth()
  const { email } = auth.currentUser
  const collectionRef = collection(db, email)
  const q = query(collectionRef, orderBy('location'))
  return getDocs(q).then(query => query.docs.map(doc => doc.data()))
}

export const deleteFavorite = async (location) => {
  const auth = getAuth()
  const { email } = auth.currentUser
  const collectionRef = collection(db, email)
  const q = query(collectionRef, where('location', '==', location))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(collectionRef, document.id))
  });
}