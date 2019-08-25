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
            i: 0,
            n: 0
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

        let arr = [];
        let i;
        if (!this.props.array) {
            let r = Math.floor(Math.random() * 30 + 1);
            arr = [r];

            for (i = 1; i < this.props.number_of_cells; i++) {
                r = Math.floor(Math.random() * 30 + 1);
                arr.push(arr[i - 1] + r);
            }

            this.setState({
                array: arr,
                i
            })

            await this.props.setArray(arr);
        }



    }

    render() {
        return (
            <div className='game-container'>
                {this.props.win_game ? (
                    <h1>
                        {this.props.turn_player ? "Você Ganhou" : "Você Perdeu"}
                    </h1>
                ) : (
                        <>
                            <div className="bot_turn">
                                <h1>
                                    Find the number {this.props.lucky_number}!
                    </h1>
                                <Button variant="contained" color="secondary" disabled={!this.props.turn_player} onClick={() => this.botTurn()}>
                                    Bot Turn!
                    </Button>
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
                    )}
            </div>
        )
    }

    handleClick = async (index) => {
        // Player's turn!
        // Block a second click before bot's play
        if (!this.props.cards[this.props.current_card_index]) {

            await this.props.openCard(index, this.props.cards, this.props.lucky_number);

            await this.props.openedCard(index);
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

}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    setArray: (arr) => dispatch(searchingHvmAction.setArray(arr)),
    openCard: (index, arr, lucky) => dispatch(searchingHvmAction.openCard(index, arr, lucky)),
    closeCard: (index, arr) => dispatch(searchingHvmAction.closeCard(index, arr)),
    changeTurn: (turn) => dispatch(searchingHvmAction.changeTurn(turn)),
    openedCard: (index) => dispatch(searchingHvmAction.openedCard(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
