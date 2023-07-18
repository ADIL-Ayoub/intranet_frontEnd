import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default ({page, rowsPerPage, handleChangeRowsPerPage,handleChangePage, count}) => {

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={(e, newPage) => handleChangePage(e, newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(e) => handleChangeRowsPerPage(e, 10)}
      labelRowsPerPage = 'Lignes par page'
    />
  );
}