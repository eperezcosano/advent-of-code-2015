/*
*   --- Day 18: Like a GIF For Your Yard ---
*              --- Part Two ---
*             Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day18.txt')
})

const N = 100
let grid = []

function neighborsOn(y, x) {
    let sum = 0
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue
            if (y + dy < 0 || x + dx < 0 || y + dy >= N || x + dx >= N) continue
            if (grid[y + dy][x + dx]) sum++
        }
    }
    return sum
}

function animate() {
    const next = JSON.parse(JSON.stringify(grid))
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (y === 0 && x === 0 || y === 0 && x === N - 1 || y === N - 1 && x === 0 || y === N - 1 && x === N - 1) continue
            const neighbors = neighborsOn(y, x)
            if (!grid[y][x] && neighbors === 3) next[y][x] = true
            else if (grid[y][x] && (neighbors < 2 || neighbors > 3)) next[y][x] = false
        }
    }
    grid = next
}

lineReader.on('line', line => grid.push(line.split('').map(val => val === '#')))

lineReader.on('close', () => {
    for (const [y, x] of [[0, 0], [0, N - 1], [N - 1, 0], [N - 1, N - 1]]) grid[y][x] = true
    for (let n = 0; n < N; n++) animate()
    const res = grid.reduce((acc, row) => acc + row.reduce((acc, val) => val ? ++acc : acc, 0), 0)
    console.log('Result:', res)
    // Result: 781
})
