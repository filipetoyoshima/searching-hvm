const searchWithSentinel = (array, number) => {
    let new_array = [...array];
    new_array.push({ number: number, open: false });
    let n = new_array.length;
    let i = 0;

    for (i = 0; number !== new_array[i].number; i++);
    if (i < n) return i;
    else return (-1);
}


export default searchWithSentinel;