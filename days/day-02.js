// Note: the file path is from the root directory
const filePath = './data/data-02.txt';
import { processLineByLine } from './helpers.js';

// Day 2 Part 1
export const findScore = () => {
    let score = 0;

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            const [a, x] = line.split(' ');
            
            switch (x) {
                case 'X': // rock
                    score += 1;
                    break;
                case 'Y': // paper
                    score += 2;
                    break;
                case 'Z': // scissors
                    score += 3;
                    break;
            }

            if (a === 'A') { // rock
                if (x === 'Y') { // paper beats rock
                    score += 6;
                } else if (x === 'X') { // tie
                    score += 3;
                }
            } else if (a === 'B') { // paper
                if (x === 'Z') { // scissors beat paper
                    score += 6;
                } else if (x === 'Y') { // tie
                    score += 3;
                }
            } else { // scissors
                if (x === 'X') { // rock beats scissors
                    score += 6;
                } else if (x === 'Z') { // tie
                    score += 3;
                }
            }
        });

        console.log(score);
    });
}

// Day 2 Part 2
export const findScoreRevised = () => {
    let score = 0;
    const scoreByMove = {
        'A': 1,
        'B': 2,
        'C': 3
    };

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            const [a, b] = line.split(' ');

            if (b === 'X') { // lose
                switch (a) {
                    case 'A': // rock
                        score += scoreByMove['C']; // scissors
                        break;
                    case 'B': // paper
                        score += scoreByMove['A']; // rock
                        break;
                    case 'C': // scissors
                        score += scoreByMove['B']; // paper
                        break;
                }
            } else if (b === 'Y') { // draw
                score += 3;
                switch (a) {
                    case 'A': // rock
                        score += scoreByMove['A']; // rock
                        break;
                    case 'B': // paper
                        score += scoreByMove['B']; // paper
                        break;
                    case 'C': // scissors
                        score += scoreByMove['C']; // scissors
                        break;
                }
            } else { // win
                score += 6;
                switch (a) {
                    case 'A': // rock
                        score += scoreByMove['B']; // paper
                        break;
                    case 'B': // paper
                        score += scoreByMove['C']; // scissors
                        break;
                    case 'C': // scissors
                        score += scoreByMove['A']; // rock
                        break;
                }
            }
        });
        
        console.log(score);
    });
}