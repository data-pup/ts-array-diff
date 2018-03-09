import { AlignmentPosition } from './getAlignment/alignmentPosition';
const temp = () => {
    const arrs:[number[], number[]] = [
        [   2],
        [1, 2],
    ];
    const startPos = new AlignmentPosition(arrs);
    const actualAlignment = startPos.getAlignment();
    process.stdout.write('Alignment:\n');
    for (const elem of actualAlignment) {
        process.stdout.write(`\t[${elem[0]}, ${elem[1]}]\n`);
    }
};
temp();
