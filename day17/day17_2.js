/*
*   --- Day 17: No Such Thing as Too Much ---
*                --- Part Two ---
*              Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day17.txt')
})

const liters = 150
const boxes = []

lineReader.on('line', line => boxes.push(parseInt(line)))

lineReader.on('close', () => {
    const leading = new Array(boxes.length).fill(0).join('')
    const res = new Array(boxes.length).fill(0)
    for (let i = 0; i < 2 ** boxes.length; i++) {
        const sel = (leading + i.toString(2)).slice(-boxes.length).split('').map(Number)
        const amount = sel.map((val, i) => val * boxes[i]).reduce((acc, val) => acc + val, 0)
        if (amount === liters) res[sel.filter(val => val).length - 1]++
    }
    console.log('Result:', res.filter(val => val).shift())
    // Result: 4
})
