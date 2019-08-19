import React from 'react';
import './Home.css';
import Game from '../Game/Game';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number_of_cells: 10,
            is_running: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.gameStart    = this.gameStart.bind(this);
        this.gameStop     = this.gameStop.bind(this);

    }

    render() {

        if (this.state.is_running) {
            return (
                <>
                    <Game
                        number_of_cells={this.state.number_of_cells}
                    />
                    <button
                        onClick={this.gameStop}  
                    >
                        Back to Home
                    </button>
                </>
            )
        } else {
            return (
                <div className='container'>
                    <h1>Searching Game</h1>
                    <label htmlFor="how-many-numbers">
                        How many numbers?
                    </label>
                    <br/>
                    <input
                        id="number-of-cells"
                        onChange={this.handleChange}
                        style={{
                            marginTop: 10
                        }}
                    />
                    <button
                        onClick={this.gameStart}
                    >
                        Go!
                    </button>
                    
                </div>
            )
        }
    };

    handleChange(e) {
        if (!isNaN(e.target.value)) {
            let number = parseInt(e.target.value, 10)
            this.setState({
                number_of_cells: number,
            });
        }
    };

    gameStart(e) {
        if (this.state.number_of_cells < 1) {
            // warn the user here!
            // i'm too lazy to do it right now
            // c'mon, it's 23:28 now... I got to wake up early tomorrow
        } else {
            this.setState({
                is_running: true
            })
        }
    };

    gameStop(e) {
        this.setState({
            is_running: false
        })
    };
}

export default Home;
