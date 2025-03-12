import "./mangaList.css";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function createData(title, author, isCompleted) {
  return {
    title,
    author,
    isCompleted,
    history: [
      {
        date: "2020-01-05",
        volume: 1,
        price: 3,
      },
      {
        date: "2020-01-02",
        volume: 3,
        price: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ color: "red" }}>
          <Typography sx={{ fontWeight: "bold" }}>{row.title}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography sx={{ fontWeight: "bold" }}>{row.author}</Typography>
        </TableCell>
        <TableCell align="right">
          {row.isCompleted ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="warning" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dettaglio
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data acquisto</TableCell>
                    <TableCell align="left">Volume</TableCell>
                    <TableCell align="center">Prezzo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="left">{historyRow.volume}</TableCell>
                      <TableCell align="center">{historyRow.price}</TableCell>
                      {/*                       <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    author: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        volume: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData("titolo1", "autore1", false),
  createData("titolo2", "autore2", true),
  createData("titolo3", "autore3", false),
  createData("titolo4", "autore4", true),
  createData("titolo5", "autore5", true),
];

export default function TabellaPerfetta() {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", position: "absolute", top: "35%", right: "5%" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "black" }}>
            <TableCell />
            <TableCell sx={{ color: "white" }}>
              <Typography variant="h6" gutterBottom component="div">
                Titolo
              </Typography>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              <Typography variant="h6" gutterBottom component="div">
                Autore
              </Typography>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              <Typography variant="h6" gutterBottom component="div">
                Completata
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
