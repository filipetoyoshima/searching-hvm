
export const setArray = (number_of_cells=0, array=undefined) => {
    // generate a random number and set them and array in store

    console.log(array, "before if")

    if (array === undefined) {
        let i;
        let r = Math.floor(Math.random() * 30 + 1);
        array = [r];

        for (i = 1; i < number_of_cells; i++) {
            r = Math.floor(Math.random() * 30 + 1);
            array.push(array[i - 1] + r);
        }
    }

    console.log(array, "after if")

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
        lucky_number: array[random_index],
    }
}

export const openCard = (index, cards, lucky_number) => {
    let new_cards = cards;
    console.log(cards, "input");
    console.log(new_cards, "variable");
    new_cards[index].open = true;

    if (lucky_number === new_cards[index].number) {
        return {
            type: "WIN_GAME",
            win_game: true
        }

    } else {

        return {
            type: "OPEN_CARD",
            cards: new_cards,
            current_card_index: index
        }

    }
}

export const closeCard = (index, cards) => {
    let new_cards = cards;

    if (index) {
        new_cards[index].open = false;
    } else if (new_cards[0].open) {
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


export const stopGame = () => {
    return { type: "STOP_GAME" }
}

export const openedCard = (index) => {
    return {
        type: "OPENED_CARD",
        opened_card: index,
    }
}

export const nextPlay = (n) => {
    return {
        type: "NEXT_PLAY",
        next_play: n
    }
}

export const indexLucky = (i) => {
    return {
        type: "INDEX_LUCKY",
        index_lucky: i
    }
}