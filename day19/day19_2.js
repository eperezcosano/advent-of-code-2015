/*
*   --- Day 19: Medicine for Rudolph ---
*             --- Part Two ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

const replacements = []
let molecule

let lineBreak = false
lineReader.on('line', line => {
    if (line.length === 0) {
        lineBreak = true
        return
    }
    if (lineBreak) molecule = line
    else replacements.push(line.split(' => ').reverse())
})

function getVariants(molecule, from, to) {
    const variants = new Set()
    for (let i = 0; i < molecule.length; i++) {
        i = molecule.indexOf(from, i)
        if (i < 0) break
        variants.add(molecule.substring(0, i) + to + molecule.substring(i + from.length))
    }
    return Array.from(variants)
}

function getSubMolecules(molecules, map) {
    const total = []
    for (const subMolecule of molecules) {
        let max = null
        for (const [to, from] of map) {
            const sub = getVariants(subMolecule, to, from)
            if (sub.length === 0) continue
            if (to.length < max) break
            max = to.length
            //console.log(subMolecule, sub)
            total.push(...sub)
        }
    }
    //const min = Math.min(...total.map(val => val.length))
    //const tmp = new Set([...total.filter(val => val.length === min)])
    //console.log(tmp)
    return [...new Set(total)]
}

function steps() {
    const map = new Map(replacements.sort((a, b) => b[0].length - a[0].length))
    let molecules = [molecule]
    for (let steps = 1; steps < 1_000_000; steps++) {
        molecules = getSubMolecules(molecules, map)
        if (molecules.includes('e')) return steps
    }
}

lineReader.on('close', () => {
    const res = steps()
    console.log('Result:', res)
    // Result:
})
