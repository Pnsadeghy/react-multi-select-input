import type InputOptionInterface from "./interfaces/input.option.interface";
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
    const [searchValue, setSearchValue] = useState<string>("");
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
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.trim());
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchValue) {
            const editedSearchValue = searchValue.toLowerCase();
            const filteredOptions = internalOptions.filter((i: InputOptionInterface) => i.label.toLowerCase().includes(editedSearchValue));

            if (filteredOptions.length === 0) {
                const newOption: InputOptionInterface = { label: searchValue, value: searchValue };
                setInternalOptions([...internalOptions, newOption]);
                onChange([...model, newOption.value]);
            } else {
                if (!model.includes(filteredOptions[0].value))
                    onChange([...model, filteredOptions[0].value]);
            }
            setSearchValue("");
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
                        showOptions.map((option) => (
                            <button type="button"
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className={`${className}_dropdown_item`}>
                                {option.label} {option.checked ? '(checked)' : ''}
                            </button>
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