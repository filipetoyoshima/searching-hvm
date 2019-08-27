import React from 'react';
import Game from '../Game/Game'
import { connect } from 'react-redux'
import * as searchingHvmAction from '../../actions/searchingHvmAction';

class InterpolationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min_index: -1,
            max_index: this.props.number_of_cells,
            min_value: 0,
            max_value: (this.props.number_of_cells + 1) * 15
        }
    }

    componentDidMount = async () => {
        console.log("mounted")
        console.log(this.props.number_of_cells, "n of cells")
        await this.props.setArray(this.props.number_of_cells);
    }

    render () {
        return (
            <main>
                <Game
                    number_of_cells={this.props.number_of_cells}
                    algorithm="INTERPOLATION"
                    smart={this.props.smart}
                    interpolation_search={this.interpolation_search}
                />
            </main>
        )
    }

    interpolation_search = async () => {
        let { closeCard, changeTurn, openCard } = this.props;

        let target = this.props.lucky_number;
        let linear_coef =
            (this.state.max_value - this.state.min_value) /
            (this.state.max_index - this.state.min_index)
        let guess = Math.floor(target / linear_coef);

        if (guess >= this.state.max_index) {
            guess = this.state.max_index - 1
        } else if (guess <= this.state.min_index) {
            guess = this.state.min_index + 1
        }

        console.log(this.state.max_index, "max");
        console.log(this.state.min_index, "min");
        console.log(guess, "guess")
        openCard(guess, this.props.cards, this.props.lucky_number);

        if (!this.props.win_game) {
            let actual_card = this.props.current_card_index;

            setTimeout(() => {
                closeCard(guess, this.props.cards);
                changeTurn(this.props.turn_player);
            }, 2000)

            if (this.props.lucky_number > this.props.cards[actual_card].number) {
                this.setState({
                    min_index: actual_card,
                    min_value: this.props.cards[actual_card].number
                })
            } else {
                this.setState({
                    max_index: actual_card,
                    max_value: this.props.cards[actual_card].number
                })
            }
        }
    }
}


const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    setArray: (number_of_cells, array) => dispatch(searchingHvmAction.setArray(number_of_cells, array)),
    openCard: (index, arr, lucky) => dispatch(searchingHvmAction.openCard(index, arr, lucky)),
    closeCard: (index, arr) => dispatch(searchingHvmAction.closeCard(index, arr)),
    changeTurn: (turn) => dispatch(searchingHvmAction.changeTurn(turn)),
    openedCard: (index) => dispatch(searchingHvmAction.openedCard(index)),
    nextPlay: (n) => dispatch(searchingHvmAction.nextPlay(n)),
    indexLucky: (i) => dispatch(searchingHvmAction.indexLucky(i))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterpolationSearch);
