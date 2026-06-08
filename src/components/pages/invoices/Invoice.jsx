import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { db } from "../../Layout/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddInvoiceDialog from "./add_invoice";
import EditInvoiceDialog from "./update_invoice";
import DeleteInvoiceDialog from "./delete_invoice";

export function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteInvoice, setDeleteInvoice] = useState(null);

  // Firebase real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "invoices"), (snapshot) => {
      const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInvoices(rows);
      setAllInvoices(rows);
    });
    return () => unsubscribe();
  }, []);

  // Pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = allInvoices.filter(
      (inv) =>
        inv.customerName?.toLowerCase().includes(value) ||
        inv.invoiceNumber?.toString().includes(value)
    );
    setInvoices(filtered);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "70%", overflow: "hidden", mx: "auto", p: 2 }}>
      {/* Add & Search */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <AddInvoiceDialog />
        <TextField
          label="Search by Customer Name"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearch}
        />
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>
                    {invoice.invoiceDate?.toDate
                      ? invoice.invoiceDate.toDate().toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label="Edit"
                      icon={<EditIcon />}
                      onClick={() => setEditInvoice(invoice)}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label="Delete"
                      icon={<ArchiveIcon />}
                      color="error"
                      onClick={() => setDeleteInvoice(invoice)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialogs */}
      <EditInvoiceDialog
        open={!!editInvoice}
        invoice={editInvoice}
        onClose={() => setEditInvoice(null)}
      />
      <DeleteInvoiceDialog
        open={!!deleteInvoice}
        invoice={deleteInvoice}
        onClose={() => setDeleteInvoice(null)}
      />
    </Paper>
  );
}
