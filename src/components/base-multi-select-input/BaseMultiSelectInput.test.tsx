import type InputOptionInterface from "./interfaces/input.option.interface";
import BaseMultiSelectInput from './BaseMultiSelectInput';
import { render, screen } from '@testing-library/react';
import React from 'react';

test('renders', () => {
    const options: InputOptionInterface[] = []
    const selected: string[] = []
    const mockOnChange = jest.fn();

    render(<BaseMultiSelectInput
        options={options}
        model={selected}
        onChange={mockOnChange}
    />);
});
