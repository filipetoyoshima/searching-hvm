import React from 'react';
import Game from '../Game/Game';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';

class Binary_Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigger_index: this.props.number_of_cells,
            smaller_index: 0
        }
    }

    componentDidMount = async () => {
        console.log("cheguei aqui")
        await this.props.setArray(this.props.number_of_cells);
    }

    render() {
        return (
            <main>
                <Game
                    number_of_cells={this.props.number_of_cells}
                    algorithm="BINARY"
                    search_binary={this.search_binary()}
                />
            </main>
        );
    }


    search_binary() {

        if (this.props.cards === []) {
            return;
        }

        let { closeCard, changeTurn, openCard } = this.props;
        let mid = Math.floor((this.state.bigger_index - this.state.smaller_index) / 2);

        console.log(mid)
        console.log(this.props.cards, "oi")

        openCard(mid, this.props.cards, this.props.lucky_number);

        if (!this.props.win_game) {
            let actual_card = this.props.current_card_index;

            setTimeout(() => {

                closeCard(mid, this.props.cards);

                changeTurn(this.props.turn_player);

            }, 2000)

            if (this.props.cards[actual_card] < this.props.lucky_number) {
                this.setState({
                    bigger_index: mid
                })
            } else {
                this.setState({
                    smaller_index: mid
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

export default connect(mapStateToProps, mapDispatchToProps)(Binary_Search);
