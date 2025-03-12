import { Link } from "react-router-dom";
import styles from "./main.module.scss";

function App() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <h1>HomePage</h1>
      </div>
      <div className={styles.animeSection}>
        <Link to="animelist">Anime</Link>
      </div>
      <div className={styles.mangaSection}>
        <Link to="mangalist">Manga</Link>
      </div>
    </div>
  );
}

export default App;
