import { render, screen } from '@testing-library/react';
import BaseMultiSelectInput from "./components/base-multi-select-input/BaseMultiSelectInput";
import React from 'react';
import App from './App';

test('renders', () => {
  render(<App />);
  expect(BaseMultiSelectInput).toBeInTheDocument();
});
