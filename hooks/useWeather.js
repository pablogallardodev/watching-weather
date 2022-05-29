import { useEffect, useState } from 'react'

export default function useWeather(location = '') {
  const [weather, setWeather] = useState(null);
  const [historyDay, setHistoryDay] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async (endPoint) => {
    const response = await fetch(`/api/${endPoint}`, {
      body: JSON.stringify({ q: location }),
      method: 'POST',
    });

    return response.json();
  }

  useEffect(() => {
    // Get current information
    fetchData('get_current').then((data) => {
      console.log(data);
    })
  }, location);

  return { weather, historyDay, loading }
}