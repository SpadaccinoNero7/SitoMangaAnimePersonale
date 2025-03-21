import { Link } from "react-router-dom";
import styles from "./main.module.scss";

function App() {
  return (
    <div className="flex flex-col justify-around bg-black h-[100vh] w-[100vw] text-white">
      <div className=" border-white border self-center">
        <h1>HomePage</h1>
      </div>
      <div className="flex w-auto justify-around">
        <div className="border-white border">
          <Link to="animelist">Anime</Link>
        </div>
        <div className="border-white border">
          <Link to="mangalist">Manga</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
