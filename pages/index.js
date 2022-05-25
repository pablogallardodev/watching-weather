import { BsGithub, BsInstagram } from 'react-icons/bs'
import Layout from 'components/Layout'
import styles from 'styles/app.module.css'

const App = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Clima.</span>
          <span>Tiempo real.</span>
          <span>Lugares.</span>
        </h1>
        <label className={styles.subTitle}>Observa el clima de tus lugares favoritos !!!</label>
        <button className={styles.btn}>
          <BsGithub size={24} color="#f5f5f5"/>
          Iniciar sesión con gitHub
        </button>
        <div className={styles.social}>
          <span>By Pablo Gallardo</span>
          <div>
            <BsGithub size={24} title="Ver códgio"/>
            <BsInstagram size={24} title="Sigueme en insta..."/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
