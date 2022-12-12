// Note: the file path is from the root directory
const filePath = './data/data-07.txt';
import { processLineByLine } from './helpers.js';

let sum = 0;
const directories = [];
let currentPath = ['.'];
let currentDirectorySize = 0;

class Directory {
    constructor(path, size = 0) {
        this.path = path;
        this.size = size; 
    }
}

class Node {
    constructor(name, size, children = []) {
        this.name = name;
        this.size = size;
        this.children = children;
    }
}

const addDirectory = () => {
    if (currentDirectorySize > 0) {
        const path = currentPath.join('/');
        const size = currentDirectorySize;
        directories.push(new Directory(path, size));
        currentDirectorySize = 0;
    }
}

// Day 7 Part 1
export const sumLargeDirectories = () => {
    processLineByLine(filePath)
    .then(lines => {
        // create tree
        lines.forEach(line => {
            const words = line.split(' ');

            if (words[1] === 'cd' && words[2] === '/') { // $ cd /
                addDirectory();
                currentPath = ['.'];
            } else if (words[1] === 'cd' && words[2] === '..') { // $ cd ..
                addDirectory();
                currentPath.pop();
            } else if (words[1] === 'cd' && words[2] !== '/') { // $ cd <dir>
                addDirectory();
                const directory = words[2];
                currentPath.push(directory);
            } else if (words[0] !== '$' && words[0] !== 'dir') { // <size> <fileName>
                currentDirectorySize += parseInt(words[0], 10);
            }
        });
        addDirectory(); // grabs final file printed

        const root = new Node('root');

        directories.forEach(directory => {
            const dirs = directory.path.split('/');
            const size = directory.size;

            let parent = root; 

            dirs.forEach((dir, index) => {
                if (index === 0) {
                    return;
                }

                const existingNode = parent.children.find(child => child.name === dir);
                
                if (existingNode) {
                    existingNode.size += size;
                    parent = existingNode;
                } else {
                    const newNode = new Node(dir, size);
                    parent.children.push(newNode);
                    parent = newNode;
                }
            });
        });

        const search = node => {
            if (node) {
                node.children.forEach(child => {
                    search(child);
                });

                if (node.size < 100000) {
                    sum += node.size;
                }
            }
        }

        search(root);

        console.log(sum);
    });
}

// Day 7 Part 2
export const findDirectoryToDelete = () => {
    processLineByLine(filePath)
    .then(lines => {
        // create tree
        lines.forEach(line => {
            const words = line.split(' ');

            if (words[1] === 'cd' && words[2] === '/') { // $ cd /
                addDirectory();
                currentPath = ['.'];
            } else if (words[1] === 'cd' && words[2] === '..') { // $ cd ..
                addDirectory();
                currentPath.pop();
            } else if (words[1] === 'cd' && words[2] !== '/') { // $ cd <dir>
                addDirectory();
                const directory = words[2];
                currentPath.push(directory);
            } else if (words[0] !== '$' && words[0] !== 'dir') { // <size> <fileName>
                currentDirectorySize += parseInt(words[0], 10);
            }
        });
        addDirectory(); // grabs final file printed

        const root = new Node('root');

        directories.forEach(directory => {
            const dirs = directory.path.split('/');
            const size = directory.size;

            let parent = root; 

            dirs.forEach((dir, index) => {
                if (index === 0) {
                    return;
                }

                const existingNode = parent.children.find(child => child.name === dir);
                
                if (existingNode) {
                    existingNode.size += size;
                    parent = existingNode;
                } else {
                    const newNode = new Node(dir, size);
                    parent.children.push(newNode);
                    parent = newNode;
                }
            });
        });

        // find the directory larger than and closest to 8381165

        let minMatchingSize = 999999999;

        const search = node => {
            if (node) {
                node.children.forEach(child => {
                    search(child);
                });

                if (node.size >= 8381165 && node.size < minMatchingSize) {
                    minMatchingSize = node.size;
                }
            }
        }

        search(root);

        console.log(minMatchingSize);
    });
}