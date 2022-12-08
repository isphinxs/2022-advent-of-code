// Note: the file path is from the root directory
const filePath = './data/data-05.txt';
import { processLineByLine } from './helpers.js';

// initial crate setup
const crates = {
    1 : ['H', 'C', 'R'],
    2 : ['B', 'J', 'H', 'L', 'S', 'F'],
    3 : ['R', 'M', 'D', 'H', 'J', 'T', 'Q'],
    4 : ['S', 'G', 'R', 'H', 'Z', 'B', 'J'],
    5 : ['R', 'P', 'F', 'Z', 'T', 'D', 'C', 'B'],
    6 : ['T', 'H', 'C', 'G'],
    7 : ['S', 'N', 'V', 'Z', 'B', 'P', 'W', 'L'],
    8 : ['R', 'J', 'Q', 'G', 'C'],
    9 : ['L', 'D', 'T', 'R', 'H', 'P', 'F', 'S']
}

// Day 5 Part 1
export const moveCrates = () => {
    processLineByLine(filePath)
    .then(lines => {
        lines.forEach((line, index) => {
            if (index >= 10) {
                const commands = line.split(' ');
                const amount = parseInt(commands[1], 10);
                const origin = parseInt(commands[3], 10);
                const destination = parseInt(commands[5], 10);
                for (let i = 0; i < amount; i++) {
                    const crate = crates[origin].pop();
                    crates[destination].push(crate);
                }
            }
        });

        let lastCrates = '';
        
        for (let i = 1; i < 10; i++) {
            const crate = crates[i];
            lastCrates += crate[crate.length - 1];
        }
        console.log(lastCrates);
    });
}

// Day 5 Part 2
export const moveCratesRev = () => {
    processLineByLine(filePath)
    .then(lines => {
        lines.forEach((line, index) => {
            if (index >= 10) {
                const commands = line.split(' ');
                const amount = parseInt(commands[1], 10);
                const origin = parseInt(commands[3], 10);
                const destination = parseInt(commands[5], 10);
    
                const originCrate = crates[origin];
                const length = originCrate.length;
                const startingIndex = length - amount;
    
                const cratesToMove = originCrate.splice(startingIndex, amount);
                cratesToMove.forEach(crate => {
                    crates[destination].push(crate);
                });
            }
        });
    
        let lastCrates = '';
        
        for (let i = 1; i < 10; i++) {
            const crate = crates[i];
            lastCrates += crate[crate.length - 1];
        }
        console.log(lastCrates);
    })
}