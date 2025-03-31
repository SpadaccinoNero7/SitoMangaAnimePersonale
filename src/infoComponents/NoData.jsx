import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NoData({ variant }) {
  return (
    <>
      <div className="flex justify-center mb-auto flex-col items-center">
        <div>
          <h1 className={`text-${variant}`}>
            Non ci sono dati al momento, aggiungine almeno uno per vedere la
            lista!
          </h1>
        </div>
        <br />
        <div>
          <Link to={-1}>
            <Button color="warning" variant="contained">
              Oppure torna indietro
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
