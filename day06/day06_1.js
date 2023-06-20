/*
*   --- Day 6: Probably a Fire Hazard ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day06.txt')
})

const N = 1_000
const grid = new Array(N).fill(false).map(() => new Array(N).fill(false))

function parseCoords(string) {
    return string.split(',').map(value => parseInt(value))
}

function turnLights(state, [fromX, fromY], [toX, toY]) {
    for (let y = fromY; y <= toY; y++) {
        for (let x = fromX; x <= toX; x++) {
            if (state === 'on') grid[y][x] = true
            else if (state === 'off') grid[y][x] = false
            else if (state === 'toggle') grid[y][x] = !grid[y][x]
        }
    }
}

lineReader.on('line', (line) => {
    let state, from, to
    if (line.startsWith('turn')) {
        [, state, from, , to] = line.split(' ')
    } else {
        [state, from, , to] = line.split(' ')
    }
    turnLights(state, parseCoords(from), parseCoords(to))
})

lineReader.on('close', () => {
    const sum = grid.reduce((total, row) => total + row.reduce((sum, value) => sum + (value === true ? 1 : 0), 0), 0)
    console.log('Total:', sum)
    // Total: 569999
})
