import type InputOptionInterface from './interfaces/input.option.interface';
import { render, fireEvent } from '@testing-library/react';
import BaseMultiSelectInput from './BaseMultiSelectInput';
import React from 'react';

describe('BaseMultiSelectInput', () => {
    const mockOptions: InputOptionInterface[] = [
        { label: 'Option 1', value: 'option1', checked: false },
        { label: 'Option 2', value: 'option2', checked: false },
        { label: 'Option 3', value: 'option3', checked: false },
    ];

    const mockOnChange = jest.fn();
    const placeholderText = 'Select options...';

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test('renders correctly with initial state', () => {
        const { getByPlaceholderText, getByText } = render(
            <BaseMultiSelectInput options={mockOptions} model={[]} placeholder={placeholderText} onChange={mockOnChange} />
        );

        expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
        expect(getByText('Select options...')).toBeInTheDocument();
    });

    test('opens and closes dropdown when button is clicked', () => {
        const { getByPlaceholderText, container } = render(
            <BaseMultiSelectInput options={mockOptions} model={[]} placeholder={placeholderText} onChange={mockOnChange} />
        );

        const inputElement = getByPlaceholderText(placeholderText);

        fireEvent.focus(inputElement);
        expect(container.querySelector('.base-multi-select-input_dropdown')).toBeInTheDocument();
    });

    test('filters options based on search input', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(
            <BaseMultiSelectInput options={mockOptions} model={[]} placeholder={placeholderText} onChange={mockOnChange} />
        );

        const inputElement = getByPlaceholderText(placeholderText);

        fireEvent.focus(inputElement);

        fireEvent.change(inputElement, { target: { value: 'Option 2' } });
        expect(getByText('Option 2')).toBeInTheDocument();
        expect(queryByText('Option 1')).not.toBeInTheDocument();
        expect(queryByText('Option 3')).not.toBeInTheDocument();
    });

    test('selects option when clicked', () => {
        const { getByPlaceholderText, getByText } = render(
            <BaseMultiSelectInput options={mockOptions} model={[]} placeholder={placeholderText} onChange={mockOnChange} />
        );

        const inputElement = getByPlaceholderText(placeholderText);

        fireEvent.focus(inputElement);

        fireEvent.click(getByText('Option 1'));
        expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    });
});