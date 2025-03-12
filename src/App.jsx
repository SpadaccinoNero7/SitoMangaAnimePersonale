import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>App</h1>
      <Link to="animelist">Anime</Link>
      <Link to="mangalist">Manga</Link>
    </div>
  );
}

export default App;
