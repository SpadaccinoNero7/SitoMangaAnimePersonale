import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-around bg-black h-[100vh] w-[100vw] text-white">
      <div className=" border-white border self-center">
        <h1>HomePage</h1>
      </div>
      <div className="flex justify-around">
        <div className="bg-cover bg-center w-full p-[10%]">
          <Link to="animelist">
            <img src="../assets/animeSlide.jpg"></img>
          </Link>
        </div>
        <div className="bg-cover bg-center w-full p-[10%]">
          <Link to="animelist">
            <img src="../assets/mangaSlide.jpg"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
