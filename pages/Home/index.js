import { useEffect, useState } from "react";

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
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [myLocation, setMyLocation] = useState(true);

  useEffect(() => {
    setLoading(true)
    function success({coords}) {
      useFetch('get_current', `${coords.latitude},${coords.longitude}`).then(resCurrent => {
        useFetch('get_history', `${coords.latitude},${coords.longitude}`).then(resHistory => {
          if (!resCurrent.error && !resHistory.error){
            setWeather(resCurrent.data)
            setHistoryDay(resHistory.data)
            setLoading(false)
          } else {
            setLoading(false)
          }
        })
      })
    };
    
    function error(err) { 
      console.warn(err.message)
      useFetch('get_current').then(resCurrent => {
        useFetch('get_history').then(resHistory => {
          if (!resCurrent.error && !resHistory.error){
            setWeather(resCurrent.data)
            setHistoryDay(resHistory.data)
            setLoading(false)
            setMyLocation(false)
          } else {
            setLoading(false)
          }
        })
      })
    };
    
    myLocation 
    ? user && navigator.geolocation.getCurrentPosition(success, error, {})
    : setLoading(false)
  }, [myLocation, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      setLoading(true)
      useFetch('get_current', location).then(resCurrent => {
        useFetch('get_history', location).then(resHistory => {
          if (!resCurrent.error && !resHistory.error) {
            setWeather(resCurrent.data)
            setHistoryDay(resHistory.data)
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
  <Layout isDay={weather?.isDay}>
    <Navbar
      location={location}
      setLocation={setLocation}
      handleSubmit={handleSubmit}
      myLocation={myLocation}
      setMyLocation={setMyLocation}
    />
    {
      !loading ? 
      <>
        <h3 className={styles.time}>{weather?.localtime} TODO add change °C o °F</h3>

        <h2 className={styles.location}>
          {weather?.locationName}, {weather?.country}
        </h2>

        <h1 className={styles.temperature}>
          {Math.round(weather?.temperatureC)}
          <label>°C</label>
        </h1>

        <span className={styles.feelslike}>
          Feels like: {Math.round(weather?.feelsLikeC)} °C
        </span>

        <div className={styles.condition}>
          <img src={weather?.conditionIcon} alt={weather?.conditionText} />
          <label>{weather?.conditionText}</label>
        </div>

        <Infocard weather={weather} />
        <History historyDay={historyDay}/>
      </>
    : <Spiner />}
    <Footer />
  </Layout>
  );
};

export default Home;
