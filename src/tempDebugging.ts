import { getAlignment } from './alignment/getAlignment';

const temp = () => {
        const base = [1, 2, 3, 4];
        const target = [1, 2, 4];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        process.stdout.write('Alignment:\n');
        for (const elem of actualAlignment) {
            process.stdout.write(`\t[${elem[0]}, ${elem[1]}]\n`);
        }
};
temp();