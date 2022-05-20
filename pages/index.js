import Layout from "../components/layout"

export default function Home({ weather }) {

  return (
    <Layout>
      <img src={weather.conditionIcon} alt={weather.conditionText}/>
      <p>{weather.conditionText}</p>
      <p>{weather.country}</p>
      <p>{weather.localtime}</p>
      <p>{weather.locationName}</p>
      <p>{weather.humidity}</p>
      <p>{weather.isDay}</p>
      <p>{weather.feelsLike}</p>
      <p>{weather.temperature}</p>
      <p>{weather.windSpeed}</p>
      <p>{weather.windDir}</p>
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