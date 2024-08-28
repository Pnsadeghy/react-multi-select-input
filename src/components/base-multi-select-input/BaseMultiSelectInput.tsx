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

    const showOptions = useMemo(() => {
        const editedSearchValue = searchValue.toLowerCase();
        return (editedSearchValue
            ? options.filter((i: InputOptionInterface) => i.label.toLowerCase().includes(editedSearchValue))
            : options).map((i: InputOptionInterface) => ({
            ...i,
            checked: model.includes(i.value)
        }))
    }, [searchValue, options, model]);

    const handleFocus = () => {
        setSearchValue("");
        setIsOpen(true);
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.trim());
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
                    {placeholder || 'Select options...'}
                </span>
                <input
                    className={`${className}_button_input ${isOpen && 'focus'}`}
                    onFocus={handleFocus}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    type="text"/>
            </div>
            {
                isOpen &&
                <div className={`${className}_dropdown`}>
                    {showOptions.length > 0 ? (
                        showOptions.map((option) => (
                            <div key={option.value} className="base-multi-select-input__dropdown-item">
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="base-multi-select-input__dropdown-item">{searchValue ? 'Nothing found!' : 'Empty list'}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default BaseMultiSelectInput;