export default (state, action) => {
    switch (action.type) {

        case "SET_ARRAY":
            return {
                ...state,
                cards: action.cards,
                lucky_number: action.lucky_number,
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

        case "OPENED_CARD":
            // don't repeat number in array of opened cards
            if (!state.opened_cards.includes(action.opened_card)) {
                return {
                    ...state,
                    opened_cards: [...state.opened_cards, action.opened_card]
                }
            } else {
                return {
                    ...state,
                    opened_cards: state.opened_cards
                }
            }

        case "WIN_GAME":
            return {
                ...state,
                win_game: action.win_game
            }

        case "NEXT_PLAY":
            return {
                ...state,
                next_play: action.next_play
            }

        case "INDEX_LUCKY":
            return {
                ...state,
                index_lucky: action.index_lucky
            }

        default:
            return state;
    }
};