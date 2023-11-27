/*
*   --- Day 16: Aunt Sue ---
*       --- Part One ---
*     Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt')
})

const tape = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

lineReader.on('line', (line) => {
    const [, sue, firstName, firstValue, secondName, secondValue, thirdName, thirdValue] = line.split(' ').map((val, i) => i % 2 == 0 ? val.replace(/[:,]/, '') : parseInt(val.replace(/[:,]/, '')))
    if (tape[firstName] == firstValue && tape[secondName] == secondValue && tape[thirdName] == thirdValue) {
        console.log('Result:', sue)
        // Result: 40
        process.exit(0)
    }
})
