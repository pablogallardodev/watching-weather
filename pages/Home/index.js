import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import useFetch from "hooks/useFetch";
import styles from "styles/home.module.css";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    function success({coords}) {
      useFetch('get_current', `${coords.latitude},${coords.longitude}`).then(response => {
        if (!response.error) setWeather(response.data)
      })
    };
    
    function error(err) { 
      console.warn(err.message)
      useFetch('get_current', '').then(response => {
        if (!response.error) setWeather(response.data)
      })
    };
    
    navigator.geolocation.getCurrentPosition(success, error, {});
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      useFetch('get_current', location).then(response => {
        if (!response.error) setWeather(response.data)
      })
    }
  }

  return (
    <Layout isDay={weather?.isDay}>
      <Navbar location={location} setLocation={setLocation} handleSubmit={handleSubmit}/>
      <h3 className={styles.time}>{weather?.localtime}</h3>

      <h2 className={styles.location}>
        {weather?.locationName}, {weather?.country}
      </h2>

      <h1 className={styles.temperature}>
        {weather?.temperatureC}
        <label>°C</label>
      </h1>

      <span className={styles.feelslike}>
        Sensación termica: {weather?.feelsLikeC} °C
      </span>

      <div className={styles.condition}>
        <img src={weather?.conditionIcon} alt={weather?.conditionText} />
        <label>{weather?.conditionText}</label>
      </div>

      <Infocard weather={weather} />
      <Footer />
    </Layout>
  );
};

export default Home;
