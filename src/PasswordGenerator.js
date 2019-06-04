import React, {Component} from 'react'

export default class PasswordGenerator extends Component {

    state = {
        pass: '',
        length: 8,
        sets: {
            Numbers: {name: "Numbers", checked: true, readonly: true, charSet: "0123456789"},
            Lowercase: {name: "Lowercase", checked: false, readonly: false, charSet: "abcdefghijklmnopqrstuvwxyz"},
            Uppercase: {name: "Uppercase", checked: false, readonly: false, charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"},
            Symbols: {name: "Symbols", checked: false, readonly: false, charSet: "!#$%&()*+,-./:;<=>?@[]^_{|}~"},
        }
    }

    createRange() {
        const {length} = this.state;
        return(
            <div key = {"length"}>
                <label>
                    Length
                    <input
                        onChange = {this.changeLength}
                        type="Range"
                        value={length}
                        min="6"
                        max="12"/>
                </label>
                {length}
                <br/>
            </div>
        )
    }

    changeLength = (event) => {this.setState({length: event.target.value})}

    toggleSet = (set) => {
        const {sets} = this.state;
        if(!sets[set].readonly) {
            sets[set].checked = !sets[set].checked;
            this.setState({sets});
        }
    }

    getRandomSymbol = (str) => {
        const index = Math.floor(Math.random()*str.length);
        return str[index];
    }

    generatePassword = (event) => {
        const {sets, length} = this.state;
        const charSet = Object.values(sets)
            .filter((item) => {return item.checked})
            .map((item) => {return item.charSet})
            .join('');

        let newPass = [''];

        for (let i = 0; i < length; i++) {
            newPass.push(this.getRandomSymbol(charSet));
        }

        this.setState({pass: newPass.join('')});

        event.preventDefault();
    };

    createFields(sets) {
        return Object.values(sets).map((item) => {
            return(
                <div key={item.name}>
                    <label>
                        <input
                            onChange = {() => this.toggleSet(item.name)}
                            type="checkbox"
                            name={item.name}
                            checked={item.checked}
                            readOnly={item.readonly}/>
                        {item.name}
                    </label>
                    <br/>
                </div>
            )
        })
    }

    render() {
        const {pass, sets} = this.state;
        const fields = this.createFields(sets);

        return(
            <div>
                <h2>Password Generator</h2>
                <h3>Generate a secure password</h3>
                <div>
                    <input type="text" readOnly={true} value={pass}/>
                </div>
                {this.createRange()}

                <form>
                    {fields}
                    <button onClick={this.generatePassword}>Generate</button>
                </form>
            </div>
        )
    }
}