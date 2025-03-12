import { Link } from "react-router-dom";
import styles from "./main.module.scss";

function App() {
  return (
    <div className={styles.body}>
      <h1>App</h1>
      <Link to="animelist">Anime</Link>
      <Link to="mangalist">Manga</Link>
    </div>
  );
}

export default App;
