/*
*   --- Day 2: I Was Told There Would Be No Math ---
*                  --- Part One ---
*                Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let sum = 0

lineReader.on('line', (line) => {
    const box = line.split('x').map(item => parseInt(item))
    const surface = 2 * (box[0] * box[1] + box[1] * box[2] + box[2] * box[0])
    box.sort((a, b) => a - b)
    const slack = box[0] * box[1]
    sum += surface + slack
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 1606483
})
