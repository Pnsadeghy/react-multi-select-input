import BaseMultiSelectInputCheckIcon from './BaseMultiSelectInputCheckIcon';
import { render } from '@testing-library/react';
import React from 'react';

describe('BaseMultiSelectInputCheckIcon', () => {
    test('renders correctly without checked prop', () => {
        const { container } = render(<BaseMultiSelectInputCheckIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('base-multi-select-input_dropdown_item_check_icon');
        expect(svgElement).not.toHaveClass('checked');
    });

    test('renders correctly with checked prop', () => {
        const { container } = render(<BaseMultiSelectInputCheckIcon checked={true} />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass('base-multi-select-input_dropdown_item_check_icon');
        expect(svgElement).toHaveClass('checked');
    });

    test('renders SVG element with correct attributes', () => {
        const { container } = render(<BaseMultiSelectInputCheckIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('fill', 'currentColor');
    });
});
