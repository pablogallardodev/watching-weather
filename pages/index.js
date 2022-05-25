import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { BsGithub, BsInstagram } from 'react-icons/bs'
import Layout from 'components/Layout'
import Spiner from 'components/Spiner'
import styles from 'styles/app.module.css'

import { loginWithGitHub } from 'services/firebase/client'
import useUser from 'hooks/useUser'

const App = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleLogin = () => {
    loginWithGitHub().catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Weather.</span>
          <span>Real time.</span>
          <span>Places.</span>
        </h1>
        <label className={styles.subTitle}>Observe the weather of your favorite places !!!</label>
        { user === null && (
          <button className={styles.btn} onClick={handleLogin}>
            <BsGithub size={24} color="#f5f5f5"/>
            Login whit GitHub
          </button>
        )}
        { user === undefined && <Spiner />}
        <div className={styles.social}>
          <span>By Pablo Gallardo</span>
          <div>
            <a href="https://github.com/pablogallardodev/watching-weather" target="_blank" rel="noreferrer">
              <BsGithub className={styles.git} size={24} title="Ver códgio"/>
            </a>
            <a href="https://www.instagram.com/pablogallardodev/" target="_blank" rel="noreferrer">
              <BsInstagram className={styles.insta} size={24} title="Sigueme en insta..."/>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
