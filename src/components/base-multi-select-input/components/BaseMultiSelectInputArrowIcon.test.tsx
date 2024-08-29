import BaseMultiSelectInputArrowIcon from './BaseMultiSelectInputArrowIcon';
import { render, act } from '@testing-library/react';
import React from 'react';

describe('BaseMultiSelectInputArrowIcon', () => {
    test('renders correctly without open prop', () => {
        const { container } = render(<BaseMultiSelectInputArrowIcon />);
        const spanElement = container.querySelector('span');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass('base-multi-select-input_button_arrow');
        expect(spanElement).not.toHaveClass('open');
    });

    test('renders correctly with open prop', () => {
        const { container } = render(<BaseMultiSelectInputArrowIcon open={true} />);
        const spanElement = container.querySelector('span');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass('base-multi-select-input_button_arrow');
        expect(spanElement).toHaveClass('open');
    });

    test('renders an SVG element', () => {
        const { container } = render(<BaseMultiSelectInputArrowIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });
});
