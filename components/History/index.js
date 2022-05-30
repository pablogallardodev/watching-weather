import styles from 'styles/history.module.css'

const History = ({ historyDay, isC }) => {
  const { hours } = historyDay
  return (
    <div className={styles.container}>
      {
        hours?.map((hour, index) => {
          return (
            <div 
              key={index} 
              className={styles.day}
              style={{background: 
                `linear-gradient(360deg, #ffc00060 ${Math.round(hour.temperatureC)}%, #f5f5f5 ${Math.round(hour.temperatureC)+15}%)`}}
              >
              <label>{ isC ? Math.round(hour.temperatureC) : Math.round(hour.temperatureF) }°</label>
              <img src={hour.icon} alt={hour.hour}/>
              <span>{hour.hour}</span>
            </div>
          )
        })
      }
    </div>
  );
};

export default History;
