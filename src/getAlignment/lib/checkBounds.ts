export const checkBounds = <T>(pos:number, arr:T[]) : boolean => {
    return (pos !== undefined) && (arr !== undefined)
           && (pos >= 0) && (pos < arr.length);
};
