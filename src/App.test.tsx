import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Delivery Fee Calculator', () => {
  test('calculates delivery price correctly', () => {
    render(<App />);

    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const amountOfItemsInput = screen.getByTestId('amountOfItems');
    const calculateButton = screen.getByTestId('calculateDeliveryPrice');

    fireEvent.change(cartValueInput, { target: { value: '20' } });
    fireEvent.change(deliveryDistanceInput, { target: { value: '900' } });
    fireEvent.change(amountOfItemsInput, { target: { value: '1' } });
    fireEvent.click(calculateButton);

    const deliveryPrice = screen.getByTestId('deliveryPrice');
    expect(deliveryPrice.textContent).toBe('Delivery Price: 2€');
  });
});