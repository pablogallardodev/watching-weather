import { useEffect, useState } from "react";

import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import Spiner from "components/Spiner";
import History from "components/History";
import styles from "styles/home.module.css";

import useUser from "hooks/useUser";
import useWeather from "hooks/useWeather";

const Home = ({searchLocation}) => {
  useUser()
  const [location, setLocation] = useState('')
  const [getLocation, setGetLocation] = useState(searchLocation === undefined)
  const [myLocation, setMyLocation] = useState(null)
  const { weather, loading, historyDay } = useWeather(myLocation)
  
  useEffect(() => {
    function hanldeSuccess({ coords }) {
      setMyLocation(`lat=${coords.latitude}&lon=${coords.longitude}`)
    };
    
    function handleError(err) {
      console.warn(err.message)
      setMyLocation('Guanajuato')
      setGetLocation(false)
    };

    searchLocation && !getLocation
      ?setMyLocation(searchLocation)
      :getLocation && navigator.geolocation.getCurrentPosition(hanldeSuccess, handleError, {})
  }, [getLocation]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    location && setMyLocation(location)
    setGetLocation(false)
    setLocation('')
  }

  return (
    !loading && weather
      ? <>
        <div className={styles.container} style={weather.isDay ? { backgroundColor: '#0070f330' } : { backgroundColor: '#7F00FF30' }}>
          <Navbar
            location={location}
            setLocation={setLocation}
            handleSubmit={handleSubmit}
            getLocation={getLocation}
            setGetLocation={setGetLocation}
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
