import { getAlignment } from './alignment';

const temp = () => {
        const base = [1, 2, 3];
        const target = [1, 3];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        process.stdout.write('Alignment:\n');
        for (const elem of actualAlignment) {
            process.stdout.write(`\t[${elem[0]}, ${elem[1]}]\n`);
        }
};
temp();
