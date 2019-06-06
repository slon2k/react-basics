import React, {Component} from 'react'

export default class Rating extends Component {
    state = {rating: 0}

    handleClick = (event) => {
        const {rating} = this.state;
        const index = event.target.dataset.rating;
        if (index !== undefined) {
            index === rating ? this.setState({rating: index - 1}) : this.setState({rating: index})
        }
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
                <span key={index + 1} data-rating={index + 1} style={{cursor: "pointer"}}>
                    {  index + 1 > rating ? '☆' : '★' }
                </span>
            )
        });

        return (
            <div onClick = {this.handleClick}>
                {starList}
            </div>
        )
    }
}