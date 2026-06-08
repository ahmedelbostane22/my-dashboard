// DeleteSuppliers
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Layout/firebase";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function DeleteSuppliersDialog({ supplier, open, onClose }) {
    const handleDelete = async () => {
        await deleteDoc(doc(db, "suppliers", supplier.id));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Supplier</DialogTitle>

            <DialogContent>
                Are you sure you want to delete supplier
                <strong> #{supplier?.supplierNumber}</strong> ?
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