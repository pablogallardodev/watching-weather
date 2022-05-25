import {
  BsFillDropletFill,
  BsWind,
  BsArrowRight,
  BsFillLightningFill,
} from "react-icons/bs";
import styles from "styles/info.module.css";

const InfoCard = ({ weather }) => {
  return (
    <section className={styles.info}>
      <div title="Humidity">
        <span>{weather?.humidity}%</span>
        <BsFillDropletFill size={24} color="#0070f3" />
      </div>

      <div title="Wind speed">
        <span>{weather?.windSpeed} km/h</span>
        <BsWind size={24} color="#333" />
      </div>

      <div title="Wind direction">
        <span>
          {weather?.windDegree} {weather?.windDir}
        </span>
        <BsArrowRight
          size={24}
          color="#333"
          style={{ transform: `rotate(-${weather?.windDegree}deg)` }}
        />
      </div>

      <div title="UV">
        <span>{weather?.uv}</span>
        <BsFillLightningFill size={24} color="#7F00FF" />
      </div>
    </section>
  );
};

export default InfoCard;
