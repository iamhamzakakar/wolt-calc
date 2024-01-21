import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Grid, useMediaQuery, TextField, Button,ThemeProvider, } from '@mui/material';
import theme from './theme';
import { LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './App.css';


function App() {
  const [cartValue, setCartValue] = useState<number>(20);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(900);
  const [numberOfItems, setNumberOfItems] = useState<number>(1);
  const [orderTime, setOrderTime] = useState<Date | null>(new Date());
  const [deliveryPrice, setDeliveryPrice] = useState<string>('2.00€');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const calculateDeliveryFee = (): void => {
    let fee = 2; // Base delivery fee
    if (deliveryDistance > 1000) {
      fee += Math.ceil((deliveryDistance - 1000) / 500);
    }

    if (cartValue < 10) {
      fee += 10 - cartValue;
    }

    if (numberOfItems >= 5) {
      fee += 0.5 * (numberOfItems - 4);
      if (numberOfItems > 12) {
        fee += 1.2;
      }
    }

    if (orderTime) {
      const date = new Date(orderTime);
      const day = date.getDay();
      const hour = date.getHours();
      if (day === 5 && hour >= 15 && hour < 19) { // Friday rush hour check from 3 PM to 7 PM
        fee *= 1.2;
      }
    }

    if (cartValue >= 200) {
      fee = 0;
    }

    fee = Math.min(fee, 15);

    setDeliveryPrice(`${fee.toFixed(2)}€`);
  };

  return (
    
    <div className="App" style={{padding: '20px' }}>
      <h1 style={{color: theme.palette.primary.main }}>Delivery Fee Calculator</h1>
      <Grid container spacing="2" item xs={12} md={6}></Grid>
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>,
          document.getElementById('root')
          );
      <TextField
        label="Cart Value"
        type="number"
        value={cartValue}
        onChange={(e) => setCartValue(parseFloat(e.target.value))}
        variant="outlined"
        margin="normal"
        fullWidth
        style={{width: '100%', marginBottom: '10px'}}
        
        /*
        ** Test ID for the Cart Value
        */
        inputProps={{ 'data-test-id': 'cartValue' }}

      />
      <TextField
        label="Delivery Distance"
        type="number"
        value={deliveryDistance}
        onChange={(e) => setDeliveryDistance(parseInt(e.target.value, 10))}
        variant="outlined"
        margin="normal"
        fullWidth
        /*
        ** Test ID for the Delivery Distance
        */
       inputProps={{ 'data-test-id': 'deliveryDistance' }}

      />
      <TextField
        label="Amount of Items"
        type="number"
        value={numberOfItems}
        onChange={(e) => setNumberOfItems(parseInt(e.target.value, 10))}
        variant="outlined"
        margin="normal"
        fullWidth
        
        /*
        ** Test ID for the Amount of Items
        */
       inputProps = {{ 'data-test-id': 'amountOfItems' }}
      
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Time"
          value={orderTime}
          onChange={setOrderTime}

          
          
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        onClick={calculateDeliveryFee}
        color="primary"
        size="large"
        fullWidth
        style={{ marginTop: '20px', marginBottom: '20px', width: '100%', padding: '10px', fontSize: isMobile ? '12px' : '16px' }}
        /*
        ** Test ID for the Delivery Price
        */
        data-test-id="calculateDeliveryPrice"
      >
        Calculate Delivery Price
      </Button>
      <div className="DeliveryPrice" style={{marginTop: '20px', fontFamily: 'serif', fontSize: isMobile ? '18px' : '20px'}}>
        Delivery Price: {deliveryPrice}</div>
    </div>
    
  );
}

export default App;
