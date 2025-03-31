import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "../AnimeList/HoverTextCheckbox.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AnimeInput from "./AnimeInput";
import AnimePut from "./AnimePut";
import { deleteAnimeAsync, getAnimeAsync } from "./animeSlice";
import Loading from "../../Loading";
import Error from "../../Error";

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
    id: "title",
    boolean: false,
    disablePadding: true,
    label: "Titolo",
  },
  {
    id: "completed",
    boolean: true,
    disablePadding: false,
    label: "Completata",
  },
  {
    id: "delete",
    boolean: true,
    label: "Elimina",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.boolean ? "right" : "left"}
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
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AnimeList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const [editModes, setEditModes] = React.useState({}); // Stato per tracciare editMode per ogni elemento
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(getAnimeAsync());
  }, [dispatch]);

  {
    loading && <Loading />;
  }

  {
    error & <Error error={error} />;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const toggleEditMode = (id) => {
    setEditModes((prev) => ({
      ...prev,
      [id]: !prev[id], // Inverti il valore di editMode per l'elemento con l'ID specificato
    }));
  };

  const emptyRows =
    page > 0 && data ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      data
        ? [...data]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [order, orderBy, page, rowsPerPage, data]
  );

  return (
    <>
      <div
        className="h-screen bg-cover bg-right-bottom"
        style={{
          backgroundImage: "url(/assets/wallpaper-sitopersonale-anime.jpg)",
        }}
      >
        <div className="flex h-[50%]"></div>
        <div className="absolute">
          <AnimeInput />
        </div>
        <div className="flex h-[50%] justify-center items-end">
          <Box className="xl:w-[30%]">
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-labelledby="tableTitle"
                  size={window.innerWidth <= 1272 ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data ? data.length : 0}
                  />
                  <TableBody>
                    {visibleRows.map((anime, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isEditMode = editModes[anime.id] || false; // Ottieni lo stato di editMode per l'elemento
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={anime.id}
                        >
                          <TableCell padding="checkbox">
                            {!isEditMode && (
                              <EditIcon
                                onClick={() => toggleEditMode(anime.id)}
                              />
                            )}
                            {isEditMode && (
                              <CheckIcon
                                onClick={() => toggleEditMode(anime.id)}
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
                              <AnimePut anime={anime} />
                            ) : (
                              `${anime.title}`
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {anime.completed ? (
                              <CheckIcon color="success" />
                            ) : (
                              <CloseIcon color="warning" />
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <DeleteIcon
                              onClick={() =>
                                dispatch(deleteAnimeAsync(anime.id))
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </TableCell>
                        </TableRow>
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
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-between items-center">
                <Link to="/" className="ml-10">
                  <ArrowBackIcon />
                </Link>
                <TablePagination
                  component="div"
                  labelDisplayedRows={() => {
                    ``;
                  }}
                  count={data ? data.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[]}
                />
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
}

AnimeList.propTypes = {
  animeList: PropTypes.array.isRequired,
};
