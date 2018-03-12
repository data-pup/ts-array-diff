import { groupType } from './groupTypes';

export class NoOpGroup<T> {

    private static validateItems<T>(items:T[]) : void {
        if (items === undefined || items === null || items.length === 0) {
                throw new Error(NoOpGroup.noOpGroupConstructorGivenNoArguments);
        }
    }

    public static readonly noOpGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:groupType;
    public readonly items:T[];

    constructor(items:T[]) {
        this.items = items;
        this.type = 'noop';
        NoOpGroup.validateItems(items);
    }
}
