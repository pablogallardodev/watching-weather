import { useEffect, useState } from "react";

import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import Spiner from "components/Spiner";
import History from "components/History";
import useFetch from "hooks/useFetch";
import styles from "styles/home.module.css";

import useUser from "hooks/useUser";
import useWeather from "hooks/useWeather";

const Home = ({ actual = '' }) => {
  useUser()
  useWeather()
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [location, setLocation] = useState(actual);
  const [loading, setLoading] = useState(false);
  const [myLocation, setMyLocation] = useState(actual === '');

  useEffect(() => {
    setLoading(true)
    function success({ coords }) {
      const q = myLocation ? `lat=${coords.latitude}&lon=${coords.longitude}`
        : location || `${coords.latitude},${coords.longitude}`
      useFetch('get_current', q).then(resCurrent => {
        useFetch('get_history', q).then(resHistory => {
          if (!resCurrent.error && !resHistory.error) {
            setWeather(resCurrent.data)
            setHistoryDay(resHistory.data)
            setLoading(false)
            location && setLocation('')
          } else {
            setLoading(false)
          }
        })
      })
    };

    function error(err) {
      console.warn(err.message)
      const q = actual || ''
      useFetch('get_current', q).then(resCurrent => {
        useFetch('get_history', q).then(resHistory => {
          if (!resCurrent.error && !resHistory.error) {
            setWeather(resCurrent.data)
            setHistoryDay(resHistory.data)
            setLoading(false)
            setMyLocation(false)
            location && setLocation('')
          } else {
            setLoading(false)
          }
        })
      })
    };

    myLocation || location
      ? navigator.geolocation.getCurrentPosition(success, error, {})
      : setLoading(false)
  }, [myLocation]);

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
    !loading && weather
      ? <>
        <div className={styles.container} style={weather.isDay ? { backgroundColor: '#0070f330' } : { backgroundColor: '#7F00FF30' }}>
          <Navbar
            location={location}
            setLocation={setLocation}
            handleSubmit={handleSubmit}
            myLocation={myLocation}
            setMyLocation={setMyLocation}
          />

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
          <History historyDay={historyDay} />
        </div>
        <Footer location={weather?.locationName} />
      </>
      : <Spiner />
  );
};

export default Home;
