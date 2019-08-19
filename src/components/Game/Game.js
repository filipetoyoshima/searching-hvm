import React from 'react'
import './Game.css'
import Number_Box from '../Number_Box/Number_Box';

class Game extends React.Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='game-container'>
                <h1>
                    The game will happen here, with {this.props.n} numbers
                </h1>
                <div className='boxes-container'>
                    <Number_Box number={2} />
                    <Number_Box number={3} />
                    <Number_Box number={3} />
                    <Number_Box number={3} />
                    <Number_Box number={3} />
                    <Number_Box number={3} />
                    <Number_Box number={3} />
                </div>
            </div>
        )
    }
}

export default Game;
