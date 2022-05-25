import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import Spiner from "components/Spiner";
import useFetch from "hooks/useFetch";
import styles from "styles/home.module.css";

import useUser from "hooks/useUser";

const Home = () => {
  const user = useUser()
  const router = useRouter()
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user === null && router.replace('/')
  }, [user])

  useEffect(() => {
    setLoading(true)
    function success({coords}) {
      useFetch('get_current', `${coords.latitude},${coords.longitude}`).then(response => {
        if (!response.error) {
          setWeather(response.data)
          setLoading(false)
        }
      })
    };
    
    function error(err) { 
      console.warn(err.message)
      useFetch('get_current').then(response => {
        if (!response.error) {
          setWeather(response.data)
          setLoading(false)
        }
      })
    };
    
    navigator.geolocation.getCurrentPosition(success, error, {});
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      setLoading(true)
      useFetch('get_current', location).then(response => {
        if (!response.error) {
          setWeather(response.data)
          setLoading(false)
          setLocation('')
        } else {
          setLoading(false)
        }
      })
    }
  }

  return (
    !loading
    ?<Layout isDay={weather?.isDay}>
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
    : <Layout>
      <Navbar location={location} setLocation={setLocation} handleSubmit={handleSubmit}/>
      <Spiner />
    </Layout>
  );
};

export default Home;
