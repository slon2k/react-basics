import React, {Component} from 'react';

export default class Clock extends Component {
    state = {
        mode: '24_hours',
        time: new Date()
    }

    updateTime = () => {
        this.setState({time: new Date()});
    }

    changeMode = (mode) => {
        this.setState({mode});
    }

    toTwoDigits = (num) => {
        return parseInt(num).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }

    time24 = (time) => {
        return `${time.getHours()}:${this.toTwoDigits(time.getMinutes())}:${this.toTwoDigits(time.getSeconds())}`;
    }

    time12 = (time) => {
        const dayTime = time.getHours() < 12 ? "AM" : "PM";
        return `${time.getHours()%12}:${this.toTwoDigits(time.getMinutes())}:${this.toTwoDigits(time.getSeconds())} ${dayTime}`;
    }

    componentDidMount() {
        this.interval = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        const {time, mode} = this.state;
        const formattedTime = mode === '24_hours' ? this.time24(time) :  this.time12(time);
        return (
            <div>
                <h2>Digital clock</h2>
                <h3>{formattedTime}</h3>
                <form>
                    <label>
                        <input onChange={() => {this.changeMode("24_hours")}} type="radio" name="mode" value="24_hours" checked = {mode==="24_hours"}/> 24
                    </label>
                    <label>
                        <input onChange={() => {this.changeMode("12_hours")}} type="radio" name="mode" value="12_hours" checked = {mode==="12_hours"}/> 12
                    </label>
                </form>
            </div>
        )
    }
}
