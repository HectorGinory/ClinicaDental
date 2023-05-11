import React from 'react';

export const InputText = ({type, className, placeholder, name, handler, required}) => {

    return (
        <div className='inputTextDesign'>
            <input 
                type={type}
                className={className}
                placeholder={placeholder}
                name={name}
                onChange={(e)=>handler(e)}
                required={required}
            />
        </div>
    )
}