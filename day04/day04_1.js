/*
*   --- Day 4: The Ideal Stocking Stuffer ---
*               --- Part One ---
*              Advent Of Code 2015
* */
const crypto = require('crypto')

const input = 'yzbqklnj'

let key = 0
let hash
do {
    hash = crypto.createHash('md5').update(`${input}${++key}`).digest('hex')
} while (!hash.startsWith('00000'))

console.log('Result:', key)
// Result: 282749
