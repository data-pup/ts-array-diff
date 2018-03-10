import { getAlignment } from './getAlignment/getAlignment';
const temp = () => {
    const base   = [   2];
    const target = [1, 2];
    const actualAlignment = getAlignment(base, target);
    process.stdout.write('Alignment:\n');
    for (const elem of actualAlignment) {
        process.stdout.write(`\t[${elem[0]}, ${elem[1]}]\n`);
    }
};
temp();
