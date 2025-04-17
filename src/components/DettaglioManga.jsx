import { useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";

export default function DettaglioManga() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/manga/${params.mal_id}/full`
  );

  console.log(data);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col">
        <h1>
          Dettagli <strong>{data.data.title_english || data.data.title}</strong>
        </h1>
        <p>Titolo originale: {data.data.title}</p>
        <p>Generi: {data.data.genres.map((el) => el.name).join(", ")}</p>
        <p>
          Volumi totali:{" "}
          {data.data.volumes ? data.data.volumes : "Non terminato"}
        </p>
        <p>
          {!data.data.volumes ? "Capitoli attuali" : "Capitoli totali"}:{" "}
          {data.data.chapters}
        </p>
        <p>
          Punteggio: {data.data.score} / 10 con {data.data.scored_by} recensioni
        </p>
        <p>Tipologia: {data.data.type}</p>
        <p>
          Anime: {data.data.relations[0].entry.map((el) => el.name).join(", ")}
        </p>
      </div>
      <img src={data.data.images.jpg.image_url} alt="Immagine copertina" />
    </>
  );
}
