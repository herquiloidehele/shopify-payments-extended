import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import styled from "styled-components";

export interface IDialogTitleProps {
  onClose: () => void;
  title: string;
}

const BootstrapDialogTitle: React.FC<IDialogTitleProps> = ({ title, onClose }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {title}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface IModalWrapperProps {
  id: string;
  title: string;
  handleClose: () => void;
  actionButtonText: string;
  actionButtonOnClick: () => void;
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
}

const CustomDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 85%;
  }
`;
const ModalWrapper: React.FC<IModalWrapperProps> = ({ id, title, handleClose, actionButtonOnClick, actionButtonText, isOpen, children }) => {
  return (
    <CustomDialog onClose={handleClose} aria-labelledby={id} open={isOpen}>
      <BootstrapDialogTitle onClose={handleClose} title={title} />
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={actionButtonOnClick}>
          {actionButtonText}
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

ModalWrapper.defaultProps = {
  children: <></>,
};

export default ModalWrapper;
