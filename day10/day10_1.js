
/*
*   --- Day 10: Elves Look, Elves Say ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10.txt')
})

let input

function lookAndSay(input) {
    let res = ""
    let count = 1
    for(let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++
        } else {
            res += count + input[i]
            count = 1
        }
    }
    return res
}

lineReader.on('line', (line) => {
    input = line
})

lineReader.on('close', () => {
    for(let i = 0; i < 40; i++) {
        input = lookAndSay(input)
    }
    console.log('Result:', input.length)
    // Result: 252594
})
