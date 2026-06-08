import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {db ,collection , addDoc} from './firebase'
import MenuItem from '@mui/material/MenuItem';


export default function FormDialog({ addProduct ,categories  }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }; 
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
  const formData = new FormData(event.currentTarget);
   const data = Object.fromEntries(formData.entries());
    const newProduct = {
      title: data.title,
      price: Number(data.price),
      image: data.image,
      description: data.description,
      categoryId: data.category,
      createdAt: new Date()
    };
   addProduct(newProduct);

    console.log(name);
    handleClose();
  };

 return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Add new product to Firestore
          </DialogContentText>

          <form onSubmit={handleSubmit} id="product-form">
            <TextField
              autoFocus
              required
              margin="dense"
              name="title"
              label="Product Title"
              fullWidth
              variant="standard"
            />

            <TextField
              required
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              required
              margin="dense"
              name="image"
              label="Image URL"
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
    defaultValue=""
  >
    {categories.map((cat) => (
      <MenuItem key={cat.id} value={cat.id  }>
        {cat.name}
      </MenuItem>
    ))}
  </TextField>

            <TextField
              margin="dense"
              name="description"
              label="Description"
              multiline
              rows={3}
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="product-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}