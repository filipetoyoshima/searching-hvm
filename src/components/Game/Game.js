import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';

class Game extends React.Component {
    
    constructor(props) {
        super(props)
        // Receive by props the number of numbers that the game will have
        this.state = {
            array: [],
            is_box_open: [],
            is_bot_turn: false,
            last_box: -1,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // Initiate 2 arrays:
        //
        // - Array of numbers, which the game will use
        //   This array will have 1~30 between each number
        //
        // - Array of closed and open.
        //   This value will be passed to each number box

        let i;
        let r = Math.floor(Math.random() * 30 + 1);
        let arr = [r];
        let open_arr = [false];

        for (i=1; i<this.props.number_of_cells; i++) {
            r = Math.floor(Math.random() * 30 + 1);
            arr.push(arr[i-1] + r);
            open_arr.push(false);
        }

        this.setState({
            array: arr,
            is_box_open: open_arr,
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
                        // Render a NumberBox for each element in
                        // numbers array, from componentDidMount()
                        this.state.array.map((number, index) =>
                            <div
                                onClick={() => this.handleClick(index)}
                                className='inside-container'
                                key={'div' + index}>
                                <NumberBox
                                    number={number}
                                    is_open={this.state.is_box_open[index]}
                                    index={index}
                                    key={index}
                                />
                            </div>
                        )
                    }
                </div>
                <div className='bot-button'>
                    Bot Turn!
                </div>
            </div>
        )
    }

    handleClick(index) {
        // Receive the index of the clicked box
        // - Open the clicked NumberBox
        // - Close other boxes, if needed
        // - Give the turn to the Bot (not implemented yet)

        // validate if it is player's turn
        if (this.state.is_bot_turn) {
            return;
        }

        let actual_open_array = this.state.is_box_open;
        actual_open_array[index] = true;

        if (this.state.last_box !== -1 && this.state.last_box !== index) {
            actual_open_array[this.state.last_box] = false;
        }

        this.setState({
            is_box_open: actual_open_array,
            last_box: index,
            is_bot_turn: true,
        })
    }
}

export default Game;
