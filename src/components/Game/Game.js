import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';

class Game extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            is_box_open: [],
            last_box: -1,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let i, r = Math.floor(Math.random() * 30 + 1);
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
            </div>
        )
    }

    handleClick(index) {
        let actual_open_array = this.state.is_box_open;
        actual_open_array[index] = true;

        if (this.state.last_box !== -1 && this.state.last_box !== index) {
            actual_open_array[this.state.last_box] = false;
        }

        this.setState({
            is_box_open: actual_open_array,
            last_box: index
        })

    }   
}

export default Game;
