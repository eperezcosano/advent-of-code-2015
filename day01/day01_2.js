/*
*   --- Day 1: Not Quite Lisp ---
*          --- Part Two ---
*        Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day01.txt')
})

lineReader.on('line', (line) => {
    line.split('').reduce((sum, value, i) => {
        const floor = value === '(' ? ++sum : --sum
        if (floor < 0) {
            console.log('Result:', ++i)
            // Result: 1783
            process.exit()
        }
        return floor
    }, 0)
})
