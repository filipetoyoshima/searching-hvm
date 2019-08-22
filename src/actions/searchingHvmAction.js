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

export const open_card = (index, cards) => {

}