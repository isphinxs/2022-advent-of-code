// Note: the file path is from the root directory
const filePath = './data/data-10.txt';
// const filePath = './data/data-10-test.txt';
import { processLineByLine } from './helpers.js';

// Day 10 Part 1
export const findSignalStrengths = () => {
    processLineByLine(filePath)
    .then(lines => {
        let x = 1;
        let cycle = 0;
        let sum = 0;

        const checkSignal = () => {
            const valuesToCheck = [20, 60, 100, 140, 180, 220];

            if (valuesToCheck.includes(cycle)) {
                sum += (x * cycle);
            }
        }

        lines.forEach(line => {
            let [operation, value] = line.split(' ');
            value = parseInt(value, 10); 

            // record signal if we reach a checkpoint
            cycle++;
            checkSignal();
            
            if (operation === 'addx') {
                // increment and check again
                cycle++;
                checkSignal();
                // then add the value
                x += value;
            }
        });

        console.log(sum);
    });
}

// Day 10 Part 2
export const renderImage = () => {
    processLineByLine(filePath)
    .then(lines => {
        let x = 1;
        let rowPosition = 0;
        const rows = ['', '', '', '', '', ''];
        let row = '';

        const checkPosition = () => {
            if (rowPosition === x || rowPosition === x - 1 || rowPosition === x + 1) {
                row += '#';
            } else {
                row += '.';
            }

            if (rowPosition < 39) {
                rowPosition++;
            } else {
                console.log(row);
                row = '';
                rowPosition = 0;
            }

        }

        lines.forEach(line => {
            let [operation, value] = line.split(' ');
            value = parseInt(value, 10); 
            checkPosition();
            
            if (operation === 'addx') {
                checkPosition();
                x += value;
            }
        });
    });
}