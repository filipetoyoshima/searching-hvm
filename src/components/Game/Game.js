import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';
import Button from '@material-ui/core/Button';


class Game extends React.Component {

    constructor(props) {
        super(props)
        // Receive by props the number of numbers that the game will have
        this.state = {
            array: [],
            is_box_open: [],
            is_bot_turn: false,
            last_box: -1,
            reload: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        // Initiate 2 arrays:
        //
        // - Array of numbers, which the game will use
        //   This array will have 1~30 between each number
        //
        // - Array of closed and open.
        //   This value will be passed to each number box

        if (this.props.array) {
            await this.props.setArray(this.props.number_of_cells, this.props.array);
        }else{
            await this.props.setArray(this.props.number_of_cells);
        }
    }

    render() {
        return (
            <div className='game-container'>
                {this.props.win_game ? (
                    <h1>
                        {this.props.turn_player ? "Você Ganhou" : "Você Perdeu"}
                    </h1>
                ) : (<></>)}
                <>
                    <div className="bot_turn">
                        <h1>
                            Find the number {this.props.lucky_number}!
                        </h1>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={!this.props.turn_player || this.props.win_game}
                            onClick={() => this.botTurn()}>
                            Bot Turn!
                        </Button>
                    </div>
                    <div>
                        {this.getText()}
                    </div>
                    <div className='boxes-container'>
                        {
                            // Render a NumberBox for each element in
                            // numbers array, from componentDidMount()
                            this.props.cards.map((card, index) =>
                                <div
                                    onClick={() => this.handleClick(index)}
                                    className='inside-container'
                                    key={'div' + index}>
                                    <NumberBox
                                        number={card.number}
                                        is_open={card.open}
                                        index={index}
                                        key={index}
                                    />
                                </div>
                            )
                        }
                    </div>
                </>
            </div>
        )
    }

    handleClick = async (index) => {
        // Player's turn!
        // Block a second click before bot's play
        if (this.props.win_game) {
            return;
        }

        if (!this.props.cards[this.props.current_card_index]) {

            await this.props.openCard(index, this.props.cards, this.props.lucky_number);

            await this.props.openedCard(index);
        }

        if (this.props.smart && !this.props.win_game) {
            await this.props.update_known_set();
        }

        this.setState({
            reload: !this.state.reload
        })
    }

    botTurn = async () => {
        // Bot's Turn

        let { closeCard, changeTurn, openCard } = this.props;
        // Give the turn
        await this.props.changeTurn(this.props.turn_player);

        // Close all cards
        await this.props.closeCard(this.props.current_card_index, this.props.cards);

        // Change algorithm
        switch (this.props.algorithm) {
            case 'SEQUENTIAL':
                this.props.search_with_sentinel();
                return;

            case 'BINARY':                
                this.props.search_binary();
                return;

            case 'INTERPOLATION':
                this.props.interpolation_search();
                return;

            default:
                // In default case, bot just open the first card
                openCard(0, this.props.cards, this.props.lucky_number);
                if (!this.props.win_game) {
                    setTimeout(() => {
                        closeCard(this.props.current_card_index, this.props.cards);
                        changeTurn(this.props.turn_player);
                    }, 2000)
                }

        }
    }

    getText() {

        switch (this.props.algorithm) {
            case 'SEQUENTIAL':
                return (
                    <>
                        <p>
                            The numbers below are between 0 and 1000<br/>
                            They are not sorted, this is all random<br/>
                            The algorithm will try every card that was not tried yet
                        </p>
                    </>
                );
            case 'BINARY':
                return (
                    <>
                        <p>
                            Each number is 1~30 bigger then the previous, that is, they are orderd.<br/>
                        </p>
                        <p>
                            The algorithm will guess the middle of the sequence.<br/>
                            If the guessed number is greater then the searched one, discard everything at left.<br/>
                            If not, the algorithm will discard everything at right.<br/>
                            And then guess the middle of the numbers that was not discarded.
                        </p>
                    </>
                );
            case 'INTERPOLATION':
                return (
                    <>
                        <p>
                            Each number is 1~30 bigger then the previous, that is, they are ordered<br/>
                        </p>
                        <p>
                            The algorithm will do some math to try to estimate the position of the right number<br/>
                            The math is based on a linear distribution based on the known numbers<br/>
                            Each card that the algorithm opens is added to the known cards<br/>
                            If nothing is known yet, the algorithm assumes a linear distribution of 15 between each number.
                        </p>
                    </>
                )
            
        }
    }

}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    setArray: (number_of_cells, array) => dispatch(searchingHvmAction.setArray(number_of_cells, array)),
    openCard: (index, arr, lucky) => dispatch(searchingHvmAction.openCard(index, arr, lucky)),
    closeCard: (index, arr) => dispatch(searchingHvmAction.closeCard(index, arr)),
    changeTurn: (turn) => dispatch(searchingHvmAction.changeTurn(turn)),
    openedCard: (index) => dispatch(searchingHvmAction.openedCard(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
