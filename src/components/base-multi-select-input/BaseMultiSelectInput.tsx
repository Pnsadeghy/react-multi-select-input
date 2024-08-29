import useBaseMultiSelectInputOptionsHook from "./hooks/base.multi.select.input.options.hook";
import BaseMultiSelectInputArrowIcon from "./components/BaseMultiSelectInputArrowIcon";
import useBaseMultiSelectInputHook from "./hooks/base.multi.select.input.hook";
import BaseMultiSelectInputItem from "./components/BaseMultiSelectInputItem";
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

    const {
        wrapperRef,
        isOpen,
        setIsOpen
    } = useBaseMultiSelectInputHook();

    const {
        searchValue,
        setSearchValue,
        isSearchFocus,
        setIsSearchFocus,
        highlightIndex,
        setHighlightIndex,
        internalOptions,
        showOptions,
        handleKeyDown,
        toggleModelOptionsByValue
    } = useBaseMultiSelectInputOptionsHook(options, model, onChange);

    const buttonText = useMemo(() => {
        if (model.length === 0) return placeholder || 'Select options...'
        return internalOptions
            .filter((i: InputOptionInterface) => model.includes(i.value))
            .map((i: InputOptionInterface) => i.label).join(', ')
    }, [model, internalOptions]);

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
                                onClick={() => toggleModelOptionsByValue(option.value)} />
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