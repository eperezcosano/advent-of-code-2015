/*
*   --- Day 12: JSAbacusFramework.io ---
*             --- Part One ---
*            Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12.txt')
})

let doc

function findSum() {
    return doc.match(/-?\d+/g).reduce((acc, val) => acc + parseInt(val), 0)
}

lineReader.on('line', line => doc = line)

lineReader.on('close', () => {
    console.log('Result:', findSum())
    // Result: 156366
})
