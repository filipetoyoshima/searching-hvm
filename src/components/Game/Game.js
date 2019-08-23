import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';
import Button from '@material-ui/core/Button';
import searchWithSentinel from '../../SearchAlgorithms/searchWithSentinel';


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

        let i;
        let r = Math.floor(Math.random() * 30 + 1);
        let arr = [r];
        let open_arr = [false];

        for (i = 1; i < this.props.number_of_cells; i++) {
            r = Math.floor(Math.random() * 30 + 1);
            arr.push(arr[i - 1] + r);
            open_arr.push(false);
        }

        await this.props.setArray(arr);

        i = await searchWithSentinel(this.props.cards, this.props.lucky_number);

        this.setState({
            i,
            array: arr,
            is_box_open: open_arr,
        })
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
        // Receive the index of the clicked box
        // - Open the clicked NumberBox
        // - Close other boxes, if needed
        // - Give the turn to the Bot (not implemented yet)

        // validate if it is player's turn
        /*         if (this.state.is_bot_turn) {
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
                }) */



        if (!this.props.cards[this.props.current_card_index]) {
            await this.props.openCard(index, this.props.cards, this.props.lucky_number);
            await this.props.openedCard(index);
        }

        this.setState({
            reload: !this.state.reload
        })
    }

    botTurn = async () => {
        let { closeCard, changeTurn, openCard } = this.props;
        await this.props.changeTurn(this.props.turn_player);
        await this.props.closeCard(this.props.current_card_index, this.props.cards);
        switch (this.props.algorithm) {
            case 'WITH_SENTINEL':
                this.search_with_sentinel();
                return;

            default:
                openCard(0, this.props.cards, this.props.lucky_number);
                if(!this.props.win_game){
                    setTimeout(() => {
                        closeCard(this.props.current_card_index, this.props.cards);
                        changeTurn(this.props.turn_player);
                    }, 2000)
                }
                    
        }
    }

    search_with_sentinel = () => {
        let { closeCard, changeTurn, openCard } = this.props;

        if (this.state.n <= this.state.i) {
            openCard(this.state.n, this.props.cards, this.props.lucky_number);
        }

        if(!this.props.win_game){
            setTimeout(() => {
                
                closeCard(this.props.current_card_index, this.props.cards);
                
                changeTurn(this.props.turn_player);
                
            }, 2000)
            
            this.setState({
                n: this.state.n + 1
            });
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
