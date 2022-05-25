import { initializeApp, getApps } from "firebase/app"
import { 
  getAuth, 
  signInWithPopup, 
  GithubAuthProvider, 
  onAuthStateChanged, 
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf2G5_9Ykeh0rs7VzUA2JMsxTqBjTq3PE",
  authDomain: "weather-app-eb662.firebaseapp.com",
  projectId: "weather-app-eb662",
  storageBucket: "weather-app-eb662.appspot.com",
  messagingSenderId: "872723034257",
  appId: "1:872723034257:web:3ee8566ac110ca74488f30",
  measurementId: "G-C99YWZDB5H"
};

!getApps().length && initializeApp(firebaseConfig);
const githubProvider = new GithubAuthProvider();

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