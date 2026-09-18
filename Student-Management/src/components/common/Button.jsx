import React from 'react';

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors"
        >
            {props.text}
        </button>
    )
}
export default Button;