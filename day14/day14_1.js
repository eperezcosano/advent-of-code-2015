/*
*   --- Day 14: Reindeer Olympics ---
*            --- Part One ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day14.txt')
})

const RACE_TIME = 1_000

const reindeer = [
    {
        speed: 14,
        timeFlying: 10,
        timeResting: 127
    },
    {
        speed: 16,
        timeFlying: 11,
        timeResting: 162
    }
]

const res = reindeer.reduce((acc, value) => {
    const avgTime = Math.ceil(RACE_TIME / (value.timeFlying + value.timeResting))
    const kms = avgTime * value.speed * value.timeFlying
    console.log(kms)
    return kms > acc ? kms : acc
}, 0)

console.log(res)

lineReader.on('line', (line) => {
})

lineReader.on('close', () => {
    // Result:
})
