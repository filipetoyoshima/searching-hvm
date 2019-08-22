import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import searchingHvmReducer from '../reducers/searchingHvmReducer';


const INITIAL_STATE = {
    cards: [],
    lucky_number: '',
    current_card_index: '',
    turn_player: true
};

function configureStore(state=INITIAL_STATE){
    return createStore(searchingHvmReducer, state, applyMiddleware(thunk));
}

export default configureStore;