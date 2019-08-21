export const setArray = (array) => {
    let random_index = Math.floor(Math.random() * array.length);
    return {
        type: "SET_ARRAY", 
        numbers: array,
        lucky_number: array[random_index]
    }
}