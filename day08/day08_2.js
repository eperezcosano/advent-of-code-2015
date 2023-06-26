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
    let count = 0
    for (let i = 1; i < string.length - 1; i++) {
        if (['\\', '"'].includes(string[i])) count++
        count++
    }
    return count + 6
}

lineReader.on('line', (line) => {
    original += line.length
    encoded += count(line)
})

lineReader.on('close', () => {
    console.log('Result:', encoded - original)
    // Total: 
})

