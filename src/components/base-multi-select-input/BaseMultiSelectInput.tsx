import type InputOptionInterface from "./interfaces/input.option.interface";
import React, {useState, useEffect, useRef, useMemo} from 'react';
import "./BaseMultiSelectInput.scss"
import BaseMultiSelectInputItem from "./BaseMultiSelectInputItem";

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
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.trim());
        setHighlightIndex(-1);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
            if (highlightIndex < 0) {
                const editedSearchValue = searchValue.toLowerCase();
                const newOption: InputOptionInterface = { label: editedSearchValue, value: editedSearchValue };
                setInternalOptions([...internalOptions, newOption]);
                onChange([...model, newOption.value]);
                setSearchValue("");
            } else {
                const selectedValue = showOptions[highlightIndex].value

                onChange(model.includes(selectedValue)
                    ? model.filter((i: string) => i !== selectedValue)
                    : [...model, selectedValue]
                );
            }
        }
    };

    const handleOptionClick = (option: InputOptionInterface) => {
        onChange(option.checked
            ? model.filter((i: string) => i !== option.value)
            : [...model, option.value]
        );
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
            <div className={`${className}_button ${isOpen && 'focus'}`}>
                <span className={`${className}_button_placeholder`}>
                    {buttonText}
                </span>
                <input
                    className={`${className}_button_input`}
                    onFocus={handleFocus}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    type="text"/>
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