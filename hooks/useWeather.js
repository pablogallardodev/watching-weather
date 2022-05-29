import { useEffect, useState } from 'react'

export default function useWeather(location = 'Paris') {
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = (endPoint) => {
    return fetch(`/api/${endPoint}`, {
      body: JSON.stringify({ q: location }),
      method: 'POST',
    }).then((res) => res.json());
  }

  useEffect(() => {
    // Get current information
    fetchData('get_current').then((data) => {
      console.log(data);
    })
  }, location);

  return { weather, historyDay, loading }
}