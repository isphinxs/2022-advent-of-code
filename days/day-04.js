// Note: the file path is from the root directory
const filePath = './data/data-04.txt';
import { processLineByLine } from './helpers.js';

// Day 4 Part 1
export const findFullyContainedPairs = () => {
    let count = 0;

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            const [sectionA, sectionB] = line.split(',');
            const [a1, a2] = sectionA.split('-').map(a => parseInt(a, 10));
            const [b1, b2] = sectionB.split('-').map(b => parseInt(b, 10));

            if (a1 >= b1 && a2 <= b2 ) { // a is inside b
                count++;
            } else if (b1 >= a1 && b2 <= a2) { // b is inside a
                count++;
            }
        });
        console.log(count);
    });
}

// Day 4 Part 2
export const findOverlappingPairs = () => {
    let count = 0;

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            const [sectionA, sectionB] = line.split(',');
            const [a1, a2] = sectionA.split('-').map(a => parseInt(a, 10));
            const [b1, b2] = sectionB.split('-').map(b => parseInt(b, 10));

            if ((a1 > b2 && a2 > b2) || (b1 > a2 && b2 > a2)) { // no overlap
                return;
            } else if ((a2 >= b1) || b2 >= a1) { // partial overlap
                count++;
            } 
        });
        console.log(count);
    });
}