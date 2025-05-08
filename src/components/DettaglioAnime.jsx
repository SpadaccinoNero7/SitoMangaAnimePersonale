import { useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";

export default function DettaglioAnime() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/anime/${params.mal_id}/full`
  );

  const image = useFetch(
    `https://api.jikan.moe/v4/anime/${params.mal_id}/pictures`
  );

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
  console.log(data);

  const stagione =
    seasons.find((el) => el.original === data.data.season)?.translated ||
    "Stagione sconosciuta";
  return (
    <div className="flex justify-around items-center">
      <img
        src={data.data.images.jpg.large_image_url}
        alt="Immagine copertina"
      />
      <div className="flex flex-col">
        <h1 className="self-center mb-5">
          Dettagli <strong>{data.data.title_english || data.data.title}</strong>
        </h1>
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
          <strong>Adattamento</strong>:{" "}
          <a
            target="_blank"
            href={data.data.relations[0].entry.map((el) => el.url)}
          >
            {data.data.relations[0].entry.map((el) => el.name).join(", ")}
          </a>
        </p>
        <p>
          <strong>Anno di uscita</strong>: {stagione} {""}
          {data.data.year}
        </p>
      </div>
    </div>
  );
}
