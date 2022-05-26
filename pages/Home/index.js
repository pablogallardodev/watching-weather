import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import Spiner from "components/Spiner";
import History from "components/History";
import useFetch from "hooks/useFetch";
import styles from "styles/home.module.css";

import useUser from "hooks/useUser";

const Home = () => {
  const user = useUser()
  const router = useRouter()
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [myLocation, setMyLocation] = useState(true);

  useEffect(() => {
    user === null && router.replace('/')
  }, [user])

  useEffect(() => {
    setLoading(true)
    function success({coords}) {
      useFetch('get_current', `${coords.latitude},${coords.longitude}`).then(response => {
        if (!response.error) setWeather(response.data)
      })

      useFetch('get_history', `${coords.latitude},${coords.longitude}`).then(response => {
        if (!response.error) setHistoryDay(response.data)
      })
    };
    
    function error(err) { 
      console.warn(err.message)
      useFetch('get_current').then(response => {
        if (!response.error) setWeather(response.data)
      })

      useFetch('get_history').then(response => {
        if (!response.error) setHistoryDay(response.data)
      })
    };
    
    myLocation && navigator.geolocation.getCurrentPosition(success, error, {});
    setLoading(false)
  }, [myLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      setLoading(true)
      useFetch('get_current', location).then(resW => {
        useFetch('get_history', location).then(resH => {
          if (!resW.error && !resH.error) {
            setWeather(resW.data)
            setHistoryDay(resH.data)
            setLoading(false)
            setLocation('')
            setMyLocation(false)
          } else {
            setLoading(false)
            setMyLocation(true)
          }
        })
      })
    }
  }

  return (
    !loading
    ?<Layout isDay={weather?.isDay}>
      <Navbar
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmit}
        myLocation={myLocation}
        setMyLocation={setMyLocation}
      />
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
      <History historyDay={historyDay}/>
      <Footer />
    </Layout>
    : <Layout>
      <Navbar location={location} setLocation={setLocation} handleSubmit={handleSubmit}/>
      <Spiner />
    </Layout>
  );
};

export default Home;
