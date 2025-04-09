import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirm({
  open,
  handleClose,
  value,
  handleAccept,
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Vuoi davvero cancellare{" "}
          <strong>
            {value.title}{" "}
            {typeof value.volumes === "number" && `il volume ${value.volumes}`}
          </strong>{" "}
          ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Dopo la conferma{" "}
            <strong>
              <u>NON</u>
            </strong>{" "}
            sarà possibile tornare indietro!
            {typeof value.author === "string" && (
              <p>
                Eliminando il manga perderai{" "}
                <strong>
                  <u>TUTTI</u>
                </strong>{" "}
                {""}i volumi ad esso associati
              </p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleAccept}>Conferma</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
