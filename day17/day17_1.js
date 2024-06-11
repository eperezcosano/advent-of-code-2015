/*
*   --- Day 17: No Such Thing as Too Much ---
*                --- Part One ---
*              Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day17.txt')
})

const liters = 150
const boxes = []

lineReader.on('line', line => boxes.push(parseInt(line)))

lineReader.on('close', () => {
    const leading = new Array(boxes.length).fill(0).join('')
    const res = new Array(2 ** boxes.length)
        .fill(0)
        .reduce((acc, _, n) => (leading + n.toString(2))
            .slice(-boxes.length)
            .split('')
            .map(Number)
            .map((val, i) => val * boxes[i])
            .reduce((acc, val) => acc + val, 0) === liters ? ++acc : acc, 0
        )
    console.log('Result:', res)
    // Result: 4372
})
