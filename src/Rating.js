import React, {Component} from 'react'

export default class Rating extends Component {

    state = {};

    setInitialState() {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(false)
        }
        this.setState({stars})
    }

    componentWillMount() {
        this.setInitialState()
    }

    check(index) {
        const {stars} = this.state;
        for (let i = 0; i <= index; i++) {
            stars[i] = true;
        }
        this.setState({stars});
    }

    uncheck(index) {
        const {stars} = this.state;
        for (let i = index; i < stars.length ; i++) {
            stars[i] = false;
        }
        this.setState({stars});
    }

    handleClick(index) {
        const {stars} = this.state;
        if (stars[index]) {
            this.uncheck(index)
        } else {
            this.check(index)
        }
    }

    renderStar(index, checked) {
        const starSymbol = checked ? '★' : '☆';
        return(
            <span onClick={() => this.handleClick(index)} key={index} style={{cursor: "pointer"}}>
                {starSymbol}
            </span>
        )
    }

    render() {
        const {stars} = this.state;
        const starList = stars.map((item, index) => this.renderStar(index, item));
        return (
            <div>
                <h2>Rating</h2>
                {starList}
            </div>
        )
    }
}