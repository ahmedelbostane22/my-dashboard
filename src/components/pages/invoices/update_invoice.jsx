import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from "@mui/material";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Layout/firebase";

import { useState } from "react";

export default function EditInvoiceDialog({ invoice, open, onClose }) {
  const [form, setForm] = useState({
    invoiceNumber: invoice?.invoiceNumber || "",
    customerName: invoice?.customerName || "",
  });

  const handleUpdate = async () => {
    await updateDoc(doc(db, "invoices", invoice.id), {
      ...form,
      updatedAt: serverTimestamp(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Invoice</DialogTitle>

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
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
