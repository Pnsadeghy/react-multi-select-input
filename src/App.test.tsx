import { render, screen } from '@testing-library/react';
import BaseDropdown from "./components/dropdown/BaseDropdown";
import React from 'react';
import App from './App';

test('renders', () => {
  render(<App />);
  expect(BaseDropdown).toBeInTheDocument();
});
