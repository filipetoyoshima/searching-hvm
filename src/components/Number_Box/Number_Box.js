import React from 'react'
import './Number_Box.css'

class NumberBox extends React.Component {
    constructor(props){
        super(props);
        this.getNumber = this.getNumber.bind(this)
        this.open_box = this.open_box.bind(this)
    }

    render() {
        return (
            <div className='number-box'
                onClick={this.open_box}
            >
                <div className='number'>
                    {this.getNumber()}
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

    open_box(e) {
        this.setState({
            is_open: true
        })
    }

    close_box(e) {
        this.setState({
            is_open: false
        })
    }
}

export default NumberBox