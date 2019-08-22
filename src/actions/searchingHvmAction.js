export const setArray = (array) => {
    let random_index = Math.floor(Math.random() * array.length);
    let new_array = [];
    array.map(number => {
        let obj = {
            "number": number,
            "open": false
        }

        new_array.push(obj);
    });

    return {
        type: "SET_ARRAY", 
        cards: new_array,
        lucky_number: array[random_index]
    }
}

export const openCard = (index, cards) => {
    let new_cards = cards;
    new_cards[index].open = true;
    return {
        type: "OPEN_CARD",
        cards: new_cards,
        current_card_index: index 
    }
}

export const closeCard = (index, cards) => {
    let new_cards = cards;

    if(index){
        new_cards[index].open = false;
    }else {
        new_cards[0].open = false;
    }

    return {
        type: "CLOSE_CARD",
        cards: new_cards,
        current_card_index: '' 
    }
}

export const changeTurn = (turn) => {

    return {
        type: "CHANGE_TURN",
        turn_player: !turn
    }
}