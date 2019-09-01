import React from 'react';
import Game from '../Game/Game';
import { connect } from 'react-redux';
import * as searchingHvmAction from '../../actions/searchingHvmAction';
import { throwStatement } from '@babel/types';

class IndexedSequentialSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_bot_turn: false,
            last_box: -1,
            reload: true,
            indexes: [],
            indexed: false
        }
    }

    componentDidMount = async () => {

        let i = 0;

        let interval = (this.props.number_of_cells / 100) * 10;
        interval = interval < 1 ? 0 : interval;
        let indexes = [];
        
        
        for (i = 0; i < this.props.number_of_cells; i = i + interval) {
            indexes.push(i);
        }


        this.setState({
            indexes,
            indexed: this.props.indexed || this.state.indexed
        })

    }

    render() {
        return (
            <main>
                <Game
                    number_of_cells={this.props.number_of_cells}
                    algorithm="SEQUENTIAL"
                    search_with_sentinel={this.search_with_sentinel}
                />
            </main>
        );
    }

    //Search with sentinel, where 'i' is the lucky number
    search_with_sentinel = async () => {

        let { closeCard, changeTurn, openCard } = this.props;

        let num = 0;

        if (this.state.indexed) {
            num = this.first_index();
            let indexed = false;
            this.setState({
                indexed
            });
        } else {
            num = this.props.next_play;
        }

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


    first_index = () => {
        let aux = 0;
        let {cards, lucky_number} = this.props;
        let i = 0;

        this.state.indexes.forEach(index => {
            if(cards[index].number <= lucky_number){
                aux = i;
            }
            i++;
        })
        
        return this.state.indexes[aux];
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexedSequentialSearch);
