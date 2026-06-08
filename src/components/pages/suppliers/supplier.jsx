import { useEffect, useState } from "react";
import {
  Paper, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  TablePagination, TextField, Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Layout/firebase";

import AddSupplierDialog from "./add_suppliers";
import EditSupplierDialog from "./edit_suppliers";
import DeleteSupplierDialog from "./delete_suppliers";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [editSupplier, setEditSupplier] = useState(null);
  const [deleteSupplier, setDeleteSupplier] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🔥 Firebase realtime
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "suppliers"), (snapshot) => {
      const rows = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSuppliers(rows);
      setAllSuppliers(rows);
    });

    return () => unsub();
  }, []);

  // 🔍 Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = allSuppliers.filter(s =>
      s.name?.toLowerCase().includes(value) ||
      s.company?.toLowerCase().includes(value) ||
      s.phone?.includes(value)
      
    );

    setSuppliers(filtered);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "75%", mx: "auto", p: 2 }}>
      {/* Add + Search */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <AddSupplierDialog />
        <TextField
          label="Search supplier"
          size="small"
          value={search}
          onChange={handleSearch}
        />
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {suppliers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((supplier) => (
               <TableRow key={supplier.id} hover>
  <TableCell>{supplier.supplierName}</TableCell>
  <TableCell>{supplier.supplierNumber}</TableCell>
  <TableCell>{supplier.phone}</TableCell>
  <TableCell>{supplier.supplierEmail}</TableCell>
  <TableCell>
    <Chip
      label="Edit"
      icon={<EditIcon />}
      sx={{ mr: 1 }}
      onClick={() => setEditSupplier(supplier)}
    />
    <Chip
      label="Delete"
      color="error"
      icon={<DeleteIcon />}
      onClick={() => setDeleteSupplier(supplier)}
    />
  </TableCell>
</TableRow>

              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50]}
        count={suppliers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />

      {/* Dialogs */}
      <EditSupplierDialog
        open={!!editSupplier}
        supplier={editSupplier}
        onClose={() => setEditSupplier(null)}
      />

      <DeleteSupplierDialog
        open={!!deleteSupplier}
        supplier={deleteSupplier}
        onClose={() => setDeleteSupplier(null)}
      />
    </Paper>
  );
}
