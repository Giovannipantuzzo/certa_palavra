/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@material-ui/core/Modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableFooter from '@mui/material/TableFooter';
import { useMediaQuery, CircularProgress } from '@mui/material/';
import AdminDashboardRow from '../AdminDashboardRow';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import api from '../../utils/api';

const titleTable = 'Lista de corretores';

const titles = [
  '', 'Nome', 'Nº correções no mês atual',
]

const rows = [
  'TESTE', '0',
]

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;

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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? (
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TableComponent({
  dados,
  renderButton,
}) {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(rows);
  const [corretores, setCorretores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const matches = useMediaQuery('(max-width:930px)');
  const matchesFont90 = useMediaQuery('(max-width:930px)');
  const matchesFont85 = useMediaQuery('(max-width:680px)');
  const matchesFont400px = useMediaQuery('(max-width:400px)');

  const footerProps = {
    sx: matchesFont400px
      ? {
        minWidth: 400,
      }
      : { minWidth: 500 },
    style: matches
      ? {
        display: 'flex',
        margin: '2%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
      }
      : {
        display: 'flex',
        justifyContent: 'center',
        margin: '1%',
      },
  };

  const cellFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        borderStyle: 'solid',
        borderWidth: '1px 0px 1px 1px',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          borderStyle: 'solid',
          borderWidth: '1px 0px 1px 1px',
        }
        : {
          fontSize: '100%',
          borderStyle: 'solid',
          borderWidth: '1px 0px 1px 1px',
        },
  };

  const titleFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        backgroundColor: '#2574A9',
        color: 'white',
        padding: '3px',
        textAlign: 'center',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          backgroundColor: '#2574A9',
          color: 'white',
        }
        : {
          fontSize: '100%',
          backgroundColor: '#2574A9',
          color: 'white',
        },
  };

  const tableFontProps = {
    style: matchesFont85
      ? {
        textAlign: 'center',
        fontSize: '1em',
        fontWeight: '900',
        backgroundColor: '#E5E4E2',
        color: '#2574A9',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '1em',
          fontWeight: '900',
          textAlign: 'center',
          backgroundColor: '#E5E4E2',
          color: '#2574A9',
        }
        : {
          fontSize: '1.2em',
          fontWeight: '900',
          textAlign: 'center',
          backgroundColor: '#E5E4E2',
          color: '#2574A9',
        },
  };

  const buttonFontProps = {
    style: matchesFont85
      ? {
        fontSize: '85%',
        backgroundColor: '#2574A9',
        color: 'white',
        padding: '6px',
      }
      : matchesFont90
        ? {
          fontSize: '90%',
          backgroundColor: '#2574A9',
          color: 'white',
        }
        : {
          fontSize: '100%',
          backgroundColor: '#2574A9',
          color: 'white',
        },
  };

  const tableProps = {
    sx: matchesFont400px
      ? {
        minWidth: 450,
      }
      : { minWidth: 650 },
    size: matchesFont85
      ? 'small'
      : matchesFont90
        ? 'medium'
        : 'big',
  };

  const tableTitleProps = {
    sx: matchesFont400px
      ? {
        minWidth: 400,
      }
      : { minWidth: 650 },
    size: matchesFont85
      ? 'small'
      : matchesFont90
        ? 'medium'
        : 'big',
  };

  const tableContainerProps = {
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    console.log("🚀 ~ file: index.js ~ line 295 ~ getData ~ TESTE")
    const response = await api.get(`/user/corretores`);
    console.log("🚀 ~ file: index.js ~ line 296 ~ getData ~ response", response)
    setCorretores(response.data);
  };

  useEffect(() => {
    getData(rows);
  }, []);

  return (
    <TableContainer
      component={Paper}
      {...tableContainerProps}
    >
      <Table
        {...tableProps}
        aria-label="caption table"
      >
        <TableHead>
          <TableRow
            {...tableTitleProps}
          >
            {titleTable
              && (
                <TableCell
                  align="center"
                  {...tableFontProps}
                  colSpan={5}
                >
                  {titleTable}
                </TableCell>
              )}
          </TableRow>

          <TableRow>
            {titles?.map((title) => (
              <TableCell {...titleFontProps}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, index) => (
              <TableRow>
                <TableCell {...cellFontProps} align="center">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AdminDashboardRow
                      // id={modelsSequentialId[index + (page * 10)]}
                      model={row}
                      // setUse={setUse}
                      page={page}
                    />
                  </div>
                </TableCell>
                  )}
                {Object.values(row)?.map((obj) => (
                  <TableCell {...cellFontProps}>
                    {obj}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell
                {...cellFontProps}
                colSpan={6}
              />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {loading && (
        <TableRow style={{
          height: 53 * rowsPerPage, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <CircularProgress />
        </TableRow>
      )}
      {data?.length === 0 && (
        <div style={{
          marginTop: '5px',
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '20px',
          fontWeight: '500',
        }}
        >
          {' '}
          <p>
            Registros não encontrados
          </p>
        </div>
      )}
      <TableFooter {...footerProps}>
        <>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: rows?.length }]}
            component="div"
            style={{ overflow: 'hidden' }}
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Linhas por pagina"
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'Linhas por pagina',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
          <div className="button-table-component-pagination-consult">
            {renderButton && (
              <div>
                <Button
                  {...buttonFontProps}
                  sx={{
                    marginRight: '15px',
                    marginLeft: '15px',
                  }}
                  onClick={handleOpen}
                >
                  Pesquisa Avançada
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <SearchAdvancedAccount handleClose={handleClose} setData={setData} rows={rows} dados={dados} />
                </Modal>
              </div>
            )}
          </div>
        </>
      </TableFooter>
    </TableContainer>
  );
}

export default TableComponent;
