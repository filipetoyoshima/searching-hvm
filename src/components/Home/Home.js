import React from 'react';
import './Home.css';
import Game from '../Game/Game';
import AlgorithmButton from '../AlgorithmButton/AlgorithmButton';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';
import SequentialSearch from '../SequentialSearch/SequentialSearch';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number_of_cells: 10,
            is_running: false,
            text: '',
            algorithms: ["Busca Sequencial"],
            searchWithSentinel: false,
            algorithm: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.gameStart = this.gameStart.bind(this);
        this.gameStop = this.gameStop.bind(this);

    }

    chooseAlgorithm = () => {
        switch (this.state.algorithm) {
            case "SENQUENTIAL":
                return (
                    <main>
                        <SequentialSearch
                            number_of_cells={this.state.number_of_cells}
                        />
                        <button
                            onClick={this.gameStop}
                        >
                            Back to Home
                    </button>
                    </main>
                );

            default:
                return (

                    <main>
                        <Game
                            number_of_cells={this.state.number_of_cells}
                        />
                        <button
                            onClick={this.gameStop}
                        >
                            Back to Home
                            </button>
                    </main>
                );
        }

    }

    render() {
        // If Game is set up, then renders the
        // Game component. Also returns a button
        // to go back to the set up menu

        if (this.state.is_running) {
            return (
                this.chooseAlgorithm()
            );

            // If the Game is not set up yet (initial state)
            // then renders a menu where the player can
            // set up things and click on button to start the game 
        } else {
            return (
                <div className='container'>
                    <h1>Searching Game</h1>
                    <label htmlFor="how-many-numbers">
                        How many numbers?
                    </label>
                    <br />
                    <input
                        id="number-of-cells"
                        onChange={this.handleChange}
                        value={this.state.text}
                        style={{
                            marginTop: 10
                        }}
                    />
                    <button
                        onClick={this.gameStart}
                    >
                        Go!
                    </button>
                    <div className="options">
                        <AlgorithmButton text={this.state.algorithms[0]} onClick={() => {
                            this.setState({
                                searchWithSentinel: true
                            }, this.gameStart)
                        }} />
                    </div>

                </div>
            )
        }
    };

    handleChange(e) {
        // Updates the input value.
        // Validates if the input still a number

        if (!isNaN(e.target.value)) {
            let number = parseInt(e.target.value, 10)
            this.setState({
                number_of_cells: number,
                text: e.target.value,
            });
        }
    };

    gameStart = async (e) => {
        // If the input value is a valid number,
        // then start the game

        if (this.state.searchWithSentinel) {
            await this.setState({
                algorithm: 'SENQUENTIAL'
            })


        }

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

    async gameStop(e) {
        // Just stop the game

        window.location.reload();
        await this.props.stopGame();
        this.setState({
            is_running: false
        })
    };
}


const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    stopGame: () => dispatch(searchingHvmAction.stopGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
