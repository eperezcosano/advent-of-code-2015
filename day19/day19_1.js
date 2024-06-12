/*
*   --- Day 19: Medicine for Rudolph ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

const replacements = []
const molecules = new Set()
let molecule

let lineBreak = false
lineReader.on('line', line => {
    if (line.length === 0) {
        lineBreak = true
        return
    }
    if (lineBreak) molecule = line
    else replacements.push(line.split(' => '))
})

lineReader.on('close', () => {
    for (const [from, to] of replacements) {
        for (let i = 0; i < molecule.length; i++) {
            i = molecule.indexOf(from, i)
            if (i < 0) break
            molecules.add(molecule.substring(0, i) + to + molecule.substring(i + from.length))
        }
    }
    console.log('Result:', molecules.size)
    // Result: 535
})

