import type InputOptionInterface from "./interfaces/input.option.interface";
import React, { useState, useEffect, useRef } from 'react';
import "./BaseMultiSelectInput.scss"

interface BaseMultiSelectInputProps {
    options: InputOptionInterface[];
    model: string[];
    placeholder?: string
    onChange: (selected: string[]) => void;
}

const className = 'base-multi-select-input';

const BaseMultiSelectInput: React.FC<BaseMultiSelectInputProps> = ({ options, model, placeholder, onChange }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleFocus = () => setIsOpen(true);

    const wrapperRef = useRef<HTMLDivElement>(null);

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
        <div className={`${className}`} ref={wrapperRef}>
            <div className={`${className}_button ${isOpen && 'focus'}`}>
                <span className={`${className}_button_placeholder`}>
                    {placeholder || 'Select options...'}
                </span>
                <input
                    className={`${className}_button_input ${isOpen && 'focus'}`}
                    onFocus={handleFocus}
                    type="text"/>
            </div>
            {
                isOpen &&
                <div className={`${className}_dropdown`}>
                    Dropdown
                </div>
            }
        </div>
    );
}

export default BaseMultiSelectInput