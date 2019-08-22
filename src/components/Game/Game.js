import React from 'react'
import './Game.css'
import NumberBox from '../Number_Box/Number_Box';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';
import Button from '@material-ui/core/Button';
import SelectInput from '@material-ui/core/Select/SelectInput';


class Game extends React.Component {

    constructor(props) {
        super(props)
        // Receive by props the number of numbers that the game will have
        this.state = {
            array: [],
            is_box_open: [],
            is_bot_turn: false,
            last_box: -1,
            reload: true
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


        this.setState({
            array: arr,
            is_box_open: open_arr,
        })
    }

    render() {
        return (
            <div className='game-container'>
                <h1>
                    Find the number {this.props.lucky_number}!
                </h1>
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
                <Button variant="contained" color="secondary" onClick={() => this.botTurn()}>
                    Secondary
                </Button>
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
            await this.props.openCard(index, this.props.cards);
        }

        this.setState({
            reload: !this.state.reload
        })
    }

    botTurn = async () => {
        let {closeCard} = this.props;
        await this.props.closeCard(this.props.current_card_index, this.props.cards)
        await this.props.openCard(0, this.props.cards);

        setTimeout(() => {
            closeCard(this.props.current_card_index, this.props.cards);
        },2000)

    }

}
const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    setArray: (arr) => dispatch(searchingHvmAction.setArray(arr)),
    openCard: (index, arr) => dispatch(searchingHvmAction.openCard(index, arr)),
    closeCard: (index, arr) => dispatch(searchingHvmAction.closeCard(index, arr)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
