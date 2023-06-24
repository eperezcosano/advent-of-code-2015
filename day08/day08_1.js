/*
*   --- Day 8: Matchsticks ---
*        --- Part One ---
*      Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day08.txt')
})

let code = 0
let char = 0

function getASCII(hex) {
    return String.fromCharCode(parseInt(hex, 16))
}
function remove(string, from, to) {
    return string.substring(0, from) + string.substring(to);
}

function insert(string, char, position) {
    return [string.slice(0, position), char, string.slice(position)].join('')
}

lineReader.on('line', (line) => {
    code += line.length

    line = line.slice(1)

    while (line.indexOf('\\x') > -1) {
        const asciiPos = line.indexOf('\\x')
        const ascii = getASCII(line.substring(asciiPos + 2, asciiPos + 4))
        line = remove(line, asciiPos, asciiPos + 4)
        line = insert(line, ascii, asciiPos)
    }

    while (line.indexOf('\\"') > -1) {
        const pos = line.indexOf('\\"')
        line = remove(line, pos, pos + 1)
    }

    while (line.indexOf('\\\\') > -1) {
        const pos = line.indexOf('\\\\')
        line = remove(line, pos, pos + 1)
    }

    line = line.slice(0, -1)

    char += line.length
})

lineReader.on('close', () => {
    console.log(code, char, code - char)
    // Total:
})

