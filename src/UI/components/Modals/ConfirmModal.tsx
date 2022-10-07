import { Button, Dialog, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export interface IConfirmModalProps {
  title: string;
  message: string;
  onAccept: () => void;
  onClose: () => void;
  isOpen: boolean;
}
const ConfirmModal: React.FC<IConfirmModalProps> = ({ title, message, isOpen, onAccept, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Não</Button>
        <Button onClick={onAccept} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
