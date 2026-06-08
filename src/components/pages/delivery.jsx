import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';






const deliveries = [
  {
    id: 1,
    orderId: 'ORD001',
    customer: 'Ahmed Ali',
    address: '123 Street, Cairo',
    status: 'Pending',
    deliveryDate: '2026-01-06',
  },
  {
    id: 2,
    orderId: 'ORD002',
    customer: 'Sara Mohamed',
    address: '45 Street, Giza',
    status: 'Delivered',
    deliveryDate: '2026-01-05',
  },
  {
    id: 3,
    orderId: 'ORD003',
    customer: 'Omar Hassan',
    address: '10 Street, Alexandria',
    status: 'In Transit',
    deliveryDate: '2026-01-07',
  },
  // ... المزيد من الصفوف
];
const columns = [
  { id: 'orderId', label: 'Order ID', minWidth: 100 },
  { id: 'customer', label: 'Customer', minWidth: 150 },
  { id: 'address', label: 'Address', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
  { id: 'deliveryDate', label: 'Delivery Date', minWidth: 120, align: 'center' },
];












export default function DeliveryTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '75%', margin: 'auto', overflow: 'hidden', padding: '10px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="delivery table">
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
            {deliveries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    // لو العمود Status نعرضه كـ Chip
                    if (column.id === 'status') {
                      return (
                        <TableCell key={column.id} align="center">
                          <Chip
                            label={value}
                            color={
                              value === 'Delivered'
                                ? 'success'
                                : value === 'Pending'
                                ? 'warning'
                                : 'info'
                            }
                            size="small"
                          />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
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
        count={deliveries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
