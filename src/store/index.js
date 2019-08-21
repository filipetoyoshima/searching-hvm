import {creatStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import searchingHvmReducer from '../reducers/searchingHvmReducer';


const INITIAL_STATE = {
    numbers: []
};

function configureStore(state=INITIAL_STATE){
    return creatStore(searchingHvmReducer, state, applyMiddleware(thunk));
}

export default configureStore;