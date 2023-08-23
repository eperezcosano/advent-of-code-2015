/*
*   --- Day 12: JSAbacusFramework.io ---
*             --- Part Two ---
*            Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12.txt')
})

let doc

function hasRed(obj) {
    return typeof obj === "object" && !Array.isArray(obj) && Object.values(obj).includes('red')
}

function findSum(obj) {
    let partialSum = 0
    if (hasRed(obj)) return partialSum
    for (const key in obj) {
        if (typeof obj[key] === "number") partialSum += obj[key]
        else if (typeof obj[key] === "object") partialSum += findSum(obj[key])
    }
    return partialSum
}

lineReader.on('line', line => doc = line)

lineReader.on('close', () => {
    const res = findSum(JSON.parse(doc))
    console.log('Result:', res)
    // Result: 96852
})
