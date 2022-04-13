/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Table as MaUTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import PropTypes from 'prop-types';
import TablePaginationActions from './TablePaginationActions';
import GlobalFilter from './GlobalFilter';
import cl from './Table.module.scss';

const useStylesTd = makeStyles({
  root: {
    padding: 0,
    textAlign: 'center'
    // '& '
  }
});

const useStyleSortLabel = makeStyles({
  root: {
    color: '#ffffff !important',
    '& .MuiTableSortLabel-icon': {
      color: '#ffffff !important'
    }
  }
});

const Table = ({
  columns,
  data,
  skipPageReset,
  resetPage,
  onclick,
  selectedId = null,
  multipleSelector = true,
  onPageChangeClick,
  rowsPerPageOptions = [],
  sortBy,
  isDescSortDirection = false,
  isSearch = false,
  isResetSelectedRow = true,
  style = {
    footer: {}
  },
  isLoading
}) => {
  const selectedRowIds = {};
  if (selectedId !== null) selectedRowIds[selectedId] = true;
  const classesTd = useStylesTd();
  const classesSortLabel = useStyleSortLabel();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      disableSortRemove: true,
      initialState: {
        sortBy: [
          {
            id: sortBy,
            desc: isDescSortDirection
          }
        ],
        selectedRowIds // id of array (start from 0)
      },
      ...resetPage
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    setPageSize(rowsPerPageOptions[0] || 10);
  }, []);
  const [searchValue, setSearchValue] = useState(globalFilter);

  const [pageNum, setPageNum] = useState(pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 10);

  const handleChangePage = (event, newPage) => {
    if (typeof onPageChangeClick === 'function') onPageChangeClick();
    if (isResetSelectedRow) toggleAllRowsSelected(false);
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
    setRowsPerPage(Number(event.target.value));
  };

  const removeByIndexs = (array, indexs) => array.filter((_, i) => !indexs.includes(i));

  return (
    <TableContainer style={{ height: '100%', overflow: 'visible', position: 'relative' }}>
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(159,161,159,0.5)',
            zIndex: '1000',
            position: 'absolute'
          }}
        >
          <CircularProgress
            className="preloader"
            style={{
              zIndex: '1000',
              left: '50%',
              top: '42%',
              position: 'relative'
            }}
          />
        </Box>
      ) : (
        ''
      )}
      {isSearch ? (
        <GlobalFilter
          value={searchValue}
          setValue={setSearchValue}
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={searchValue}
          data={data}
        />
      ) : (
        ''
      )}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow style={{ backgroundColor: '#333234' }} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={cl.table__headerCell}
                    style={{
                      width: column.width,
                      cursor: column.id === 'selection' ? 'default' : 'pointer'
                    }}
                    align="center"
                  >
                    {column.Header}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        className={classesSortLabel.root}
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.length === 0 ? (
            <TableRow key="default">
              <td
                style={{
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-57%)',
                  height: '38px',
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  textAlign: 'center'
                }}
              >
                No such elements
              </td>
            </TableRow>
          ) : (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  style={{
                    cursor: 'pointer',
                    backgroundColor: row.isSelected ? '#efefee' : '#fff',
                    height: '38px !important' // высота строки
                  }}
                  {...row.getRowProps()}
                  onClick={() => {
                    if (!multipleSelector) toggleAllRowsSelected(false);
                    if (typeof onclick === 'function') onclick(row);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()} className={cl.table__cell} align="center">
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter style={{ ...style.footer }}>
          {/* //bottom: '15px' */}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={0}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={pageIndex}
              labelRowsPerPage="Строк на странице:"
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} из ${count}`;
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

export default Table;

Table.propTypes = {
  columns: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
  skipPageReset: PropTypes.func,
  resetPage: PropTypes.func,
  onclick: PropTypes.func,
  selectedId: PropTypes.number,
  multipleSelector: PropTypes.bool,
  onPageChangeClick: PropTypes.func,
  rowsPerPageOptions: PropTypes.instanceOf(Array),
  sortBy: PropTypes.string,
  isDescSortDirection: PropTypes.bool,
  isSearch: PropTypes.bool,
  isResetSelectedRow: PropTypes.bool,
  style: PropTypes.shape({ footer: PropTypes.shape({}) }),
  isLoading: PropTypes.bool
};
