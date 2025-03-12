import type InputOptionInterface from '../interfaces/input.option.interface';
import React, { useState, useMemo } from 'react';

const useBaseMultiSelectInputOptionsHook = (
    options: InputOptionInterface[],
    model: string[],
    onChange: (selected: string[]) => void
) => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [internalOptions, setInternalOptions] = useState<InputOptionInterface[]>(options);

    const showOptions = useMemo(() => {
        const editedSearchValue = searchValue.toLowerCase();
        return (editedSearchValue
            ? internalOptions.filter((i: InputOptionInterface) => i.label.toLowerCase().includes(editedSearchValue))
            : internalOptions).map((i: InputOptionInterface) => ({
            ...i,
            checked: model.includes(i.value)
        }))
    }, [searchValue, internalOptions, model]);

    const toggleModelOptionsByValue = (value: string) => {
        const editableModel = [...model];
        const index = editableModel.indexOf(value);
        if (index >= 0) editableModel.splice(index, 1);
        else editableModel.push(value);
        onChange(editableModel);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isSearchFocus) return;

        if (event.key === 'ArrowDown') {
            if (highlightIndex < showOptions.length - 1)
                setHighlightIndex(highlightIndex + 1);
            return;
        }

        if (event.key === 'ArrowUp') {
            if (highlightIndex > 0)
                setHighlightIndex(highlightIndex - 1);
            return;
        }

        if (event.key === 'Enter') {
            const editedSearchValue = searchValue.toLowerCase();

            if (highlightIndex < 0) {
                if (!editedSearchValue) return;

                const newOption: InputOptionInterface = { label: editedSearchValue, value: editedSearchValue };
                setInternalOptions([...internalOptions, newOption]);
                onChange([...model, newOption.value]);
                setSearchValue("");
                return;
            }

            toggleModelOptionsByValue(showOptions[highlightIndex].value);
        }
    };

    return {
        searchValue,
        setSearchValue,
        isSearchFocus,
        setIsSearchFocus,
        highlightIndex,
        setHighlightIndex,
        internalOptions,
        showOptions,
        toggleModelOptionsByValue,
        handleKeyDown,
    };
};

export default useBaseMultiSelectInputOptionsHook;
