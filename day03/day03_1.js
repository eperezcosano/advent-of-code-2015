/*
*   --- Day 3: Perfectly Spherical Houses in a Vacuum ---
*                       --- Part One ---
*                     Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day03.txt')
})

const grid = new Set()
let steps

lineReader.on('line', (line) => {
    steps = line.split('')
})

lineReader.on('close', () => {
    let y = 0
    let x = 0
    grid.add(`${x}-${y}`)
    steps.forEach(step => {
        if (step === '>') x++
        else if (step === '<') x--
        else if (step === '^') y--
        else if (step === 'v') y++
        grid.add(`${x}-${y}`)
    })
    console.log('Total:', grid.size)
    // Total: 2572
})
