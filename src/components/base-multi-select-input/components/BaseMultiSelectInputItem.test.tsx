import type InputOptionInterface from '../interfaces/input.option.interface';
import BaseMultiSelectInputItem from './BaseMultiSelectInputItem';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

describe('BaseMultiSelectInputItem', () => {
    const mockOption: InputOptionInterface = {
        label: 'Option 1',
        value: 'option1',
        icon: 'icon-url',
        checked: false,
    };

    const mockOnClick = jest.fn();

    test('renders correctly without highlight and checked', () => {
        const { getByText, container } = render(
            <BaseMultiSelectInputItem option={mockOption} onClick={mockOnClick} />
        );

        const buttonElement = container.querySelector('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).not.toHaveClass('highlight');
        expect(buttonElement).not.toHaveClass('checked');

        const spanElement = getByText('Option 1');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass('base-multi-select-input_dropdown_item_text');
    });

    test('renders correctly with highlight and checked', () => {
        const { container } = render(
            <BaseMultiSelectInputItem
                option={{ ...mockOption, checked: true }}
                highlight={true}
                onClick={mockOnClick}
            />
        );

        const buttonElement = container.querySelector('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('highlight');
        expect(buttonElement).toHaveClass('checked');
    });

    test('calls onClick when button is clicked', () => {
        const { container } = render(
            <BaseMultiSelectInputItem option={mockOption} onClick={mockOnClick} />
        );

        const buttonElement = container.querySelector('button');
        fireEvent.click(buttonElement!);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('renders icon if provided', () => {
        const { container } = render(
            <BaseMultiSelectInputItem option={mockOption} onClick={mockOnClick} />
        );

        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'icon-url');
        expect(imgElement).toHaveAttribute('alt', 'Option 1');
        expect(imgElement).toHaveClass('base-multi-select-input_dropdown_item_text_image');
    });

    test('does not render icon if not provided', () => {
        const optionWithoutIcon = { ...mockOption, icon: undefined };
        const { container } = render(
            <BaseMultiSelectInputItem option={optionWithoutIcon} onClick={mockOnClick} />
        );

        const imgElement = container.querySelector('img');
        expect(imgElement).not.toBeInTheDocument();
    });
});
