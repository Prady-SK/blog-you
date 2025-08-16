import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle: string;
}

const DeleteDialog: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  postTitle,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{blogTableCMS.deleteDialogTitle}</DialogTitle>
      <DialogContent>
        {blogTableCMS.deleteDialogMessage(postTitle)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{blogTableCMS.cancel}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {blogTableCMS.confirmDelete}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
