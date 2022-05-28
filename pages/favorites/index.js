import { useEffect, useState } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Spiner from "components/Spiner";
import Favorite from "components/Favorite";
import useUser from "hooks/useUser";
import { getFavorites } from "services/firebase/client";
import styles from "styles/favorite.module.css";

const List = () => {
  const user = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    user && getFavorites().then( favorites => {
      setFavorites(favorites)
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.error(error)
    })
  }, [user])

  return (
    loading ? <Spiner />
    :<> 
      <div className={styles.container}>
      <Navbar list/>
        {favorites.map((f, index) =>
          <Favorite
            key={index}
            location={f.location}
            favorites={favorites}
            setFavorites={setFavorites}
            />
        )}
      </div>
      <Footer />
    </>
  );
};

export default List;