/*
*   --- Day 16: Aunt Sue ---
*       --- Part Two ---
*     Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt')
})

const tape = {
    children: val => val == 3,
    cats: val => val > 7,
    samoyeds: val => val == 2,
    pomeranians: val => val < 3,
    akitas: val => val == 0,
    vizslas: val => val == 0,
    goldfish: val => val < 5,
    trees: val => val > 3,
    cars: val => val == 2,
    perfumes: val => val == 1
}

lineReader.on('line', (line) => {
    const [, sue, firstName, firstValue, secondName, secondValue, thirdName, thirdValue] = line.split(' ').map((val, i) => i % 2 == 0 ? val.replace(/[:,]/, '') : parseInt(val.replace(/[:,]/, '')))
    if (tape[firstName](firstValue) && tape[secondName](secondValue) && tape[thirdName](thirdValue)) {
        console.log('Result:', sue)
        // Result: 241
        process.exit(0)
    }
})
