import React from "react";

interface BaseMultiSelectInputCheckIconProps {
    checked?: boolean
}

const className = 'base-multi-select-input_dropdown_item_check_icon';

const BaseMultiSelectInputCheckIcon: React.FC<BaseMultiSelectInputCheckIconProps> = ({checked}) => {
    return (
        <svg fill="currentColor"
             viewBox="0 0 24 24"
             className={`${className} ${checked && 'checked'}`}>
            <path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
        </svg>
    )
}

export default BaseMultiSelectInputCheckIcon