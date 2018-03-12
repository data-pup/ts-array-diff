import { groupType } from './groupTypes';

export class NoOpGroup<T> {

    public static readonly noOpGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:groupType;
    public readonly items:T[];

    constructor(items:T[]) {
        // NoOpGroup.validateItems(items);
        this.items = items;
        this.type = 'noop';
    }
}
