/*
*   --- Day 3: Perfectly Spherical Houses in a Vacuum ---
*                       --- Part Two ---
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
    let y1 = 0
    let x1 = 0
    let y2 = 0
    let x2 = 0
    grid.add(`${x1}-${y1}`)
    steps.forEach((step, i) => {
        if (step === '>') i % 2 === 0 ? x1++ : x2++
        else if (step === '<') i % 2 === 0 ? x1-- : x2--
        else if (step === '^') i % 2 === 0 ? y1-- : y2--
        else if (step === 'v') i % 2 === 0 ? y1++ : y2++
        grid.add(`${x1}-${y1}`)
        grid.add(`${x2}-${y2}`)
    })
    console.log('Total:', grid.size)
    // Total: 2631
})
