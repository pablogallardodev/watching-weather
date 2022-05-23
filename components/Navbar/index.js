import { useState } from "react";
import styles from "styles/navbar.module.css";

const Navbar = ({ location, setLocation, handleSubmit }) => {
  const [viewMenu, setViewMenu] = useState(false);

  return (
    <>
      <div className={styles.head}>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cambiar locación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>🔍</button>
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
        <p>It is a menu</p>
      </div>
    </>
  );
};

export default Navbar;
