import { useEffect, useState } from "react";
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import Spiner from "components/Spiner";
import History from "components/History";
import styles from "styles/home.module.css";

import useUser from "hooks/useUser";
import useWeather from "hooks/useWeather";
import Astro from "components/Astro";

const Home = ({searchLocation}) => {
  useUser()
  const [isC, setIsC] = useState(true)
  const [location, setLocation] = useState('')
  const [getLocation, setGetLocation] = useState(searchLocation === undefined)
  const [myLocation, setMyLocation] = useState(searchLocation)
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
    
    getLocation && navigator.geolocation.getCurrentPosition(hanldeSuccess, handleError, {})
  }, [getLocation]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    location && setMyLocation(location)
    setGetLocation(false)
    setLocation('')
  }

  return (
    <>
      <div className={styles.container} style={!loading && weather.isDay ? { backgroundColor: '#0070f330' } : { backgroundColor: '#7F00FF30' }}>
        <Navbar
          location={location}
          setLocation={setLocation}
          handleSubmit={handleSubmit}
          getLocation={getLocation}
          setGetLocation={setGetLocation}
        />

        {
        !loading ?
        <>
          <h3 className={styles.time}>
            {weather.localtime}
            <label>
              °F
              { isC 
                ? <BsToggleOn size={26} onClick={() => setIsC(!isC)} color="#0070f3"/>
                : <BsToggleOff size={26} onClick={() => setIsC(!isC)}/>
              }
              °C
            </label>
          </h3>

          <h2 className={styles.location}>
            {weather?.locationName}, {weather?.country}
          </h2>

          <h1 className={styles.temperature}>
            { isC ? Math.round(weather?.temperatureC) : Math.round(weather?.temperatureF) }
            <label>{ isC ? '°C' : '°F'}</label>
          </h1>

          <span className={styles.feelslike}>
            Feels like: { isC ? Math.round(weather?.feelsLikeC) : Math.round(weather?.feelsLikeF)} { isC ? '°C' : '°F'}
          </span>

          <div className={styles.condition}>
            <img src={weather?.conditionIcon} alt={weather?.conditionText} />
            <label>{weather?.conditionText}</label>
          </div>

          <Infocard weather={weather} />
          <History historyDay={historyDay} isC={isC}/>
          <Astro historyDay={historyDay}/>
          
        </>
        : <Spiner/>
        }        
      </div>
      <Footer location={weather?.locationName} />
    </>
  );
};

export default Home;
