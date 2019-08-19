import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';

class Game extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            array: []
        }
    }

    componentDidMount() {
        let i, r = Math.floor(Math.random() * 30 + 1);
        let arr = [r];
        for (i=1; i<this.props.number_of_cells; i++) {
            r = Math.floor(Math.random() * 30 + 1);
            arr.push(arr[i-1] + r);
        }
        this.setState({
            array: arr
        })
    }

    render() {
        return (
            <div className='game-container'>
                <h1>
                    The game will happen here, with {this.props.n} numbers
                </h1>
                <div className='boxes-container'>
                    {
                        this.state.array.map((number, index) =>
                            <NumberBox number={number} key={index}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Game;
