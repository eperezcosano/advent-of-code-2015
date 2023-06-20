/*
*   --- Day 7: Some Assembly Required ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day07.txt')
})

const wires = new Map()

function uint16 (n) {
    return n & 0xFFFF
}

lineReader.on('line', (line) => {
    const words = line.split(' ')
    if (words.length === 3) {
        // Assign operation
        wires.set(words[2], parseInt(words[0]))
    } else if (words.length === 4) {
        // Bitwise complement
        wires.set(words[3], uint16(~wires.get(words[1])))
    } else {
        // Rest of Bitwise operations
        if (words[1] === 'AND')
            wires.set(words[4], uint16(wires.get(words[0]) & wires.get(words[2])))
        else if (words[1] === 'OR')
            wires.set(words[4], uint16(wires.get(words[0]) | wires.get(words[2])))
        else if (words[1] === 'LSHIFT')
            wires.set(words[4], uint16(wires.get(words[0]) << parseInt(words[2])))
        else if (words[1] === 'RSHIFT')
            wires.set(words[4], uint16(wires.get(words[0]) >> parseInt(words[2])))
    }
})

lineReader.on('close', () => {
    console.log(wires.get('a'))
    // Result:
})

