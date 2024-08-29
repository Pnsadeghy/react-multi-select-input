import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders BaseMultiSelectInput component', () => {
  const { container } = render(<App />);

  const dropdownElement = container.querySelector('.base-multi-select-input');

  expect(dropdownElement).toBeInTheDocument();
});
