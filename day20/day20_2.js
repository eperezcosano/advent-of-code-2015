/*
*   --- Day 20: Infinite Elves and Infinite Houses ---
*                     --- Part Two ---
*                   Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day20.txt')
})

let input

function getFactors(num) {
    const isEven = num % 2 === 0
    const max = Math.sqrt(num)
    const inc = isEven ? 1 : 2
    const factors = [1, num]

    for (let factor = isEven ? 2 : 3; factor <= max; factor += inc) {
        if (num % factor !== 0) continue
        factors.push(factor)
        const compliment = num / factor
        if (compliment !== factor) factors.push(compliment)
    }
    return factors
}

function getHouse() {
    for (let num = 1; ; num++) {
        const factors = getFactors(num)
        const sum = factors.reduce((acc, val) => acc + val, 0)
        const sub = factors.filter(val => val < Math.ceil(num / 50)).reduce((acc, val) => acc + val, 0)
        if ((sum - sub) >= input) return num
    }
}

lineReader.on('line', line => input = parseInt(line) / 11)

lineReader.on('close', () => {
    const res = getHouse()
    console.log('Result:', res)
    // Result: 884520
})
