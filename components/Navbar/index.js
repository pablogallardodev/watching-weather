import { useState } from "react";
import { BsArrowLeftSquare } from 'react-icons/bs'
import { onSignOut } from 'services/firebase/client'
import Avatar from "components/Avatar";
import styles from "styles/navbar.module.css";

const Navbar = ({ location, setLocation, handleSubmit }) => {
  const [viewMenu, setViewMenu] = useState(false);

  return (
    <>
      <div className={styles.head}>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ej: London"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button title="Cambiar ubicación">🔍</button>
        </form>
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
        <button className={styles.signout} onClick={onSignOut}>
          Sign Out
          <BsArrowLeftSquare/>
        </button>
      </div>
    </>
  );
};

export default Navbar;
