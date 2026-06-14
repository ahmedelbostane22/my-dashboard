import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { db } from "../Layout/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import OptionMenu from '../Layout/optionmenu';

function User() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(data);
    });
    return () => unsub();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.username?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-2 md:px-6 py-6">
      
      {/* Search */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", mb: 2 }}>
        <TextField
          label="Search customer"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
          <Table stickyHeader>

            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell className="hidden sm:table-cell">Phone</TableCell>
                <TableCell className="hidden md:table-cell">Country</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center" className="hidden md:table-cell">
                  Created At
                </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>

                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>

                    <TableCell className="hidden sm:table-cell">-</TableCell>
                    <TableCell className="hidden md:table-cell">-</TableCell>

                    <TableCell align="center">
                      <Chip label="Active" color="success" size="small" />
                    </TableCell>

                    <TableCell align="center" className="hidden md:table-cell">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>

                    <TableCell align="center">
                      <OptionMenu />
                    </TableCell>

                  </TableRow>
                ))}
            </TableBody>

          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default User;