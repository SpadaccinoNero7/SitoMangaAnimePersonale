import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";
import { Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

export default function DettaglioAnime() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/anime/${params.mal_id}/full`
  );
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const status = [
    {
      original: "Currently Airing",
      translated: "In corso",
    },
    {
      original: "Finished Airing",
      translated: "Terminato",
    },
    {
      original: "Not yet aired",
      translated: "In arrivo",
    },
  ];

  const stato =
    status.find((el) => el.original === data.data.status)?.translated ||
    "Stato sconosciuto";

  const seasons = [
    {
      original: "summer",
      translated: "Estate",
    },
    {
      original: "winter",
      translated: "Inverno",
    },
    {
      original: "spring",
      translated: "Primavera",
    },
    {
      original: "fall",
      translated: "Autunno",
    },
  ];

  const stagione =
    seasons.find((el) => el.original === data.data.season)?.translated ||
    "Stagione sconosciuta";

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center m-25">
        <strong>{data.data.title_english || data.data.title}</strong>
      </div>
      <div className="flex justify-between h-100 items-center border-2 border-gray-300 rounded-lg p-5 relative">
        <div className="flex justify-center items-center mr-5">
          <img src={data.data.images.jpg.image_url} alt="Immagine copertina" />
        </div>
        <div className="flex flex-col">
          <p>
            <strong>Titolo originale</strong>: {data.data.title}
          </p>
          <p>
            {data.data.genres.length > 1 ? (
              <strong>Generi: </strong>
            ) : (
              <strong>Genere: </strong>
            )}
            {data.data.genres.map((el) => el.name).join(", ")}
          </p>
          <p>
            <strong>Episodi totali</strong>:{" "}
            {data.data.episodes ? data.data.episodes : "Non ancora specificato"}
          </p>
          <p>
            <strong>Stato</strong>: {stato}
          </p>
          <p>
            <strong>Punteggio</strong>:{" "}
            {data.data.score
              ? `${data.data.score} / 10 con ${data.data.scored_by} recensioni`
              : "Non ancora disponibile"}
          </p>
          <p>
            <strong>Rank</strong>:{" "}
            {data.data.rank ? data.data.rank : "Non ancora disponibile"}
          </p>
          <p>
            <strong>Tipologia</strong>: {data.data.type}
          </p>
          <p>
            <strong>Adattato da</strong>: {data.data.source}
          </p>
          {data.data.relations.find((el) => el.relation === "Prequel") ? (
            <p>
              <strong>Prequel</strong>:{" "}
              <a
                target="_blank"
                href={
                  data.data.relations.find((el) => el.relation === "Prequel")
                    .entry[0].url
                }
              >
                {
                  data.data.relations.find((el) => el.relation === "Prequel")
                    .entry[0].name
                }
              </a>
            </p>
          ) : null}
          {data.data.relations.find((el) => el.relation === "Sequel") ? (
            <p>
              <strong>Sequel</strong>:{" "}
              <a
                target="_blank"
                href={
                  data.data.relations.find((el) => el.relation === "Sequel")
                    .entry[0].url
                }
              >
                {
                  data.data.relations.find((el) => el.relation === "Sequel")
                    .entry[0].name
                }
              </a>
            </p>
          ) : null}
          <p>
            <strong>Anno di uscita</strong>: {stagione} {""}
            {data.data.year}
          </p>
        </div>
      </div>
      <div className="flex justify-around items-center absolute bottom-0 w-full p-5">
        <div onClick={() => navigate(-1)}>
          <Tooltip title="Torna indietro">
            <ArrowBackIcon className="cursor-pointer" />
          </Tooltip>
        </div>
        <div onClick={() => navigate("/")}>
          <Tooltip title="Torna alla home">
            <HomeIcon className="cursor-pointer" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
