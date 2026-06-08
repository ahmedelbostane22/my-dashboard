import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';







const inventory = [
  {
    id: 1,
    product: 'Laptop',
    category: 'Electronics',
    stock: 15,
    minStock: 5,
    price: 1500,
    lastUpdated: '2026-01-06',
  },
  {
    id: 2,
    product: 'Phone',
    category: 'Electronics',
    stock: 30,
    minStock: 10,
    price: 800,
    lastUpdated: '2026-01-05',
  },
  {
    id: 3,
    product: 'Desk Chair',
    category: 'Furniture',
    stock: 8,
    minStock: 3,
    price: 120,
    lastUpdated: '2026-01-04',
  },
  // ... المزيد من الصفوف
];

const columns = [
  { id: 'product', label: 'Product', minWidth: 150 },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'stock', label: 'Stock', minWidth: 100, align: 'right' },
  { id: 'minStock', label: 'Min Stock', minWidth: 100, align: 'right' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right', format: (value) => `$${value}` },
  { id: 'lastUpdated', label: 'Last Updated', minWidth: 120, align: 'center' },
];















export default function InventoryTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '75%', margin: 'auto', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="inventory table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={inventory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
