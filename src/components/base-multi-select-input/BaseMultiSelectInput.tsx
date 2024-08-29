import type InputOptionInterface from "./interfaces/input.option.interface";
import BaseMultiSelectInputArrowIcon from "./BaseMultiSelectInputArrowIcon";
import BaseMultiSelectInputItem from "./BaseMultiSelectInputItem";
import React, {useState, useEffect, useRef, useMemo} from 'react';
import "./BaseMultiSelectInput.scss"

interface BaseMultiSelectInputProps {
    options: InputOptionInterface[];
    model: string[];
    placeholder?: string
    onChange: (selected: string[]) => void;
}

const className = 'base-multi-select-input';

const BaseMultiSelectInput: React.FC<BaseMultiSelectInputProps> = ({ options, model, placeholder, onChange }) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [internalOptions, setInternalOptions] = useState<InputOptionInterface[]>(options);

    const buttonText = useMemo(() => {
        if (model.length === 0) return placeholder || 'Select options...'
        return internalOptions
            .filter((i: InputOptionInterface) => model.includes(i.value))
            .map((i: InputOptionInterface) => i.label).join(', ')
    }, [model, internalOptions]);

    const showOptions = useMemo(() => {
        const editedSearchValue = searchValue.toLowerCase();
        return (editedSearchValue
            ? internalOptions.filter((i: InputOptionInterface) => i.label.toLowerCase().includes(editedSearchValue))
            : internalOptions).map((i: InputOptionInterface) => ({
            ...i,
            checked: model.includes(i.value)
        }))
    }, [searchValue, internalOptions, model]);

    const handleFocus = () => {
        setSearchValue("");
        setIsOpen(true);
        setHighlightIndex(-1);
        setIsSearchFocus(true);
    }

    const handleBlur = () => {
        setHighlightIndex(-1);
        setIsSearchFocus(false);
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.trim());
        setHighlightIndex(-1);
    }

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

    const handleOptionClick = (option: InputOptionInterface) => {
        toggleModelOptionsByValue(option.value);
    }

    const toggleModelOptionsByValue = (value: string) => {
        const editableModel = [...model];
        const index = editableModel.indexOf(value);
        if (index >= 0)
            editableModel.splice(index, 1);
        else
            editableModel.push(value);
        onChange(editableModel);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={className} ref={wrapperRef}>
            <div className={`${className}_button ${isOpen && 'open'}`}>
                <input
                    className={`${className}_button_input`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    placeholder={buttonText}
                    onKeyDown={handleKeyDown}
                    type="text"/>
                <span className={`${className}_button_placeholder ${isSearchFocus && 'focus'}`}>
                    {buttonText}
                </span>
                <BaseMultiSelectInputArrowIcon open={isOpen} />
            </div>
            {
                isOpen &&
                <div className={`${className}_dropdown`}>
                    {showOptions.length > 0 ? (
                        showOptions.map((option, index) => (
                            <BaseMultiSelectInputItem
                                key={option.value}
                                option={option}
                                highlight={index === highlightIndex}
                                onClick={() => handleOptionClick(option)} />
                        ))
                    ) : (
                        <div className={`${className}_dropdown_empty`}>{searchValue ? 'Nothing found!' : 'Empty list'}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default BaseMultiSelectInput;