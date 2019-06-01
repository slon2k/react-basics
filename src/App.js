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

   componentDidMount() {
       this.updateTime();
       this.interval = setInterval(this.updateTime, 1000);
   }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
      const {time, mode} = this.state;
      return (
          <div>
              <h1>Project 1</h1>
              <h3>{time}</h3>
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

