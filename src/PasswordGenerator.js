import React, {Component} from 'react'

export default class PasswordGenerator extends Component {

    state = {

    };

    setInitialState() {
        const state = {
            pass: '',
            fields: [
                {fieldName: 'Length', type: 'range', value: 8, readonly: false, min: 6, max: 12},
                {fieldName: 'Numbers', type: 'checkbox', value: true, readonly: true},
                {fieldName: 'Lowercase', type: 'checkbox', value: false, readonly: false},
                {fieldName: 'Uppercase', type: 'checkbox', value: false, readonly: false},
                {fieldName: 'Symbols', type: 'checkbox', value: false, readonly: false}
            ]
        };

        this.setState(state);
    }

    componentWillMount() {
        this.setInitialState()
    }

    createRange = (item) => {
        return(
            <div key = {item.fieldName}>
                <label>
                    {item.fieldName}
                    <input
                        key = {item.fieldName}
                        onChange = {this.handleChangeRange}
                        type={item.type}
                        name={item.fieldName}
                        value={item.value}
                        readOnly={item.readonly}
                        min={item.min}
                        max={item.max}/>
                </label>
                {item.value}
                <br/>
            </div>
        )
    };

    handleChangeRange = (event) => {
        const {fields} = this.state;
        const index = fields.findIndex((item) => item.fieldName === event.target.name);
        if (index > -1) {
            fields[index].value = event.target.value;
            this.setState({fields})
        }
    };

    handleCheck = (event) => {
        const {fields} = this.state;
        const index = fields.findIndex((item) => item.fieldName === event.target.name);
        if (index > -1 && !fields[index].readonly)  {
            fields[index].value = event.target.checked;
            this.setState({fields})
        }
    };

    createCheckbox = (item) => {
        return(
            <div key = {item.fieldName}>
                <label>
                    <input
                        onChange = {this.handleCheck}
                        type={item.type}
                        name={item.fieldName}
                        checked={item.value}
                        readOnly={item.readonly}/>
                    {item.fieldName}
                </label>
                <br/>
            </div>
        )
    };

    getRandomSymbol = (str) => {
        const index = Math.floor(Math.random()*str.length);
        return str[index];
    };

    generatePassword = (event) => {

        const sets = {
                Numbers: "0123456789",
                Lowercase: "abcdefghijklmnopqrstuvwxyz",
                Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                Symbols: "!#$%&()*+,-./:;<=>?@[]^_`{|}~"
        };

        let charSet = '';

        let length = 0;

        const {fields} = this.state;

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field.type === 'checkbox' && field.value === true) {
                charSet = charSet + sets[field.fieldName];
            }
            if (field.fieldName === "Length"){
                length = field.value;
            }
        }

        let newPass = '';

        for (let i = 0; i < length; i++) {
            newPass = `${newPass}${this.getRandomSymbol(charSet)}`;
        }

        this.setState({pass: newPass});

        event.preventDefault();
    };

    render() {
        const {pass, fields} = this.state;

        const formFields = fields.map((item) => {
            if(item.type === 'range') {
                return this.createRange(item)
            }
            return this.createCheckbox(item)
        });

        return(
            <div>
                <h2>Password Generator</h2>
                <h3>Generate a secure password</h3>
                <div>
                    <input type="text" readOnly={true} value={pass}/>
                </div>

                <form>
                    {formFields}
                    <button onClick={this.generatePassword}>Generate</button>
                </form>
            </div>
        )
    }
}