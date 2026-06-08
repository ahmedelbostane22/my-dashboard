import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from '@mui/material/MenuItem';

import { db } from "./Layout/firebase";
import { doc, updateDoc } from "firebase/firestore";


export default function EditProduct({ product  , categories }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());


    const updatedProduct = {
      title: formJson.title,
      price: Number(formJson.price),
      image: formJson.image,
      description: formJson.description,
      category: formJson.category,
    };

    try {
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, updatedProduct);
      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent>
          <DialogContentText>Update product details</DialogContentText>

          <form onSubmit={handleSubmit} id="edit-form">
            <TextField
              autoFocus
              required
              margin="dense"
              name="title"
              label="Product Title"
              defaultValue={product.title}
              fullWidth
              variant="standard"
            />

            <TextField
              required
              margin="dense"
              name="price"
              label="Price"
              type="number"
              defaultValue={product.price}
              fullWidth
              variant="standard"
            />

            <TextField
              required
              margin="dense"
              name="image"
              label="Image URL"
              defaultValue={product.image}
              fullWidth
              variant="standard"
            />

                 <TextField
                select
                required
                margin="dense"
                name="category"
                label="Category"
                fullWidth
                variant="standard"
                defaultValue={product.category}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}

                  </MenuItem>
                  //show categories

                ))}
                
              </TextField>

            <TextField
              margin="dense"
              name="description"
              label="Description"
              defaultValue={product.description}
              multiline
              rows={3}
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
