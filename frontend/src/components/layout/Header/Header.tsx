import {
  faCog,
  faHome,
  faTree,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faTree} size="2x" />
          <h1>TreeLink</h1>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a
                href="/"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FontAwesomeIcon icon={faHome} size="1x" />
                Accueil
              </a>
            </li>
            <li>
              <a
                href="/members"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FontAwesomeIcon icon={faUsers} size="1x" />
                Liste des Membres
              </a>
            </li>
            <li>
              <a
                href="/settings"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FontAwesomeIcon icon={faCog} size="1x" />
                Paramètres
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
