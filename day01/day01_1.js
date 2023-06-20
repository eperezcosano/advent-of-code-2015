/*
*   --- Day 1: Not Quite Lisp ---
*          --- Part One ---
*        Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

lineReader.on('line', (line) => {
    const res = line.split('').reduce((sum, value) => value === '(' ? ++sum : --sum, 0)
    console.log('Result:', res)
    // Result: 232
})
