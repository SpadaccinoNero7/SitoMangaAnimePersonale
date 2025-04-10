import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MangaListInput from "./MangaListInput";
import { deleteMangaAsync, getMangaAsync, putMangaAsync } from "./mangaSlice";
import { useEffect, useState } from "react";
import Loading from "../infoComponents/Loading";
import Error from "../infoComponents/Error";
import NoData from "../infoComponents/NoData";
import MangaListPut from "./MangaListPut";
import DeleteConfirm from "../infoComponents/DeleteConfirm";
import ChangeCompleteStatus from "../infoComponents/ChangeCompleteStatus";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

function Row(props) {
  const { row } = props;
  const [openDetails, setOpenDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModes, setEditModes] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAccept = (id) => {
    dispatch(deleteMangaAsync(id));
    setOpen(null);
  };

  const toggleEditMode = (id) => {
    setEditModes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePutComplete = (id, title, author, value) => {
    dispatch(
      putMangaAsync({
        id: id,
        title: title,
        author: author,
        completed: value,
      })
    );
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenDetails(!openDetails)}
          >
            {openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ color: "red" }}>
          <Typography sx={{ fontWeight: "bold" }}>{row.title}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography sx={{ fontWeight: "bold" }}>{row.author}</Typography>
        </TableCell>
        <TableCell align="right">
          {editModes && (
            <ChangeCompleteStatus
              value={row}
              handleClose={() => toggleEditMode(row.id)}
              open={editModes[row.id]}
              handleAccept={(newValue) => {
                handlePutComplete(row.id, row.title, row.author, newValue);
                toggleEditMode(row.id);
              }}
            />
          )}
          {row.completed ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="warning" />
          )}
        </TableCell>
        <TableCell align="right">
          <DeleteIcon
            onClick={() => handleOpen(row.id)}
            style={{ cursor: "pointer" }}
          />
          {open === row.id && (
            <DeleteConfirm
              open={true}
              handleClose={handleClose}
              value={row}
              handleAccept={() => handleAccept(row.id)}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openDetails} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Link
                  to={`/singleManga/${row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="h6" gutterBottom>
                    Dettaglio
                  </Typography>
                </Link>
                <Typography
                  variant="h6"
                  gutterBottom
                  onClick={() => toggleEditMode(row.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {editModes[row.id] ? "Modifica in corso..." : "Modifica"}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="right"
                  sx={{ width: "100%" }}
                >
                  Volumi acquistati:{row.detailsMangas.length}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        volumes: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function MangaList() {
  const { data, loading, error } = useSelector((state) => state.manga);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMangaAsync());
  }, [dispatch]);

  {
    loading && <Loading />;
  }

  {
    error && <Error error={error} />;
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const width = window.innerWidth;

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-end items-center pr-5"
      style={{
        backgroundImage:
          data && data.length > 0
            ? "url(/assets/wallpaper-sitopersonale-manga.jpg)"
            : "url(/assets/sao.jpg)",
      }}
    >
      <div className="absolute left-5">
        <MangaListInput />
      </div>
      <div className="w-[50%]">
        {data.length != 0 ? (
          <TableContainer
            component={Paper}
            /* sx={{ width: "50%", position: "absolute", top: "35%", right: "5%" }} */
          >
            <Table
              aria-label="collapsible table"
              size={width <= 1272 ? "small" : "medium"}
            >
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
                  <TableCell sx={{ color: "white" }} align="right">
                    <Typography variant="h6" gutterBottom component="div">
                      Elimina
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row) => (
                  <Row key={row.id} row={row} />
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow className="flex justify-between items-center">
                  <TableCell colSpan={1}>
                    <Link to="/">
                      <HomeIcon />
                    </Link>
                  </TableCell>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={() => {
                      ``;
                    }}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          <NoData variant={"black"} />
        )}
      </div>
    </div>
  );
}
