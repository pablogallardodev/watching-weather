import { useEffect, useState } from 'react'
import { BsTrash, BsBoxArrowInUpRight } from 'react-icons/bs'
import styles from 'styles/favorite.module.css'
import useFetch from 'hooks/useFetch'
import { deleteFavorite } from 'services/firebase/client'
import { useRouter } from 'next/router'

const Favorite = ({ location, favorites, setFavorites }) => {
  const router = useRouter()
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    useFetch('get_current', `${location}`).then(resCurrent => {
      setWeather(resCurrent.data)
    })
  }, [])

  const handleGoTo = () => {
    router.replace(`/home/${location}`)
  }

  const handleDelete = () => {
    deleteFavorite(location)
    setFavorites(favorites.filter(f => f.location !== location))
  }

  return weather
  ? <div className={styles.item} style={weather.isDay ? {backgroundColor: '#0070f330'} : {backgroundColor: '#7F00FF30'}}>
      <img src={weather?.conditionIcon} alt={weather?.conditionText} />
      <div className={styles.info}>
        <label>{location}, {weather.country}</label>  
        <label>{weather.conditionText}, {Math.round(weather?.temperatureC)} °C</label>
      </div>
      <BsBoxArrowInUpRight color="#0070f3" title='Go' onClick={handleGoTo}/>
      <BsTrash color='#dc2626' title='Delete' onClick={handleDelete}/>
    </div>
  : null
}

export default Favorite;