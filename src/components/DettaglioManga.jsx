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
          <strong>Dettagli</strong>{" "}
          <strong>{data.data.title_english || data.data.title}</strong>
        </h1>
        <p>
          <strong>Titolo originale</strong>: {data.data.title}
        </p>
        <p>
          <strong>Generi</strong>:{" "}
          {data.data.genres.map((el) => el.name).join(", ")}
        </p>
        <p>
          <strong>Volumi totali</strong>:{" "}
          {data.data.volumes ? data.data.volumes : "Non terminato"}
        </p>
        <p>
          {!data.data.volumes ? (
            <strong>Capitoli attuali</strong>
          ) : (
            <strong>Capitoli totali</strong>
          )}
          : {data.data.chapters ? data.data.chapters : "Non terminato"}
        </p>
        <p>
          <strong>Punteggio</strong>: {data.data.score} / 10 con{" "}
          {data.data.scored_by} recensioni
        </p>
        <p>
          <strong>Rank</strong>: {data.data.rank}
        </p>
        <p>
          <strong>Tipologia</strong>: {data.data.type}
        </p>
        <p>
          <strong>Anime</strong>:{" "}
          {data.data.relations[0].entry.map((el) => el.name).join(", ")}
        </p>
      </div>
      <img src={data.data.images.jpg.image_url} alt="Immagine copertina" />
    </>
  );
}
