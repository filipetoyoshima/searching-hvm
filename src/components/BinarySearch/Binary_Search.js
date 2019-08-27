import React from 'react';
import Game from '../Game/Game';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';

class BinarySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigger_index: this.props.number_of_cells,
            smaller_index: 0,
        }
    }

    componentDidMount = async () => {
        await this.props.setArray(this.props.number_of_cells);
    }

    render() {
        return (
            <main>
                <Game
                    number_of_cells={this.props.number_of_cells}
                    algorithm="BINARY"
                    smart={this.props.smart}
                    update_known_set={this.update_known_set}
                    search_binary={this.search_binary}
                />
            </main>
        );
    }


    search_binary = async() => {
        let { closeCard, changeTurn, openCard } = this.props;
        let mid = Math.floor(
            (this.state.bigger_index - this.state.smaller_index) / 2 + this.state.smaller_index
        );

        openCard(mid, this.props.cards, this.props.lucky_number);

        if (!this.props.win_game) {
            let actual_card = this.props.current_card_index;

            setTimeout(() => {

                closeCard(mid, this.props.cards);

                changeTurn(this.props.turn_player);

            }, 2000)

            if (this.props.lucky_number > this.props.cards[actual_card].number) {
                this.setState({
                    smaller_index: mid
                })
            } else {
                this.setState({
                    bigger_index: mid
                })
            }
        }
    }

    update_known_set = async() => {
        let actual_card = this.props.cards[this.props.current_card_index].number
        let index = this.props.current_card_index
        if (index > this.state.bigger_index || index < this.smaller_index) {
            return
        }
        if (this.props.lucky_number > actual_card) {
            this.setState({
                smaller_index: index
            })
        } else {
            this.setState({
                bigger_index: index
            })
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

export default connect(mapStateToProps, mapDispatchToProps)(BinarySearch);
