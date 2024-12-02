import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { MODAL_TABS } from "../utils/contants/dashboard";

type DeleteDialogProps = {
  open: string;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteDialog(props: DeleteDialogProps) {
  const { onClose, onConfirm, open } = props;

  return (
    <Dialog
      open={open === MODAL_TABS.delete}
      onClose={onClose}
      PaperProps={{
        sx: { width: "400px" },
      }}
    >
      <DialogTitle>Veuillez confirmer la suppression.</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
