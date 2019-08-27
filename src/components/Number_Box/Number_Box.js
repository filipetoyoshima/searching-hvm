import React from 'react'
import './Number_Box.css'
import { connect } from 'react-redux';


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
            <div className={this.getClass()}>
                <div className='number'>
                    {this.getNumber()}
                </div>
                <div className='corner-number'>
                    {this.props.index}
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

    getClass() {
        let class_name = 'number-box'
        if (this.props.win_game && this.props.is_open) {
            if (this.props.turn_player) {
                class_name = 'number-box-winner';
            } else {
                class_name = 'number-box-loser';
            }
        }
        return class_name
    }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberBox);