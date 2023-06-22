/*
*   --- Day 7: Some Assembly Required ---
*             --- Part Two ---
*           Advent Of Code 2015
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})
const commandRegex = /[A-Z]+/g;
const argRegex = /[a-z0-9]+/g;

let wires = new Map()
const bitwiseOperations = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: a => ~a,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b
}
lineReader.on('line', (line) => {
    const command = line.match(commandRegex)
    const args = line.match(argRegex).map(arg => isNaN(parseInt(arg)) ? arg : parseInt(arg))
    const destination = args.pop()
    wires.set(destination, {command, args})
})

function calculate(wireId) {
    const wire = wires.get(wireId)

    // WireId is a number
    if (typeof wireId === 'number') return wireId
    // Wire is pointing to a number
    if (typeof wire === 'number') return wire
    // WireId is undefined (second arg on not gate)
    if (typeof wire === 'undefined') return undefined

    if (!wire.command) {
        // Connected directly to another wire
        wires.set(wireId, calculate(wire.args[0]))
    } else {
        // Calculate operation
        const res = bitwiseOperations[wire.command](calculate(wire.args[0]), calculate(wire.args[1]))
        wires.set(wireId, res)
    }

    return wires.get(wireId)
}

lineReader.on('close', () => {

    const wiresTmp = new Map(wires)
    const wireA = calculate('a')
    wires = new Map(wiresTmp)
    wires.set('b', wireA)

    console.log('Result:', calculate('a'))
    // Result: 14710
})
