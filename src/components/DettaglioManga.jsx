import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "./customHooks/useFetch";
import Loading from "./infoComponents/Loading";
import { Tooltip } from "@mui/material";
import ChooseAnime from "./MangaList/ChooseAnime";
import AdattamentoType from "./AdattamentoType";

export default function DettaglioManga() {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://api.jikan.moe/v4/manga/${params.mal_id}/full`
  );

  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }
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
          <AdattamentoType
            data={data}
            request={"Adaptation"}
            title={"Adattamento"}
          />
          {data.data.relations.find((el) => el.relation === "Adaptation").entry
            .length > 2 ? (
            <p>
              <strong>Anime</strong>:{" "}
              {data.data.relations.find((el) => el.relation === "Adaptation")
                .entry.length > 0 ? (
                <ChooseAnime values={data.data.mal_id} />
              ) : (
                <>
                  <a
                    target="_blank"
                    href={data.data.relations[0].entry.map((el) => el.url)}
                  >
                    Vedi il primo di molti
                  </a>
                </>
              )}
            </p>
          ) : null}
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
