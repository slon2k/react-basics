import React, {Component} from 'react';

export default class App extends Component {
   state = {
       time: ''
   };

   updateTime = () => {
       this.setState({time: Date()});
   };

   componentDidMount() {
       this.updateTime();
       this.interval = setInterval(this.updateTime, 1000);
   }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
      const {time} = this.state;
      return (
          <div>
              <h1>Project 1</h1>
              <h3>{time}</h3>
          </div>
      )
  }
}

