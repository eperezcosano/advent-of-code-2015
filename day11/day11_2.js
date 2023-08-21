/*
*   --- Day 11: Corporate Policy ---
*          --- Part Two ---
*        Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day11.txt')
})

const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

let password

function hasThreeConsecutiveLetters(password) {
    for(let i = 0; i < password.length - 2; i++) {
        const firstLetter = abc.indexOf(password[i])
        const secondLetter = abc.indexOf(password[i + 1])
        if (firstLetter + 1 != secondLetter) continue
        const thirdLetter = abc.indexOf(password[i + 2])
        if (secondLetter + 1 === thirdLetter) return true
    }
    return false
}

function hasAllowedLetters(password) {
    return !/i|o|l/.test(password)
}

function hasTwoPairs(password) {
    const regex = /([a-z])\1.*([a-z])\2/i
    return regex.test(password)
}

function nextPassword(password) {
    for(let i = password.length - 1; i >= 0; i--) {
        const nextLetterIndex = (abc.indexOf(password[i]) + 1) % abc.length
        password[i] = abc[nextLetterIndex]
        if (nextLetterIndex > 0) break
    }
    return password
}

function generatePassword() {
    let input = password.split('')
    for(;;) {
        input = nextPassword(input)
        const tmp = input.join('')
        if (hasAllowedLetters(tmp) && hasThreeConsecutiveLetters(tmp) && hasTwoPairs(tmp)) return tmp
    }
}

lineReader.on('line', line => password = line)

lineReader.on('close', () => {
    password = generatePassword()
    const res = generatePassword()
    console.log('Result:', res)
    // Result: hxcaabcc
})
