import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../customHooks/useFetch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./mangaList.module.scss";
import MangaListDettagliataInput from "./MangaListDettagliataInput";

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
        <TableCell padding="checkbox"></TableCell>
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

  /* const { numSelected, handleRemove } = props; */

  const { data } = useFetch("http://localhost:8080/manga/manga");
  const mangaId = data ? Number(params.mangaId) : null;

  const manga = data ? data.find(({ id }) => id === mangaId) : [];

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        /* numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }, */
      ]}
    >
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected > 1
            ? `${numSelected} selezionati`
            : `${numSelected} selezionato`}{" "}
        </Typography>
      ) */}
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
      >
        {manga ? <strong>{manga.title}</strong> : "Loading..."}
      </Typography>

      {/* {numSelected > 0 ? (
        <Tooltip title="Elimina">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : ( */}
      <Tooltip title="Filtra">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {/* )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  /* numSelected: PropTypes.number.isRequired, */
  handleRemove: PropTypes.func.isRequired,
};

export default function MangaListDettagliata() {
  const params = useParams();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("volumes");

  /* const [selected, setSelected] = React.useState([]); */

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);

  const { data } = useFetch("http://localhost:8080/manga/manga");
  const mangaId = data ? Number(params.mangaId) : null;

  const manga = data ? data.find(({ id }) => id === mangaId) : null;
  const mangaDetails = manga ? manga.detailsMangas : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /*   const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = mangaDetails.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }; */

  /*   const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }; */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /*   const handleRemove = () => {
    const newMangaList = mangaList.filter(
      (manga) => !selected.includes(manga.id)
    );
  }; */

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 && mangaDetails
      ? Math.max(0, (1 + page) * rowsPerPage - mangaDetails.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      mangaDetails
        ? [...mangaDetails]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : [],
    [order, orderBy, page, rowsPerPage, mangaDetails]
  );

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-between"
      style={{
        backgroundImage: "url(/assets/wallpaper-sitopersonale-manga.jpg)",
      }}
    >
      <div>
        <MangaListDettagliataInput manga={manga} />
      </div>
      <Box sx={{ width: "50%" }}>
        <Paper sx={{ width: "50%" }}>
          <EnhancedTableToolbar
          /* numSelected={selected.length} */
          /* handleRemove={handleRemove} */
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 400 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                /* numSelected={selected.length} */
                order={order}
                orderBy={orderBy}
                /* onSelectAllClick={handleSelectAllClick} */
                onRequestSort={handleRequestSort}
                rowCount={mangaDetails ? mangaDetails.length : 0}
              />
              <TableBody>
                {visibleRows.map((manga, index) => {
                  /* const isItemSelected = selected.includes(manga.id); */
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, manga.id)}
                      role="checkbox"
                      /* aria-checked={isItemSelected} */
                      tabIndex={-1}
                      key={manga.volumes}
                      /* selected={isItemSelected} */
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {manga.volumes}
                      </TableCell>
                      <TableCell align="center">{manga.date}</TableCell>
                      <TableCell align="center">{manga.price}</TableCell>
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
      </Box>
    </div>
  );
}

MangaListDettagliata.propTypes = {
  mangaList: PropTypes.array.isRequired,
};
