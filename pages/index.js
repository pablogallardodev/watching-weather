import Layout from "../components/layout"
import styles from "../styles/home.module.css"

export default function Home({ weather }) {

  return (
    <Layout>
      <h3 className={styles.time}>{weather.localtime}</h3>
      <div className={styles.condition}>
        <img src={weather.conditionIcon} alt={weather.conditionText} />
        <label>{weather.conditionText}</label>
      </div>
      <h2 className={styles.location}>{weather.locationName}</h2>
      <h1 className={styles.temperature}>{Math.round(weather.temperatureC)}<label>°C</label></h1>
    </Layout>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(
    'http://localhost:3000/api/get_current',
    { 
      body: JSON.stringify({ q: 'León' }), 
      method: 'POST' 
    }
  )
  const { data } = await res.json()
  return { weather: data }
}