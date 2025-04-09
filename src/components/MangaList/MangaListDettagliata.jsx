import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MangaListDettagliataInput from "./MangaListDettagliataInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteMangaAsync, getMangaAsync, putMangaAsync } from "./mangaSlice";
import { useEffect, useMemo, useState } from "react";
import Loading from "../infoComponents/Loading";
import NoData from "../infoComponents/NoData";
import MangaDettaglioPut from "./MangaDettaglioPut";
import { putMangaDettaglioAsync } from "./mangaDettaglioSlice";
import TotalPriceMangaDettaglio from "../infoComponents/TotalPriceMangaDettaglio";

/* function createData(id, volumes, date, price) {
  return {
    id,
    volumes,
    date,
    price,
  };
} */

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "volumes",
    numeric: true,
    disablePadding: true,
    label: "Volumi",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Data acquisto",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Prezzo",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    /* numSelected, */
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  /* numSelected: PropTypes.number.isRequired, */
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const params = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.manga);

  useEffect(() => {
    dispatch(getMangaAsync());
  }, [dispatch]);
  const mangaId = data ? Number(params.mangaId) : null;

  const manga = data ? data.find(({ id }) => id === mangaId) : [];

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%", backgroundColor: "black", color: "white" }}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
      >
        {manga ? <strong>{manga.title}</strong> : <Loading />}
      </Typography>
      <Tooltip title="Filtra">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  handleRemove: PropTypes.func.isRequired,
};

export default function MangaListDettagliata() {
  const params = useParams();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("volumes");

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const [editModes, setEditModes] = useState([]);

  const [open, setOpen] = useState(null);

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

  /*   const { data } = useFetch("http://localhost:8080/manga/manga");
  const mangaId = data ? Number(params.mangaId) : null;
  
  const manga = data ? data.find(({ id }) => id === mangaId) : null;
  const mangaDetails = manga ? manga.detailsMangas : []; */

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.manga);

  useEffect(() => {
    dispatch(getMangaAsync());
  }, [dispatch]);

  const mangaId = data ? Number(params.mangaId) : null;
  const manga = data ? data.find(({ id }) => id === mangaId) : null;
  const mangaDetails = manga ? manga.detailsMangas : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePutComplete = (id, volumes, dateValue, priceValue) => {
    dispatch(
      putMangaDettaglioAsync({
        id: id,
        volumes: volumes,
        date: dateValue,
        price: priceValue,
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    page > 0 && mangaDetails
      ? Math.max(0, (1 + page) * rowsPerPage - mangaDetails.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      mangaDetails
        ? [...mangaDetails]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [order, orderBy, page, rowsPerPage, mangaDetails]
  );

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function total(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const invoiceTotal = total(mangaDetails);

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex items-center justify-between"
        style={{
          backgroundImage:
            mangaDetails && mangaDetails.length > 0
              ? "url(/assets/wallpaper-sitopersonale-manga.jpg)"
              : "url(/assets/marin.jpg)",
        }}
      >
        <div>
          <MangaListDettagliataInput manga={manga} />
        </div>
        <Box sx={{ width: "50%" }}>
          {mangaDetails.length != 0 ? (
            <Paper sx={{ width: "50%" }}>
              <EnhancedTableToolbar />
              <TableContainer>
                <Table
                  sx={{ minWidth: 400 }}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={mangaDetails ? mangaDetails.length : 0}
                  />
                  <TableBody>
                    {visibleRows.map((manga, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isEditMode = editModes[manga.id] || false;

                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={manga.volumes}
                          >
                            <TableCell padding="checkbox">
                              {!isEditMode ? (
                                <EditIcon
                                  onClick={() => {
                                    toggleEditMode(manga.id);
                                  }}
                                />
                              ) : (
                                <CheckIcon
                                  onClick={() => {
                                    toggleEditMode(manga.id);
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {isEditMode ? (
                                <>
                                  <MangaDettaglioPut
                                    manga={manga}
                                    handleClose={() => toggleEditMode(manga.id)}
                                    open={isEditMode}
                                    handleAccept={(dateValue, priceValue) => {
                                      handlePutComplete(
                                        manga.id,
                                        manga.volumes,
                                        dateValue,
                                        priceValue
                                      );
                                      toggleEditMode(manga.id);
                                    }}
                                  />
                                  <strong>Modifica in corso...</strong>
                                </>
                              ) : (
                                `${manga.volumes}`
                              )}
                            </TableCell>
                            <TableCell align="center">{manga.date}</TableCell>
                            <TableCell align="center">{manga.price}</TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 33 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell colSpan={2}>Totale</TableCell>
                      <TableCell align="right">
                        {ccyFormat(invoiceTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-between items-center">
                <Link to="/mangalist" className="ml-10">
                  <ArrowBackIcon />
                </Link>
                <TablePagination
                  component="div"
                  labelDisplayedRows={() => {
                    ``;
                  }}
                  count={mangaDetails ? mangaDetails.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[]}
                />
              </div>
            </Paper>
          ) : (
            <NoData variant={"black"} />
          )}
        </Box>
      </div>
    </>
  );
}

MangaListDettagliata.propTypes = {
  mangaList: PropTypes.array.isRequired,
};
