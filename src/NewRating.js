import React, {Component} from 'react'

export default class Rating extends Component {
    state = {rating: 0}

    handleClick(index) {
        const {rating} = this.state;
        index === rating ? this.setState({rating: index - 1}) : this.setState({rating: index})
    }

    render() {
        const {rating} = this.state;
        const {max} = this.props;
        const stars = [];

        for (let i = 0; i < max; i++) {
            stars.push('')
        }

        const starList = stars.map((item, index) => {
            return(
                <span onClick={() => this.handleClick(index + 1)} key={index} style={{cursor: "pointer"}}>
                    {  index + 1 > rating ? '☆' : '★' }
                </span>
            )
        });

        return (
            <div>
                {starList}
            </div>
        )
    }
}