/*
*   --- Day 23: Opening the Turing Lock ---
*               --- Part Two ---
*              Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day23.txt')
})

const instrs = []

function runInstructions() {
    let p = 0
    let regs = { a: 1, b: 0 }
    while (p >= 0 && p < instrs.length) {
        switch (instrs[p].instr) {
            case 'hlf':
                regs[instrs[p].reg] /= 2
                p++
                break
            case 'tpl':
                regs[instrs[p].reg] *= 3
                p++
                break
            case 'inc':
                regs[instrs[p].reg]++
                p++
                break
            case 'jmp':
                p += instrs[p].offset
                break
            case 'jie':
                if (regs[instrs[p].reg] % 2 === 0) p += instrs[p].offset
                else p++
                break
            case 'jio':
                if (regs[instrs[p].reg] === 1) p += instrs[p].offset
                else p++
                break
        }
    }
    return regs.b
}

lineReader.on('line', line => {
    const parts = line.replace(',', '').split(' ')
    if (parts.length === 3) instrs.push({ instr: parts[0], reg: parts[1], offset: parseInt(parts[2]) })
    else if (parts[0] === 'jmp') instrs.push({ instr: parts[0], offset: parseInt(parts[1]) })
    else instrs.push({ instr: parts[0], reg: parts[1] })
})

lineReader.on('close', () => {
    const res = runInstructions()
    console.log('Result:', res)
    // Result: 231
})