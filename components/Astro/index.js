import styles from 'styles/astro.module.css'

const Astro = ({ historyDay }) => {
  const { astro } = historyDay
  return (
    <div className={styles.container}>
      <label>Sunrise: <span>{astro.sunrise}</span></label>
      <label>Sunset: <span>{astro.sunset}</span></label>
      <label>Moonrise: <span>{astro.moonrise}</span></label>
      <label>Moonset: <span>{astro.moonset}</span></label>
      <label>Moon Phase: <span>{astro.moon_phase}</span></label>
      <label>Moon Illumination: <span>{astro.moon_illumination}%</span></label>
    </div>
  );
};

export default Astro;
