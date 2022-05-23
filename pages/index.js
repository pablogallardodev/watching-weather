import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import styles from "styles/home.module.css";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  useEffect(() => {
    fetch("/api/get_current", {
      body: JSON.stringify({ q: location }),
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        if (!error) {
          console.log(data);
          setWeather(data);
        }
      });
  }, []);

  return (
    <Layout>
      <Navbar location={location} setLocation={setLocation} />
      <h3 className={styles.time}>{weather?.localtime}</h3>
      <div className={styles.condition}>
        <img src={weather?.conditionIcon} alt={weather?.conditionText} />
        <h1 className={styles.temperature}>
          {weather?.temperatureC}
          <label>°C</label>
        </h1>
        <label>{weather?.conditionText}</label>
      </div>
      <h2 className={styles.location}>{weather?.locationName}</h2>
      <p>Sensación termica: {weather?.feelsLikeC}°C</p>
      <div>
        <p>Humedad: {weather?.humidity}%</p>
        <p>Viento: {weather?.windSpeed}km/h</p>
        <p>
          Velocidad: {weather?.windDegree} {weather?.windDir}
        </p>
        <p>UV: {weather?.uv}</p>
      </div>
    </Layout>
  );
}
