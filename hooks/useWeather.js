import { useEffect, useState } from 'react'

export default function useWeather(location, onlyCurrent = false) {
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = (endPoint) => {
    return fetch(`/api/${endPoint}`, {
      body: JSON.stringify({ q: location }),
      method: 'POST',
    }).then((res) => res.json())
    .then( data => data );
  }

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchData('get_current').then((currentData) => {        
        if (onlyCurrent) {
          setWeather(currentData.data);
          setLoading(false);
        } else { 
          fetchData('get_history').then((historyData) => {
            if (!currentData.error && !historyData.error) {
              setWeather(currentData.data);
              setHistoryDay(historyData.data);
              setLoading(false);
            } else {
              setLoading(false)
            }
          })
        }
      })
    }
  }, [location]);

  return { weather, historyDay, loading }
}