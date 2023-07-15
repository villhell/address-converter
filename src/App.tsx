import { useState } from 'react';
import { RawAddress } from './format/RawAddress';
import { Convert } from './format/Convert';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />
));

function App() {
  const [address, setAddress] = useState(
    '68C1DD60E4007102B85D1A381B061DA6323411EDF4989635'
  );
  const [convertAddress, setConvertAddress] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const btnConvert_Click = () => {
    try {
      const convertAddress = RawAddress.addressToString(
        Convert.hexToUint8(address)
      );
      setConvertAddress(convertAddress);
    } catch (e) {
      setError('An error occurred during conversion');
      setOpen(true);
    }
  };

  // SnackbarのonCloseハンドラー
  const handleSnackbarClose = (reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // AlertのonCloseハンドラー
  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={6}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      marginTop={10}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h1" gutterBottom>
          Symbol Address Converter
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} style={{ width: '40%' }}>
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          required
          fullWidth
          onChange={changeAddress}
          value={address}
          style={{ width: '100%', maxWidth: '100%' }}
        />
        <Grid container item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={btnConvert_Click}
            style={{ marginTop: '10px' }}
          >
            Convert
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" gutterBottom>
          Convert Address:
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {convertAddress}
        </Typography>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(_, reason) => handleSnackbarClose(reason)}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
