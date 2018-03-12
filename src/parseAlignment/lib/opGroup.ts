import { groupType } from './groupTypes';

export class OpGroup<T> {

    private static validateItems<T>(addItems:T[], removeItems:T[]) : void {
        throw new Error('Not Implemented Yet!');
    }

    public static readonly opGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:groupType;
    public readonly addItems?:T[];
    public readonly removeItems?:T[];

    constructor(add?:T[], remove?:T[]) {
        this.addItems = add;
        this.removeItems = remove;
        this.type = 'edit';
    }
}

// Define a string for the error message to be thrown when no
// arguments are given to an opGroup or noOpGroup object's constructor.
export const opGroupConstructorGivenNoArguments:string =
    'editGroup constructor was given no arguments.';
