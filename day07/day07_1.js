/*
*   --- Day 7: Some Assembly Required ---
*             --- Part One ---
*           Advent Of Code 2015
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
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

function getWire(id) {
    return isNaN(wires.get(id)) ? 0 : wires.get(id)
}

// if (words.length === 3) {
//     // Assign operation
//     wires.set(words[2], parseInt(words[0]))
// } else if (words.length === 4) {
//     // Bitwise complement
//     wires.set(words[3], not(getWire(words[1])))
// } else {
//     // Rest of Bitwise operations
//     if (words[1] === 'AND')
//         wires.set(words[4], getWire(words[0]) & getWire(words[2]))
//     else if (words[1] === 'OR')
//         wires.set(words[4], getWire(words[0]) | getWire(words[2]))
//     else if (words[1] === 'LSHIFT')
//         wires.set(words[4], lShift(getWire(words[0]), parseInt(words[2])))
//     else if (words[1] === 'RSHIFT')
//         wires.set(words[4], rShift(getWire(words[0]), parseInt(words[2])))
// }

lineReader.on('line', (line) => {
    const words = line.split(' ')
    wires.set(words.pop(), words.slice(0, -1))
})

function bfs(graph, start) {
    const toBeCalculated = [start]
    const visited = new Set()
    const result = []

    while (queue.length) {
        const vertex = queue.shift()

        if (!graph.has(vertex)) continue

        if (!visited.has(vertex)) {
            visited.add(vertex)
            result.push(vertex)
            for (const neighbor of graph.get(vertex)) {
                if (['AND', 'OR'].includes(neighbor)) continue
                if (neighbor.endsWith('SHIFT')) break
                queue.push(neighbor)
            }
        }
    }

    return result
}

lineReader.on('close', () => {
    console.log(wires.entries())
    console.log(bfs(wires, 'e'))
    // Result:
})
