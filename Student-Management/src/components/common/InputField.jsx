import React from 'react';

function InputField(props) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500"
                 />
        </div>
    )
}

export default InputField;