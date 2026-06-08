import { useState } from "react";
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Layout/firebase";


export default function AddInvoiceDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    invoiceNumber: "",
    customerName: "",
  });

  const handleSubmit = async () => {
    await addDoc(collection(db, "invoices"), {
      ...form,
      status: "unpaid",
      invoiceDate: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    setOpen(false);
    setForm({ invoiceNumber: "", customerName: "" });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Invoice
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Invoice</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Invoice Number"
            value={form.invoiceNumber}
            onChange={(e) =>
              setForm({ ...form, invoiceNumber: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Customer Name"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
