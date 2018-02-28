export const getIndicesInRange = (min:number, max:number) : number[] => {
    if (min < 0 || max < 0 || min > max) {
        throw new Error('getIndicesInRange given invalid parameters.');
    }
    const arrSize = max - min;
    const arr = [...Array(arrSize)].map((_, i) => min + i);
    return arr;
};
