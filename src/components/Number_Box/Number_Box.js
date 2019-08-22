import React from 'react'
import './Number_Box.css'

class NumberBox extends React.Component {
    constructor(props){
        super(props);
        // Receive by props:
        // - is_open, a boolean value that tell if the box is open
        // - number, the number that the box represents
        // - index, an integer the tell which box is it
        this.getNumber = this.getNumber.bind(this)
    }

    render() {
        return (
            <div className='number-box'
                onClick={this.open_box}
            >
                <div className='number'>
                    {this.getNumber()}
                </div>
                <div className='corner-number'>
                    {this.props.index + 1}
                </div>
            </div>
        )
    }

    getNumber() {
        if (this.props.is_open) {
            return this.props.number;
        } else {
            return '?'
        }
    }
}

export default NumberBox