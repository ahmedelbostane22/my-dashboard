import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from "@mui/material";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Layout/firebase";
import { useState } from "react";

export default function EditSupplierDialog({ supplier, open, onClose }) {

  const [form, setForm] = useState(() => ({
    supplierName: supplier?.supplierName || "",
    supplierPhone: supplier?.supplierPhone || "",
    supplierEmail: supplier?.supplierEmail || "",
    supplierAddress: supplier?.supplierAddress || "",
    supplierDescription: supplier?.supplierDescription || "",
  }));


  if (open && supplier && form.supplierName !== supplier.supplierName) {
    setForm({
      supplierName: supplier.supplierName || "",
      supplierPhone: supplier.supplierPhone || "",
      supplierEmail: supplier.supplierEmail || "",
      supplierAddress: supplier.supplierAddress || "",
      supplierDescription: supplier.supplierDescription || "",
    });
  }

  const handleUpdate = async () => {
    await updateDoc(doc(db, "suppliers", supplier.id), {
      ...form,
      updatedAt: serverTimestamp(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Supplier</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Supplier Name"
          value={form.supplierName}
          onChange={(e) =>
            setForm({ ...form, supplierName: e.target.value })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Phone"
          value={form.supplierPhone}
          onChange={(e) =>
            setForm({ ...form, supplierPhone: e.target.value })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Email"
          value={form.supplierEmail}
          onChange={(e) =>
            setForm({ ...form, supplierEmail: e.target.value })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Address"
          value={form.supplierAddress}
          onChange={(e) =>
            setForm({ ...form, supplierAddress: e.target.value })
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Description"
          multiline
          rows={3}
          value={form.supplierDescription}
          onChange={(e) =>
            setForm({ ...form, supplierDescription: e.target.value })
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
