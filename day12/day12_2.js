/*
*   --- Day 12: JSAbacusFramework.io ---
*             --- Part Two ---
*            Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12.txt')
})

let doc

function findSum() {
    return doc.match(/-?\d+/g).reduce((acc, val) => acc + parseInt(val), 0)
}

function excludeRed() {
    let sum = 0
    const json = JSON.parse(doc)

    for (const key of json) {
        if (typeof ) {}
        
    }

    //if (typeof value === "number") sum += parseInt(value)
    console.log(sum)
}

lineReader.on('line', line => doc = line)

lineReader.on('close', () => {
    excludeRed()
    //console.log('Result:', findSum())
    // Result: 156366
})
