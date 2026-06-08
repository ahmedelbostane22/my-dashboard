import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

// Firestore imports
import { db } from "../Layout/firebase";
import { collection, onSnapshot, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add" | "edit" | "delete"
  const [currentCategory, setCurrentCategory] = useState({ id: "", name: "" });

  // Fetch categories from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    });
    return () => unsub();
  }, []);

  // Open dialog helper
  const handleOpenDialog = (type, category = { id: "", name: "" }) => {
    setDialogType(type);
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: "", name: "" });
  };

  // Firestore actions
  const addCategory = async () => {
    if (!currentCategory.name) return;
    const newDoc = doc(collection(db, "categories")); // generate new doc
    await setDoc(newDoc, { name: currentCategory.name });
    handleCloseDialog();
  };

  const editCategory = async () => {
    if (!currentCategory.name) return;
    await updateDoc(doc(db, "categories", currentCategory.id), { name: currentCategory.name });
    handleCloseDialog();
  };

  const deleteCategory = async () => {
    await deleteDoc(doc(db, "categories", currentCategory.id));
    handleCloseDialog();
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleOpenDialog("add")}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ width: '78%', margin: 'auto' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenDialog("edit", row)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenDialog("delete", row)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === "add" && "Add Category"}
          {dialogType === "edit" && "Edit Category"}
          {dialogType === "delete" && "Delete Category"}
        </DialogTitle>

        {dialogType !== "delete" && (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={currentCategory.name}
              onChange={(e) =>
                setCurrentCategory({ ...currentCategory, name: e.target.value })
              }
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogType === "add" && (
            <Button onClick={addCategory} variant="contained" color="success">
              Add
            </Button>
          )}
          {dialogType === "edit" && (
            <Button onClick={editCategory} variant="contained" color="primary">
              Save
            </Button>
          )}
          {dialogType === "delete" && (
            <Button onClick={deleteCategory} variant="contained" color="error">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
