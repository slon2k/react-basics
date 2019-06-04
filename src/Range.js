import React from 'react'

const Range = ({value, onChange, min, max}) => {
    return(
        <div>
            <label>
                Length
                <input
                    onChange = {onChange}
                    type="Range"
                    value={value}
                    min={min}
                    max={max}/>
            </label>
            {value}
            <br/>
        </div>
    )
}

export default Range