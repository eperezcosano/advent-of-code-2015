/*
*   --- Day 19: Medicine for Rudolph ---
*             --- Part Two ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

let molecule

let lineBreak = false
lineReader.on('line', line => {
    if (line.length === 0) {
        lineBreak = true
        return
    }
    if (lineBreak) molecule = line
})

lineReader.on('close', () => {
    const elements = molecule.match(/[A-Z]/g).length
    const radonArgon = molecule.match(/(Rn|Ar)/g).length
    const yttrium = molecule.match(/Y/g).length
    const res = elements - radonArgon - 2 * yttrium - 1
    console.log('Result:', res)
    // Result: 212
})
