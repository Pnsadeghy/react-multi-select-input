import useBaseMultiSelectInputOptionsHook from "./base.multi.select.input.options.hook";
import type InputOptionInterface from '../interfaces/input.option.interface';
import { renderHook, act } from '@testing-library/react';
import React from "react";

describe('useBaseMultiSelectInputOptionsHook', () => {
    const mockOptions: InputOptionInterface[] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    const mockOnChange = jest.fn();
    let model: string[];

    beforeEach(() => {
        model = ['option1'];
        mockOnChange.mockClear();
    });

    test('should initialize states correctly', () => {
        const { result } = renderHook(() =>
            useBaseMultiSelectInputOptionsHook(mockOptions, model, mockOnChange)
        );

        expect(result.current.searchValue).toBe('');
        expect(result.current.isSearchFocus).toBe(false);
        expect(result.current.highlightIndex).toBe(-1);
        expect(result.current.internalOptions).toEqual(mockOptions);
        expect(result.current.showOptions).toEqual([
            { label: 'Option 1', value: 'option1', checked: true },
            { label: 'Option 2', value: 'option2', checked: false },
            { label: 'Option 3', value: 'option3', checked: false },
        ]);
    });

    test('should update searchValue and isSearchFocus', () => {
        const { result } = renderHook(() =>
            useBaseMultiSelectInputOptionsHook(mockOptions, model, mockOnChange)
        );

        act(() => {
            result.current.setSearchValue('test');
        });

        expect(result.current.searchValue).toBe('test');

        act(() => {
            result.current.setIsSearchFocus(true);
        });

        expect(result.current.isSearchFocus).toBe(true);
    });

    test('should filter options based on search value', () => {
        const { result } = renderHook(() =>
            useBaseMultiSelectInputOptionsHook(mockOptions, model, mockOnChange)
        );

        act(() => {
            result.current.setSearchValue('option 2');
        });

        expect(result.current.showOptions).toEqual([
            { label: 'Option 2', value: 'option2', checked: false },
        ]);
    });
});
