import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import searchingHvmReducer from '../reducers/searchingHvmReducer';


const INITIAL_STATE = {
    numbers: [],
    lucky_number: '3'
};

function configureStore(state=INITIAL_STATE){
    return createStore(searchingHvmReducer, state, applyMiddleware(thunk));
}

export default configureStore;