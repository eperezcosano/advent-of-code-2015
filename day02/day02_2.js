/*
*   --- Day 2: I Was Told There Would Be No Math ---
*                  --- Part Two ---
*                Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day02.txt')
})

let sum = 0

lineReader.on('line', (line) => {
    const box = line.split('x').map(item => parseInt(item)).sort((a, b) => a - b)
    const present = 2 * (box[0] + box[1])
    const bow = box[0] * box[1] * box[2]
    sum += present + bow
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 1606483
})
