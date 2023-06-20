/*
*   --- Day 5: Doesn't He Have Intern-Elves For This? ---
*                     --- Part Two ---
*                   Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05.txt')
})

let sum = 0

function isNice(string) {
    return /(\w{2}).*?\1/.test(string) && /(\w)\w\1/g.test(string)
}

lineReader.on('line', (line) => {
    isNice(line) ? sum++ : null
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 69
})
