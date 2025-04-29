import { useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";

export default function DettaglioAnime() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/anime/${params.mal_id}/full`
  );

  if (loading) {
    return <Loading />;
  }

  console.log(data);

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
      transalted: "Inverno",
    },
    {
      original: "spring",
      transalted: "Primavera",
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
    <>
      <div className="flex flex-col">
        <h1>
          Dettagli <strong>{data.data.title_english || data.data.title}</strong>
        </h1>
        <p>Titolo originale: {data.data.title}</p>
        <p>Generi: {data.data.genres.map((el) => el.name).join(", ")}</p>
        <p>
          Episodi totali:{" "}
          {data.data.episodes ? data.data.episodes : "Non ancora specificato"}
        </p>
        <p>Stato: {stato}</p>
        <p>
          Punteggio:{" "}
          {data.data.score
            ? `${data.data.score} / 10 con ${data.data.scored_by} recensioni`
            : "Non ancora disponibile"}
        </p>
        <p>Tipologia: {data.data.type}</p>
        <p>
          Adattamento:{" "}
          {data.data.relations[0].entry.map((el) => el.name).join(", ")}
        </p>
        <p>
          Anno di uscita: {stagione} {""}
          {data.data.year}
        </p>
      </div>
      <img src={data.data.images.jpg.image_url} alt="Immagine copertina" />
    </>
  );
}
