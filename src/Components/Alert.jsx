import { Snackbar } from '@material-ui/core';
import  MuiAlert  from '@material-ui/lab/Alert';
import React from 'react'
import { CryptoState } from '../CryptoContext'

const Alert = () => {

    const { alert, setalert } = CryptoState();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return; 
        }

        setalert({ open: false })
    };


  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={3000}
    onClose={handleClose}
    >
        <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
        >{alert.message}</MuiAlert>
    </Snackbar>
  );
};

export default Alert;