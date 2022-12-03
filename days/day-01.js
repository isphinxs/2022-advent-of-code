// Note: the file path is from the root directory
const filePath = './data/data-01.txt';
import { processLineByLine } from './helpers.js';

// Day 1 Part 1
export const findMaxTotal = () => {
    let maxTotal = 0;
    let currentTotal = 0;

    processLineByLine(filePath)
        .then(lines => {
            lines.forEach(line => {
                 if (line === '') {
                    maxTotal = currentTotal > maxTotal ? currentTotal : maxTotal;
                    currentTotal = 0;
                 } else {
                    currentTotal += parseInt(line);
                 }
            });
            console.log(maxTotal);
        });
}

// Day 1 Part 2
export const findTopThreeTotal = () => {
    let maxTotal = [0, 0, 0];
    let currentTotal = 0;

    processLineByLine(filePath)
        .then(lines => {
            lines.forEach(line => {
                 if (line === '') {
                    const A = maxTotal[0];
                    const B = maxTotal[1];

                    if (currentTotal > maxTotal[0]) {
                        maxTotal[0] = currentTotal;
                        maxTotal[1] = A;
                        maxTotal[2] = B;
                    } else if (currentTotal > maxTotal[1]) {
                        maxTotal[1] = currentTotal;
                        maxTotal[2] = B;
                    } else if (currentTotal > maxTotal[2]) {
                        maxTotal[2] = currentTotal;
                    }
                    currentTotal = 0;
                 } else {
                    currentTotal += parseInt(line);
                 }
            });
            const total = maxTotal.reduce((a, b) => a + b);
            console.log(total);
        });
}