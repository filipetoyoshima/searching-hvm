export default (state, action) => {
    switch(action.type){

        case "SET_ARRAY":
            return {
                ...state,
                cards: action.cards,
                lucky_number: action.lucky_number
            };

        case "OPEN_CARD":
            return {
                ...state,
                cards: action.cards,
                current_card_index: action.current_card_index
            }

        case "CLOSE_CARD":
                return {
                    ...state,
                    cards: action.cards,
                    current_card_index: action.current_card_index
                }

        case "CHANGE_TURN":
            return {
                ...state,
                turn_player: action.turn_player
            }

        case "STOP_GAME":
            return {
                cards: [],
                lucky_number: '',
                current_card_index: '',
                turn_player: true
            }
            
        default:
            return state;
    }
};