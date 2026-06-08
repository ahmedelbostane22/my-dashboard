import { useState } from "react";
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Layout/firebase";

export default function AddSupplierDialog() {
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    supplierEmail: "",
    supplierNumber: "",
    supplierName: "",
    supplierAddress: "",
    supplierDescription: "",
  });

  const validate = () => {
    let temp = {};

    if (!form.supplierName.trim())
      temp.supplierName = "Supplier name is required";

    if (!form.phone.trim())
      temp.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(form.phone))
      temp.phone = "Phone must be numbers only (10–15 digits)";

    if (!form.supplierEmail.trim())
      temp.supplierEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.supplierEmail))
      temp.supplierEmail = "Invalid email format";

    if (!form.supplierNumber.trim())
      temp.supplierNumber = "Supplier number is required";

    if (!form.supplierAddress.trim())
      temp.supplierAddress = "Address is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await addDoc(collection(db, "suppliers"), {
      ...form,
      status: "unpaid",
      invoiceDate: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    setOpen(false);
    // ✅ إعادة تعيين كل الحقول بنفس الشكل الأصلي
    setForm({
      phone: "",
      supplierEmail: "",
      supplierNumber: "",
      supplierName: "",
      supplierAddress: "",
      supplierDescription: "",
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Supplier
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Supplier</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Supplier Name"
            value={form.supplierName}
            onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
            error={!!errors.supplierName}
            helperText={errors.supplierName}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Supplier Address"
            value={form.supplierAddress}
            onChange={(e) => setForm({ ...form, supplierAddress: e.target.value })}
            error={!!errors.supplierAddress}
            helperText={errors.supplierAddress}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Supplier Description"
            value={form.supplierDescription}
            onChange={(e) => setForm({ ...form, supplierDescription: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Supplier Email"
            value={form.supplierEmail}
            onChange={(e) => setForm({ ...form, supplierEmail: e.target.value })}
            error={!!errors.supplierEmail}
            helperText={errors.supplierEmail}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Supplier Number"
            value={form.supplierNumber}
            onChange={(e) => setForm({ ...form, supplierNumber: e.target.value })}
            error={!!errors.supplierNumber}
            helperText={errors.supplierNumber}
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