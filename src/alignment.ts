export const findLargestLength = <T>(base:T[], target:T[]) : number => {
    const baseLength = base ? base.length : 0;
    const targetLength = target ? target.length : 0;
    const maxLength = (baseLength > targetLength) ? baseLength : targetLength;
    return maxLength;
};
