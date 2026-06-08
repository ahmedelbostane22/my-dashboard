import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Layout/firebase";


export default function DeleteInvoiceDialog({ invoice, open, onClose }) {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "invoices", invoice.id));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Invoice</DialogTitle>

      <DialogContent>
        Are you sure you want to delete invoice
        <strong> #{invoice?.invoiceNumber}</strong> ?
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
