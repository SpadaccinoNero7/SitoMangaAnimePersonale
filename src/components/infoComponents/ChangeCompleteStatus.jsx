import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeCompleteStatus({
  open,
  handleClose,
  value,
  handleAccept,
}) {
  const [input, setInput] = useState(value.completed);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
          Hai completato <strong>{value.title}</strong> ?
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={input} onChange={handleChange}>
              <FormControlLabel value={true} control={<Radio />} label="Si" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={() => handleAccept(input)}>Conferma</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
