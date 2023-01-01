// Note: the file path is from the root directory
const filePath = './data/data-09.txt';
// const filePath = './data/data-09-test.txt';
import { processLineByLine } from './helpers.js';

// Day 9 Part 1
export const findTailPositions = () => {
    processLineByLine(filePath)
    .then(lines => {
        let tailPositions = new Set();
        let head = [0, 0];
        let tail = [0, 0];

        const recordTail = (x, y) => {
            const position = `${x}:${y}`;
            if (!tailPositions.has(position)) {
                tailPositions.add(position);
            }
        }

        const left = () => {
            const headX = head[0];
            const headY = head[1];
            const tailX = tail[0];
            const tailY = tail[1];

            const xDiff = headX - tailX;
            const yDiff = headY - tailY;
            // 0 = same spot
            // 1 = head one spot up/right from tail
            // -1 = tail one spot down/left from tail
            // > 1 = head farther away up/right
            // < -1 = tail farther away down/left

            if ((xDiff === 0 || xDiff === 1) &&
                (yDiff >= -1 && yDiff <= 1)) {
                // head above/below/equal, within 0-1 space to the right
                head[0] = headX - 1; // tail doesn't move
            } else if (xDiff === 0 && yDiff === 0) {
                // head and tail in same space
                head[0] = headX - 1; // tail doesn't move
            } else if (xDiff === 1 && yDiff === 0) {
                // head right of tail in same row
                head[0] = headX - 1; // tail doesn't move
            } else if (xDiff === -1) {
                // head left of tail 1 space
                if (yDiff === 1) {
                    // head above
                    tail[0] = tailX - 1;
                    tail[1] = tailY + 1;
                    head[0] = headX - 1;
                } else if (yDiff === -1) {
                    // head below
                    tail[0] = tailX - 1;
                    tail[1] = tailY - 1;
                    head[0] = headX - 1;
                } else if (yDiff === 0) {
                     // head equal
                     tail[0] = tailX - 1;
                     head[0] = headX - 1;
                }
            } else {
                tail[0] = tailX - 1;
                head[0] = headX - 1;
            }

            recordTail(tail[0], tail[1]);
        }

        const right = () => {
            const headX = head[0];
            const headY = head[1];
            const tailX = tail[0];
            const tailY = tail[1];

            const xDiff = headX - tailX;
            const yDiff = headY - tailY;
            // 0 = same spot
            // 1 = head one spot up/right from tail
            // -1 = tail one spot down/left from tail
            // > 1 = head farther away up/right
            // < -1 = tail farther away down/left

            if ((xDiff === 0 || xDiff === -1) &&
                (yDiff >= -1 && yDiff <= 1)) {
                // head above/below/equal, within 0-1 space to the left
                head[0] = headX + 1; // tail doesn't move
            } else if (xDiff === 0 && yDiff === 0) {
                // head and tail in same space
                head[0] = headX + 1; // tail doesn't move
            } else if (xDiff === -1 && yDiff === 0) {
                // head left of tail in same row
                head[0] = headX + 1; // tail doesn't move
            } else if (xDiff === 1) {
                // head right of tail 1 space
                if (yDiff === 1) {
                    // head above
                    tail[0] = tailX + 1;
                    tail[1] = tailY + 1;
                    head[0] = headX + 1;
                } else if (yDiff === -1) {
                    // head below
                    tail[0] = tailX + 1;
                    tail[1] = tailY - 1;
                    head[0] = headX + 1;
                } else if (yDiff === 0) {
                     // head equal
                     tail[0] = tailX + 1;
                     head[0] = headX + 1;
                }
            } else {
                tail[0] = tailX + 1;
                head[0] = headX + 1;
            }

            recordTail(tail[0], tail[1]);
        }

        const up = () => {
            const headX = head[0];
            const headY = head[1];
            const tailX = tail[0];
            const tailY = tail[1];

            const xDiff = headX - tailX;
            const yDiff = headY - tailY;
            // 0 = same spot
            // 1 = head one spot up/right from tail
            // -1 = tail one spot down/left from tail
            // > 1 = head farther away up/right
            // < -1 = tail farther away down/left

            if ((yDiff === 0 || yDiff === -1) &&
                (xDiff >= -1 && xDiff <= 1)) {
                // head left/right/equal, within 0-1 space below
                head[1] = headY + 1; // tail doesn't move
            } else if (xDiff === 0 && yDiff === 0) {
                // head and tail in same space
                head[1] = headY + 1; // tail doesn't move
            } else if (yDiff === -1 && xDiff === 0) {
                // head below tail in same column
                head[1] = headY + 1; // tail doesn't move
            } else if (yDiff === 1) {
                // head above tail 1 space
                if (xDiff === 1) {
                    // head right
                    tail[0] = tailX + 1;
                    tail[1] = tailY + 1;
                    head[1] = headY + 1;
                } else if (xDiff === -1) {
                    // head left
                    tail[0] = tailX - 1;
                    tail[1] = tailY + 1;
                    head[1] = headY + 1;
                } else if (xDiff === 0) {
                     // head equal
                     tail[1] = tailY + 1;
                     head[1] = headY + 1;
                }
            } else {
                tail[1] = tailY + 1;
                head[1] = headY + 1;
            }

            recordTail(tail[0], tail[1]);
        }

        const down = () => {
            const headX = head[0];
            const headY = head[1];
            const tailX = tail[0];
            const tailY = tail[1];

            const xDiff = headX - tailX;
            const yDiff = headY - tailY;
            // 0 = same spot
            // 1 = head one spot up/right from tail
            // -1 = tail one spot down/left from tail
            // > 1 = head farther away up/right
            // < -1 = tail farther away down/left

            if ((yDiff === 0 || yDiff === 1) &&
                (xDiff >= -1 && xDiff <= 1)) {
                // head left/right/equal, within 0-1 space above
                head[1] = headY - 1; // tail doesn't move
            } else if (xDiff === 0 && yDiff === 0) {
                // head and tail in same space
                head[1] = headY - 1; // tail doesn't move
            } else if (yDiff === 1 && xDiff === 0) {
                // head above tail in same column
                head[1] = headY - 1; // tail doesn't move
            } else if (yDiff === -1) {
                // head below tail 1 space
                if (xDiff === 1) {
                    // head right
                    tail[0] = tailX + 1;
                    tail[1] = tailY - 1;
                    head[1] = headY - 1;
                } else if (xDiff === -1) {
                    // head left
                    tail[0] = tailX - 1;
                    tail[1] = tailY - 1;
                    head[1] = headY - 1;
                } else if (xDiff === 0) {
                     // head equal
                     tail[1] = tailY - 1;
                     head[1] = headY - 1;
                }
            } else {
                tail[1] = tailY - 1;
                head[1] = headY - 1;
            }

            recordTail(tail[0], tail[1]);
        }

        lines.forEach(line => {
            const [direction, moves] = line.split(' ');

            for (let i = 0; i < moves; i++) {
                switch (direction) {
                    case 'L':
                        left();
                        break;
                    case 'R':
                        right();
                        break;
                    case 'U': 
                        up();
                        break;
                    case 'D':
                        down();
                        break;
                }
            }
        });

        console.log(tailPositions.size);
    });
}

export const findNinthTail = () => {
    processLineByLine(filePath)
    .then(lines => {
        let tailPositions = new Set();
        let knots = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
                     [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

        const recordTail = (x, y) => {
            const position = `${x}:${y}`;
            if (!tailPositions.has(position)) {
                tailPositions.add(position);
            }
        }

        const moveInnerKnot = (knot, xDiff, yDiff, direction) => {
            const tailX = knots[knot][0];
            const tailY = knots[knot][1];
        
            if (xDiff === 2) {
                knots[knot][0] = tailX + 1;
                switch (yDiff) {
                    case 2: // diagonal movement
                        knots[knot][1] = tailY + 1; 
                        break;
                    case 1:
                        knots[knot][1] = tailY + 1;
                        break;
                    case -1:
                        knots[knot][1] = tailY - 1;
                        break;
                    case -2:
                        knots[knot][1] = tailY - 1; 
                        break;
                }
            } else if (xDiff === -2) {
                knots[knot][0] = tailX - 1;
                switch (yDiff) {
                    case 2: // diagonal movement
                        knots[knot][1] = tailY + 1; 
                        break;
                    case 1:
                        knots[knot][1] = tailY + 1;
                        break;
                    case -1:
                        knots[knot][1] = tailY - 1;
                        break;
                    case -2:
                        knots[knot][1] = tailY - 1; 
                        break;
                }
            } else if (yDiff === 2) {
                switch (xDiff) {
                    case 1:
                        knots[knot][0] = tailX + 1;
                        knots[knot][1] = tailY + 1;
                        break;
                    case 0:
                        knots[knot][1] = tailY + 1;
                        break;
                    case -1:
                        knots[knot][0] = tailX - 1;
                        knots[knot][1] = tailY + 1;
                        break;
                }
            } else if (yDiff === -2) {
                switch (xDiff) {
                    case 1:
                        knots[knot][0] = tailX + 1;
                        knots[knot][1] = tailY - 1;
                        break;
                    case 0:
                        knots[knot][1] = tailY - 1;
                        break;
                    case -1:
                        knots[knot][0] = tailX - 1;
                        knots[knot][1] = tailY - 1;
                        break;
                }
            }
        }

        lines.forEach(line => {
            const [direction, moves] = line.split(' ');

            for (let i = 0; i < moves; i++) {
                // move head
                const headX = knots[0][0];
                const headY = knots[0][1];

                switch (direction) {
                    case 'L':
                        knots[0][0] = headX - 1;
                        break;
                    case 'R':
                        knots[0][0] = headX + 1;
                        break;
                    case 'U': 
                        knots[0][1] = headY + 1;
                        break;
                    case 'D':
                        knots[0][1] = headY - 1;
                        break;
                }
                
                // move the rest of the knots
                for (let j = 0; j < 9; j++) {
                    const headX = knots[j][0];
                    const headY = knots[j][1];
                    const tailX = knots[j + 1][0];
                    const tailY = knots[j + 1][1];

                    const xDiff = headX - tailX;
                    const yDiff = headY - tailY;

                    moveInnerKnot(j + 1, xDiff, yDiff, direction);
                }
                recordTail(knots[9][0], knots[9][1]);
            }
        });

        console.log(tailPositions.size);
    });
}
