/*
*   --- Day 7: Some Assembly Required ---
*             --- Part One ---
*           Advent Of Code 2015
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const wires = new Map()

function not(n) {
    return ~n & 0xFFFF
}

function lShift(n, m) {
    return (n << m) & 0xFFFF
}

function rShift(n, m) {
    return (n >> m) & 0xFFFF
}

lineReader.on('line', (line) => {
    const words = line.split(' ')
    wires.set(words.pop(), words.slice(0, -1))
})

function calculate(gate) {
    const stm = wires.get(gate)
    if (!isNaN(stm)) return stm

    if (stm.length === 1 && isNaN(parseInt(stm[0]))) return calculate(stm[0])
    if (stm.length === 2 && stm[0] === 'NOT') {

    }
}

// function calculate(gate) {
//     if (!isNaN(parseInt(gate))) return parseInt(gate)
//     const statement = wires.get(gate)
//     if (statement.length === 1 && isNaN(parseInt(statement[0]))) return calculate(statement[0])
//     if (statement[0] === 'NOT') return not(calculate(statement[1]))
//     if (statement[1] === 'AND') return calculate(statement[0]) & calculate(statement[2])
//     if (statement[1] === 'OR') return calculate(statement[0]) | calculate(statement[2])
//     if (statement[1] === 'LSHIFT') return lShift(calculate(statement[0]), statement[2])
//     if (statement[1] === 'RSHIFT') return rShift(calculate(statement[0]), statement[2])
//     return parseInt(statement[0])
// }

lineReader.on('close', () => {
    console.log(calculate('a'))
    // Result:
})
