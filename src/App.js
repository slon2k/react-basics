import React from 'react';
import Clock from './Clock';
import PasswordGenerator from './PasswordGenerator'
import Rating from './NewRating'

const App =  () => {
    return (
        <div>
            <h1>React Basics</h1>
            <Clock/>
            <hr/>
            <PasswordGenerator/>
            <hr/>
            <Rating/>

        </div>
    )
};

export default App
