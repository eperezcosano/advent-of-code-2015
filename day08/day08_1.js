/*
*   --- Day 8: Matchsticks ---
*        --- Part One ---
*      Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

let code = 0
let char = 0

function count(string) {
    let i = 0
    let count = 0
    let char
    while (char = string[i++]) {
        if (char === '"') continue
        if (char === '\\') {
            if (string[i] === 'x') i += 2
            i++
        }
        count++
    }
    return count
}

lineReader.on('line', (line) => {
    code += line.length
    char += count(line)
})

lineReader.on('close', () => {
    console.log('Result:', code - char)
    // Result: 1371
})

