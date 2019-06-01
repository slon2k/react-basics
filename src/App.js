import React, {Component} from 'react';

export default class App extends Component {
   state = {
       time: '',
       mode: '24_hours'
   };

   updateTime = () => {
       this.setState({time: Date()});
   };

   changeMode = (event) => {
       this.setState({mode: event.target.value});
   };

   time24 = (time) => {
       return time.slice(16, 24);
   };

   time12 = (time) => {
       const hours = parseInt(time.slice(16, 18));
       const minutes_seconds = time.slice(18, 24);
       const dayTime = hours < 12 ? "AM" : "PM";
       return `${ hours % 12 }${ minutes_seconds } ${ dayTime }`
   };

   componentDidMount() {
       this.updateTime();
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
              <h3>{formattedTime}</h3>
              <form>
                  <label>
                      <input onChange={this.changeMode} type="radio" name="mode" value="24_hours" checked = {mode==="24_hours"}/> 24
                  </label>
                  <label>
                      <input onChange={this.changeMode} type="radio" name="mode" value="12_hours" checked = {mode==="12_hours"}/> 12
                  </label>
              </form>
          </div>
      )
  }
}

