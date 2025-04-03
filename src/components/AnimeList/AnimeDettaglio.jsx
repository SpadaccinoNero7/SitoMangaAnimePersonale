import { useParams } from "react-router-dom";
import { useFetch } from "../customHooks/useFetch";
import Loading from "../infoComponents/Loading";
import { useSelector } from "react-redux";

export default function AnimeDettaglio() {
  const params = useParams();
  const selectedAnimeId = useSelector((state) => state.anime.selectedAnimeId);

  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime/${selectedAnimeId}/full`
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <h1>
        Dettaglio <strong>{data.data.title_english || data.data.title}</strong>
      </h1>
    </>
  );
}
