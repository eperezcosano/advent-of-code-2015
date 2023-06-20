/*
*   --- Day 5: Doesn't He Have Intern-Elves For This? ---
*                     --- Part One ---
*                   Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day05.txt')
})

let sum = 0

function isNice(string) {
    return string.match(/[aeiou]/gi)?.length >= 3 && /(\w)\1/.test(string) && !/(ab|cd|pq|xy)/.test(string)
}

lineReader.on('line', (line) => {
    isNice(line) ? sum++ : null
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 238
})
