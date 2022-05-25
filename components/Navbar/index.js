import { useState } from "react";
import { BsGeoAltFill } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { onSignOut } from 'services/firebase/client'
import Avatar from "components/Avatar";
import styles from "styles/navbar.module.css";

const Navbar = ({ location, setLocation, handleSubmit, myLocation, setMyLocation }) => {
  const [viewMenu, setViewMenu] = useState(false);

  return (
    <>
      <div className={styles.head}>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ex: London"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button title="Change location">🔍</button>
        </form>
        <BsGeoAltFill 
          size={28}
          className={myLocation ? styles.myLocationOn : styles.myLocationOff}
          onClick={() => setMyLocation(true)}
          title="Get my location"
        />
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
        style={viewMenu ? { opacity: 1 } : { opacity: 0 }}
      >
        <Avatar />
        <label className={styles.signout} onClick={onSignOut}>
          Sign Out
          <VscSignOut size={22}/>
        </label>
      </div>
    </>
  );
};

export default Navbar;
