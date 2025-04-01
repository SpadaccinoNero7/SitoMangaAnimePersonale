import { useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";

export default function TestDettaglio() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/anime/${params.mal_id}/full`
  );

  if (loading) {
    return <Loading />;
  }
  console.log(data.data);
  return (
    <div className="flex flex-col">
      <h1>
        Dettagli <strong>{data.data.title_english || data.data.title}</strong>
      </h1>
      <p>Titolo originale: {data.data.title_japanese}</p>
      <p>Anno di uscita: {data.data.year}</p>
      <p>Episodi totali: {data.data.episodes}</p>
      <p>Stagione: {data.data.season}</p>
      <p>Generi: {data.data.genres.map((el) => el.name).join(", ")}</p>
      <p>
        Punteggio: {data.data.score} / 10 con {data.data.scored_by} recensioni
      </p>
      <p>Film/serie Tv: {data.data.type}</p>
    </div>
  );
}
