import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Infocard from "components/Infocard";
import Footer from "components/Footer";
import styles from "styles/home.module.css";

const Home = () => {
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
          setWeather(data);
        }
      });
  }, []);

  return (
    <Layout>
      <Navbar location={location} setLocation={setLocation} />
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
