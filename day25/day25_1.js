/*
*   --- Day 25: Let It Snow ---
*       Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day25.txt')
})

let [row, col] = []

function getCode(row, col) {
    let num = 20151125
    for (let max = 2; max <= 1e10; max++) {
        for (let [y, x] = [1, max]; y <= max; [y++, x--]) {
            num = (num * 252533) % 33554393
            if (col === y && row === x) return num
        }
    }
}

lineReader.on('line', line => {
    [row, col] = line.split(' ').map(c => parseInt(c)).filter(c => !isNaN(c))
})

lineReader.on('close', () => {
    const res = getCode(row, col)
    console.log('Result:', res)
    // Result: 2650453
})
