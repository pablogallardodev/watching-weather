import { useState } from 'react'
import styles from "styles/footer.module.css";
import { 
  BsHouse, 
  BsBookmarkPlus,
  BsListUl,
} from 'react-icons/bs'
import { useRouter } from 'next/router'
import { saveFavorite } from 'services/firebase/client'
import Spiner from 'components/Spiner';
import Message from 'components/Message';

const Footer = ({location}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    view: false,
    error: false,
    text: 'Prueba',
  })

  const handleSave = () => {
    setLoading(true)
    saveFavorite(location).then(res => {
      if (res) {
        setLoading(false)
        setMessage({
          view: true,
          error: false,
          text: 'Save successfully',
        })
      } else {
        setLoading(false)
        setMessage({
          view: true,
          error: true,
          text: 'Already exist',
        })
      }
    }).catch(error => {
      console.error(error)
      setLoading(false)
      setMessage({
        view: true,
        error: true,
        text: 'Error, try again.',
      })
    })

    setInterval(() => {
      setMessage({view: false})
    }, 3000)
  }

  return (
    <>
    <Message message={message}/>
    <div className={styles.footer}>
      {
        loading ? <Spiner />
        : <BsBookmarkPlus title="Add location to favorites" onClick={handleSave}/>
      }
      <BsHouse title="Home" onClick={() => router.replace('/home')}/>
      <BsListUl title="Favorites" onClick={() => router.replace('/favorites')}/>
    </div>
    </>
  );
};

export default Footer;
