// Note: the file path is from the root directory
const filePath = './data/data-03.txt';
import { processLineByLine } from './helpers.js';

const generatePriorities = () => {
    const priorities = [];

    for (let i = 97; i < 123; i++) {
        priorities.push(String.fromCharCode(i));
    }
    for (let i = 65; i < 91; i++) {
        priorities.push(String.fromCharCode(i));
    }

    return priorities;
}

// Day 3 Part 1
export const findPrioritySum = () => {
    let score = 0;
    const priorities = generatePriorities();

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            const halfway = line.length / 2;
            const firstCompartment = new Set();

            for (let i in line) {
                const char = line.charAt(i);

                if (i < halfway) {
                    if (!firstCompartment.has(char)) {
                        firstCompartment.add(char);
                    }
                } else {
                    if (firstCompartment.has(char)) {
                        score += priorities.indexOf(char) + 1;
                        return;
                    }
                }
            }
            console.log(firstCompartment);
        });

        console.log(score);
    });
}

// Day 3 Part 2
export const findBadgePrioritySum = () => {
    let score = 0;
    const priorities = generatePriorities();

    processLineByLine(filePath)
    .then(lines => {
        let triplet = 0;
        let firstSet = new Set();
        let secondSet = new Set();

        lines.forEach(line => {
            if (triplet === 0) {
                for (let i in line) {
                    const char = line.charAt(i);

                    if (!firstSet.has(char)) {
                        firstSet.add(char);
                    }
                }
                triplet++;
            } else if (triplet === 1) {
                for (let i in line) {
                    const char = line.charAt(i);

                    if (firstSet.has(char) && !secondSet.has(char)) {
                        secondSet.add(char);
                    }
                }
                triplet++;
            } else {
                for (let i in line) {
                    const char = line.charAt(i);

                    if (secondSet.has(char)) {
                        score += priorities.indexOf(char) + 1;

                        // reset counts
                        triplet = 0;
                        firstSet.clear();
                        secondSet.clear();
                        return;
                    }
                }
            }
        });

        console.log(score);
    });
}
