/*
*   --- Day 8: Matchsticks ---
*        --- Part Two ---
*      Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

let encoded = 0
let original = 0

function count(string) {
    let i = 0
    let count = 0
    let char
    while (char = string[i++]) {
        if (char === '"' || char === '\\') count += 2
        count++
    }
    return count
}

lineReader.on('line', (line) => {
    original += line.length
    encoded += count(line)
})

lineReader.on('close', () => {
    console.log('Result:', encoded - original)
    // Total: 1371
})

