// Note: the file path is from the root directory
const filePath = './data/data-06.txt';
import { processLineByLine } from './helpers.js';

// Day 06 Part 1
export const determineStartOfPacket = () => {
    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            let marker = '';

            for (let i = 0; i < line.length; i++) {
                const char0 = line.charAt(i);
                const char1 = line.charAt(i + 1);
                const char2 = line.charAt(i + 2);
                const char3 = line.charAt(i + 3);
                
                if (char0 !== char1 && 
                    char0 !== char2 &&
                    char0 !== char3 &&
                    char1 !== char2 &&
                    char1 !== char3 &&
                    char2 !== char3) {
                        marker = i + 4; 
                        break;
                    }
            }
            console.log(marker);
        });
    });
}

// Day 06 Part 2
export const determineStartOfMessage = () => {
    let count = 0;

    processLineByLine(filePath)
    .then(lines => {
        lines.forEach(line => {
            let count = 0; 
            let marker = 14;

            for (let i = 0; i < line.length; i++) {
                const char = line.charAt(i);
                if (count === 14) {
                    break;
                }
                
                const nextIndex = line.indexOf(char, i + 1);
                
                if (nextIndex > 0 && nextIndex < i + (14 - count)) {
                    marker = i + 15; 
                    count = 0;
                } else {
                    count++;
                };

            }
            console.log(marker);
        });
    });
}