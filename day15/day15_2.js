/*
*   --- Day 15: Science for Hungry People ---
*              --- Part Two ---
*             Advent Of Code 2015
* */

const recipes = [
    [ 2, 0, -2, 0, 3 ],
    [ 0, 5, -3, 0, 3 ],
    [ 0, 0, 5, -1, 8 ],
    [ 0, -1, 0, 5, 8 ]
]

function getCalories(x, y, z, w) {
    const teaspoons = [x, y, z, w]
    let calories = 0
    for (let r = 0; r < recipes.length; r++) {
        calories += teaspoons[r] * recipes[r][4]
    }
    return calories
}

function makeCookie(x, y, z, w) {
    const teaspoons = [x, y, z, w]
    let score = 1
    for(let i = 0; i < 4; i++) {
        let sum = 0
        for(let j = 0; j < recipes.length; j++) {
            sum += teaspoons[j] * recipes[j][i]
        }
        if (sum < 0) return 0
        score *= sum
    }
    return score
}

let max = 0
for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        for (let z = 0; z < 100; z++) {
            for (let w = 0; w < 100; w++) {
                if (x + y + z + w != 100) continue
                if (getCalories(x, y, z, w) != 500) continue
                const score = makeCookie(x, y, z, w)
                if (score > max) max = score
            }
        }
    }
}

console.log('Result:', max)
// Result: 1766400
