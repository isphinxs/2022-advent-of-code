// Note: the file path is from the root directory
const filePath = './data/data-08.txt';
// const filePath = './data/data-08-test.txt';
import { processLineByLine } from './helpers.js';

// Day 8 Part 1
export const findVisibleTrees = () => {
    processLineByLine(filePath)
    .then(lines => {
        let sum = 0;
        const visibleTrees = new Set();

        const gridHeight = lines.length;
        const topTreesToBeat = lines[0].split('').map(tree => parseInt(tree, 10));
        const bottomTreesToBeat = lines[gridHeight - 1].split('').map(tree => parseInt(tree, 10));
        const rowLength = topTreesToBeat.length;

        const checkIfTreeVisible = (row, tree) => {
            if (!visibleTrees.has(`${row}:${tree}`)) {
                visibleTrees.add(`${row}:${tree}`);
            }
        }

        const fromLeft = (line, rowNumber) => {
            if (line === undefined) {
                return
            }

            const leftTree = line[0];
            let leftHeightToBeat = parseInt(leftTree, 10);

            // start on the second tree and move through the penultimate tree
            for (let i = 1; i < line.length - 1; i++) {
                const treeHeight = parseInt(line[i], 10);

                if (treeHeight > leftHeightToBeat) {
                    checkIfTreeVisible(rowNumber, i);
                    leftHeightToBeat = treeHeight;
                } 
            };
        }

        const fromRight = (line, rowNumber) => {
            if (line === undefined) {
                return;
            }

            let rightHeightToBeat = parseInt(line[line.length - 1], 10);

            for (let i = line.length - 2; i > 0; i--) {
                const treeHeight = parseInt(line[i], 10);

                if (treeHeight > rightHeightToBeat) {
                    checkIfTreeVisible(rowNumber, i);
                    rightHeightToBeat = treeHeight;
                } 
            }
        }

        const fromTop = (lines, colNumber) => {
            for (let i = 1; i < gridHeight - 1; i++) {
                const line = lines[i];
                
                if (line === undefined) {
                    return;
                }
                
                const treeHeight = parseInt(line[colNumber], 10);

                if (treeHeight > topTreesToBeat[colNumber]) {
                    checkIfTreeVisible(i, colNumber);
                    topTreesToBeat[colNumber] = treeHeight;
                }
            }; 
        }

        const fromBottom = (lines, colNumber) => {
            for (let i = gridHeight - 2; i >= 1; i--) {
                const line = lines[i];
                console.log(line);
                
                if (line === undefined) {
                    return;
                }

                const treeHeight = parseInt(line[colNumber], 10);

                if (treeHeight > bottomTreesToBeat[colNumber]) {
                    checkIfTreeVisible(i, colNumber);
                    bottomTreesToBeat[colNumber] = treeHeight;
                }
                console.log(treeHeight, bottomTreesToBeat[colNumber]);
            }
        }

        // check each row
        for (let i = 1; i < gridHeight - 1; i++) {
            const line = lines[i];

            fromLeft(line, i);
            fromRight(line, i);
        }
        
        // check each column
        for (let i = 1; i < rowLength - 1; i++) {
            fromTop(lines, i);
            fromBottom(lines, i);
        }

        // add visible interior trees
        const visibleTreeSum = visibleTrees.size;
        sum += visibleTrees.size;

        // add trees on the edge
        sum += (rowLength * 2);
        sum += (gridHeight * 2 - 4); // remove duplicates

        console.log(sum);
    });
}

// Day 8 Part 2
export const findScenicTree = () => {
    processLineByLine(filePath)
    .then(lines => {
        let highestScenicValue = 0;

        const lookLeft = (currentTree, line, colNumber) => {
            let sum = 0;

            for (let i = colNumber - 1; i >= 0; i--) {
                const nextTree = line[i];
                if (nextTree < currentTree) {
                    sum++;
                } else {
                    sum++;
                    break;
                }
            }

            return sum;
        }

        const lookRight = (currentTree, line, colNumber) => {
            let sum = 0;

            for (let i = colNumber + 1; i < line.length; i++) {
                const nextTree = line[i];
                if (nextTree < currentTree) {
                    sum++;
                } else {
                    sum++;
                    break;
                }
            }

            return sum;
        }

        const lookUp = (currentTree, rowNumber, colNumber) => {
            let sum = 0;

            for (let i = rowNumber - 1; i >= 0; i--) {
                const nextTree = lines[i][colNumber];
                if (nextTree < currentTree) {
                    sum++;
                } else {
                    sum++;
                    break;
                }
            }

            return sum;
        }

        const lookDown = (currentTree, rowNumber, colNumber) => {
            let sum = 0;

            for (let i = rowNumber + 1; i < lines.length; i++) {
                const nextTree = lines[i][colNumber];
                if (nextTree < currentTree) {
                    sum++;
                } else {
                    sum++;
                    break;
                }
            }

            return sum;
        }

        lines.forEach((line, rowNumber) => {
            console.log(line);
            let left, right, up, down;

            for (let colNumber = 0; colNumber < line.length; colNumber++) {
                const tree = line[colNumber];
                left = lookLeft(tree, line, colNumber);
                right = lookRight(tree, line, colNumber);
                up = lookUp(tree, rowNumber, colNumber);
                down = lookDown(tree, rowNumber, colNumber);

                const scenicValue = left * right * up  * down;
                console.log(scenicValue);
                highestScenicValue = Math.max(highestScenicValue, scenicValue);
            }

        });

        console.log(highestScenicValue);
    });
}