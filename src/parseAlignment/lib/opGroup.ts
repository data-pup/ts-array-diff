import { groupType } from './groupTypes';

export class OpGroup<T> {

    public static readonly opGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:groupType;
    public readonly addItems?:T[];
    public readonly removeItems?:T[];

    constructor(add?:T[], remove?:T[]) {
        // OpGroup.validateItems(..)
        this.addItems = add;
        this.removeItems = remove;
        this.type = 'edit';
    }
}
