import type InputOptionInterface from "./interfaces/input.option.interface"
import React from "react";

interface BaseMultiSelectInputItemProps {
    option: InputOptionInterface;
    highlight?: boolean;
    onClick: () => void;
}

const className = 'base-multi-select-input_dropdown_item';

const BaseMultiSelectInputItem: React.FC<BaseMultiSelectInputItemProps> = ({option, highlight, onClick}) => {
    return (
        <button type="button"
                className={`${className} ${highlight && 'highlight'}`}
                onClick={onClick}>
            {option.label} {option.checked ? '(checked)' : ''}
        </button>
    )
}

export default BaseMultiSelectInputItem