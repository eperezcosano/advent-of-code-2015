/*
*   --- Day 9: All in a Single Night ---
*            --- Part One ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

const graph = new Map()

lineReader.on('line', (line) => {
    const [from, , to, , cost] = line.split(' ')
    graph.set([from, to].join('-'), parseInt(cost))
})

lineReader.on('close', () => {
    console.log(graph)
})

