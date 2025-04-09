import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function App() {
  const anime = useSelector((state) => state.anime.data);
  const manga = useSelector((state) => state.manga.data);

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
                <br />
                Anime in lista: {anime.length}
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
          <div className="ease-in duration-[.5s] absolute top-[50%] right-[50%] transform translate-x-[30%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
            <Link to="mangalist">
              <div className="bg-green-500 text-white p-2 rounded">
                Vai alla sezione Manga!
                <br />
                Manga in lista: {manga.length}
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-cover bg-center w-full m-[5%] relative group">
          <div>
            <Tooltip
              title={`Manga in lista: ${manga}`}
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "1rem",
                  },
                },
              }}
              placement="top"
            >
              <Tooltip
                title="Vai alla sezione Manga!"
                followCursor
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "green",
                      color: "white",
                    },
                  },
                }}
              >
                <Box>
                  <img
                    src="../assets/mangaSlide.jpg"
                    className="opacity-[1] block ease-out duration-[.3s] hover:opacity-[.3]"
                  ></img>
                </Box>
              </Tooltip>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
