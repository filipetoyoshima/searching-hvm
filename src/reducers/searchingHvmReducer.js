export default (state, action) => {
    switch(action.type){

        case "SET_ARRAY":
            return {
                ...state,
                numbers: action.numbers
            };
        
        default:
            return state;
    }
};