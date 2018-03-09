export const checkBounds = <T>(pos:number, arr:T[]) => {
    return (pos != undefined) && (pos >= 0) && (pos < arr.length);
};
