import React from 'react';
import Game from '../Game/Game';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';


class SequentialSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            is_bot_turn: false,
            last_box: -1,
            reload: true
        }
    }

    componentDidMount = async () => {

        let i = 0;
        let array = [];

        for (i = 0; i < this.props.number_of_cells - 1; i++) {
            let r = Math.floor(Math.random() * 1000) + 1;
            array.push(r);
        }

        this.setState({
            array,
        })

        await this.props.setArray(array);

    }

    render() {
        return (
            <main>
                <Game
                    number_of_cells={this.props.number_of_cells}
                    algorithm="SEQUENTIAL"
                    array={this.state.array}
                    search_with_sentinel={this.search_with_sentinel}
                />
            </main>
        );
    }

    //Search with sentinel, where 'i' is the lucky number
    search_with_sentinel = async () => {

        let { closeCard, changeTurn, openCard } = this.props;


        let num = this.props.next_play;

        // Jump numbers opened before 
        while (this.props.opened_cards.includes(num)) {
            num++;
        }

        await this.props.nextPlay(num);

        openCard(this.props.next_play, this.props.cards, this.props.lucky_number);


        if (!this.props.win_game) {
            setTimeout(() => {

                closeCard(this.props.current_card_index, this.props.cards);

                changeTurn(this.props.turn_player);

            }, 2000)

            await this.props.nextPlay(this.props.next_play + 1);
        }
    }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
    setArray: (arr) => dispatch(searchingHvmAction.setArray(arr)),
    openCard: (index, arr, lucky) => dispatch(searchingHvmAction.openCard(index, arr, lucky)),
    closeCard: (index, arr) => dispatch(searchingHvmAction.closeCard(index, arr)),
    changeTurn: (turn) => dispatch(searchingHvmAction.changeTurn(turn)),
    openedCard: (index) => dispatch(searchingHvmAction.openedCard(index)),
    nextPlay: (n) => dispatch(searchingHvmAction.nextPlay(n)),
    indexLucky: (i) => dispatch(searchingHvmAction.indexLucky(i))
});

export default connect(mapStateToProps, mapDispatchToProps)(SequentialSearch);
