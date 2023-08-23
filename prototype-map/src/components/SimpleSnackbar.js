import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);
  console.log(props)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
        open={props.isOpen} 
        autoHideDuration={6000} 
        onClose={() => props.onClose()}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          The sign details have been submitted successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
}