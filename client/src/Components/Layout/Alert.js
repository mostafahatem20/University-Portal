import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function SnackbarAlert(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.handleClose()
  }

  return (
    <Snackbar
      open={props.showAlert}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.msg}
      </Alert>
    </Snackbar>
  )
}
export { SnackbarAlert, Alert }
