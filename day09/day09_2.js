/*
*   --- Day 9: All in a Single Night ---
*            --- Part Two ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day09.txt')
})

const map = new Map()
const places = new Set()

function permute(input) {

    function permuteHelper(res, item, key, arr) {
        if (arr.length > 1) {
            const remainingItems = arr.slice(0, key).concat(arr.slice(key + 1))
            const permutations = remainingItems.reduce(permuteHelper, [])
            const itemPermutations = permutations.map(perm => [item].concat(perm))
            return res.concat(itemPermutations)
        } else {
            return res.concat(item)
        }
    }

    const array = Array.from(input)
    return array.reduce(permuteHelper, [])
}

function calculateCosts(allPermutations) {
    const costs = []
    for(const route of allPermutations) {
        let cost = 0
        for(let i = 0; i < route.length - 1; i++) {
            const pair = [route[i], route[i + 1]]
            if (map.has(pair.join('-'))) {
                cost += map.get(pair.join('-'))
            } else {
                cost += map.get(pair.reverse().join('-'))
            }
        }
        costs.push(cost)
    }
    return costs
}

lineReader.on('line', (line) => {
    const [from, , to, , cost] = line.split(' ')
    map.set([from, to].join('-'), parseInt(cost))
    places.add(from).add(to)
})

lineReader.on('close', () => {
    const allPermutations = permute(places)
    const costs = calculateCosts(allPermutations)
    console.log('Result:', Math.max(...costs))
    // Result: 736
})

