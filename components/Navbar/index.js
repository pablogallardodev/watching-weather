import { useState } from "react";
import { BsGeoAltFill } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { onSignOut } from 'services/firebase/client'
import Avatar from "components/Avatar";
import styles from "styles/navbar.module.css";

const Navbar = ({ location, setLocation, handleSubmit, getLocation, setGetLocation, list }) => {
  const [viewMenu, setViewMenu] = useState(false);

  const handleSignOut = () => {
    setViewMenu(!viewMenu);
    onSignOut();
  }

  return (
    <>
      <div className={styles.head}>
        {!list && 
          <form className={styles.search} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="ex: London"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button title="Change location">🔍</button>
          </form>
        }
        { !list &&
          <BsGeoAltFill 
            size={28}
            className={getLocation ? styles.myLocationOn : styles.myLocationOff}
            onClick={() => setGetLocation(true)}
            title="Get my location"
          />
        }
        { list && <h2>My favourite places</h2>}
        <div
          className={viewMenu ? styles.active : styles.menu}
          onClick={() => setViewMenu(!viewMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={styles.content}
        style={viewMenu ? { display: 'flex' } : { display: 'none' }}
      >
        <Avatar />
        <label className={styles.signout} onClick={handleSignOut}>
          Sign Out
          <VscSignOut size={22}/>
        </label>
      </div>
    </>
  );
};

export default Navbar;
