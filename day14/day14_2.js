/*
*   --- Day 14: Reindeer Olympics ---
*            --- Part Two ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day14.txt')
})

const RACE_TIME = 2503

const reindeer = []

function startRace() {
    for(let i = 1; i <= RACE_TIME; i++) {
        for(r of reindeer) {
            if (r.isFlying) {
                r.distance += r.speed
                if (--r.dF <= 0) {
                    r.dF = r.timeFlying
                    r.isFlying = false
                }
            } else {
                if (--r.dR <= 0) {
                    r.dR = r.timeResting
                    r.isFlying = true
                }
            }
        }
        const max = Math.max(...reindeer.map(val => val.distance))
        for(r of reindeer) {
            if (r.distance == max) r.points++
        }
    }
}

lineReader.on('line', (line) => {
    const [, , , speed, , , timeFlying, , , , , , , timeResting] = line.split(' ').map(val => parseInt(val))
    reindeer.push({ speed, timeFlying, dF: timeFlying, timeResting, dR: timeResting, distance: 0, points: 0, isFlying: true })
})

lineReader.on('close', () => {
    startRace()
    console.log('Result:', Math.max(...reindeer.map(val => val.points)))
    // Result: 1059
})
