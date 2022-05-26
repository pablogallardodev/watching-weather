import { useState } from 'react'
import styles from "styles/footer.module.css";
import { 
  BsHouse, 
  BsBookmarkPlus,
  BsListUl,
  BsCheckCircleFill
} from 'react-icons/bs'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const [save, setSave] = useState(false)

  return (
    <>
    <div className={styles.message} style={save ? { opacity: 1 } : null }>
      <BsCheckCircleFill/>
      <label>Success!!</label>
    </div>
    <div className={styles.footer}>
      <BsBookmarkPlus title="Add to favorites" onClick={() => setSave(!save)}/>
      <BsHouse title="To home" onClick={() => router.replace('/home')}/>
      <BsListUl title="To my locations" onClick={() => router.replace('/list')}/>
    </div>
    </>
  );
};

export default Footer;
