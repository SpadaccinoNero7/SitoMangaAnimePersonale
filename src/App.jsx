import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-around bg-black h-[100vh] w-[100vw] text-white">
      <div className=" border-white border self-center">
        <h1>HomePage</h1>
      </div>
      <div className="flex justify-around items-center">
        <div className="bg-cover bg-center w-full m-[5%] relative group">
          <div>
            <Link to="animelist">
              <img
                src="../assets/animeSlide.jpg"
                className="opacity-[1] block ease-out duration-[.3s] group-hover:opacity-[.3]"
              ></img>
            </Link>
          </div>
          <div className="ease-in duration-[.5s] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
            <Link to="animelist">
              <div className="bg-green-500 text-white p-2 rounded">
                Vai alla sezione Anime!
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-cover bg-center w-full m-[5%] relative group">
          <div>
            <Link to="mangalist">
              <img
                src="../assets/mangaSlide.jpg"
                className="opacity-[1] block ease-out duration-[.3s] group-hover:opacity-[.3]"
              ></img>
            </Link>
          </div>
          <div className="ease-in duration-[.5s] absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[50%] opacity-0 group-hover:opacity-100">
            <Link to="mangalist">
              <div className="bg-green-500 text-white p-2 rounded">
                Vai alla sezione Manga!
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
