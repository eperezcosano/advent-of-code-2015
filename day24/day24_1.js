/*
*   --- Day 24: It Hangs in the Balance ---
*               --- Part One ---
*             Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day24.txt')
})

const weights = []

function* combinations(iterable, r) {
    const pool = [...iterable]
    const n = pool.length
    if (r > n) return
    const indices = new Uint32Array(r).map((_, index) => index)
    yield pool.slice(0, r)
    while (true) {
        let i
        loop: {
            for (i = r - 1; i >= 0; i--) {
                if (indices[i] !== i + n - r) break loop
            }
            return
        }
        const result = Array(r)
        for (let j = 0; j < i; j++) {
            result[j] = pool[indices[j]]
        }
        let index = indices[i] += 1
        result[i] = pool[index]
        for (let j = i + 1; j < r; j++) {
            indices[j] = index += 1
            result[j] = pool[index]
        }
        yield result
    }
}

function product(arr) {
    return arr.reduce((acc, val) => acc * val, 1)
}

function solve() {
    const sum = weights.reduce((acc, val) => acc + val, 0) / 3
    for (let i = 1; i <= weights.length; i++) {
        const options = [...combinations(weights, i)]
            .filter(item => item.reduce((acc, val) => acc + val, 0) === sum)
        if (options.length === 0) continue
        options.sort((a, b) => product(a) - product(b))
        return product(options[0])
    }
}

lineReader.on('line', line => weights.push(parseInt(line)))

lineReader.on('close', () => {
    const res = solve()
    console.log('Resolve:', res)
    // Result: 11846773891
})
