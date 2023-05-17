import React, { useState } from 'react';

export const InputText = ({type, className, placeholder, name, handler, required, value, disabled}) => {

    return (
        <div className='input-container'>
            <input 
                type={type}
                className={className}
                placeholder={placeholder}
                name={name}
                onChange={(e)=>handler(e)}
                required={required}
                value={value ? value : ""}
            />
        </div>
    )
}