/*
*   --- Day 13: Knights of the Dinner Table ---
*                 --- Part One ---
*                Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day13.txt')
})

const relations = new Map()
const people = new Set()

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

function totalHappiness(permutations) {
    const totalHappiness = []
    for(const table of permutations) {
        let happiness = 0
        for(let i = 0; i < table.length; i++) {
            const leftIndex = i - 1 < 0 ? table.length - 1 : i - 1
            const rightIndex = i + 1 > table.length - 1 ? 0 : i + 1

            const leftPair = [table[i], table[leftIndex]].join('-')
            const rightPair = [table[i], table[rightIndex]].join('-')

            happiness += relations.get(leftPair)
            happiness += relations.get(rightPair)
        }
        totalHappiness.push(happiness)
    }
    return totalHappiness
}

lineReader.on('line', (line) => {
    let [personA, , gainOrLose, happiness, , , , , , , personB] = line.split(' ')
    happiness = gainOrLose === 'lose' ? -happiness : +happiness
    relations.set(`${personA}-${personB.slice(0, -1)}`, happiness)
    people.add(personA)
})

lineReader.on('close', () => {
    const res = Math.max(...totalHappiness(permute(people)))
    console.log('Result:', res)
    // Result: 733
})
