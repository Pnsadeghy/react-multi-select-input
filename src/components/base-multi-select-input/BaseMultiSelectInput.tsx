import type InputOptionInterface from "./interfaces/input.option.interface";
import React, { useState } from 'react';

interface BaseMultiSelectInputProps {
    options: InputOptionInterface[];
    model: string[];
    onChange: (selected: string[]) => void;
}

const BaseMultiSelectInput: React.FC<BaseMultiSelectInputProps> = ({ options, model, onChange }) => {
    return (
        <div className="BaseMultiSelectInput">
            dropdown
        </div>
    );
}

export default BaseMultiSelectInput