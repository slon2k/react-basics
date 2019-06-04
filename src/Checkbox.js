import React from 'react'

const Checkbox = ({onChange, name, checked, readonly}) => {
    return (
        <label>
            <input
                onChange = {onChange}
                type="checkbox"
                name={name}
                checked={checked}
                readOnly={readonly}/>
            {name}
        </label>
    )
}

export default Checkbox