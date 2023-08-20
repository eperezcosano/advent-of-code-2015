
/*
*   --- Day 10: Elves Look, Elves Say ---
*             --- Part One ---
*            Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10.txt')
})

let input

function lookAndSay(input) {
    const numberStr = input.toString()
    let res = ""
    for(let i = 0; i < numberStr.length; i++) {
        const digit = numberStr[i]
        for(let j = i, count = 0; j < numberStr.length; j++) {
            if (digit === numberStr[j]) {
                count++
                if (j === numberStr.length - 1) {
                    return res.concat(count.toString().concat(digit))
                }
            }
            else {
                res += count.toString().concat(digit)
                i = j - 1
                break
            }
        }
    }
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
