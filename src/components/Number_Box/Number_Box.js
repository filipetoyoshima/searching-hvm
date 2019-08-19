import React from 'react'
import './Number_Box.css'

class Number_Box extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            is_open: false,
        }
        this.getNumber = this.getNumber.bind(this)
    }

    render() {
        return (
            <div className='number-box'>
                <div className='number'>
                    {this.getNumber()}
                </div>
            </div>
        )
    }

    getNumber() {
        if (this.state.is_open) {
            return this.props.number;
        } else {
            return '?'
        }
    }
}

export default Number_Box