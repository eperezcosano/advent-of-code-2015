/*
*   --- Day 22: Wizard Simulator 20XX ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

const player = {
    hit: 10,
    armor: 0,
    mana: 250
}

const boss = {
    hit: 14,
    damage: 8
}

const spells = [
    { name: 'missile', cost: 53, damage: 4 },
    { name: 'drain', cost: 73, damage: 2, heal: 2 },
    { name: 'shield', cost: 113, effect: 7, turns: 6 },
    { name: 'poison', cost: 173, effect: 3, turns: 6 },
    { name: 'recharge', cost: 229, effect: 101, turns: 5 }
]

function play() {
    const activeSpells = []
    const characters = ['Player', 'Boss']
    let turn = 0
    let n = 0
    let test = ['recharge', 'shield', 'drain', 'poison', 'missile']
    while (true) {
        console.log(`--- ${characters[turn]} Turn ---`)
        console.log(`- Player has ${player.hit} hit points, ${player.armor} armor, ${player.mana} mana`)
        console.log(`- Boss has ${boss.hit} hit points`)
        console.log('ACTIVE', activeSpells)
        for (const spell of activeSpells) {
            const { name, effect, turns } = activeSpells.pop()
            if (name === 'shield') {
                console.log(`Shield's timer is now ${turns - 1}.`)
                if (turns - 1 === 0) player.armor -= effect
            } else if (name === 'poison') {
                console.log(`Poison deals ${effect} damage; its timer is now ${turns - 1}.`)
                boss.hit -= effect
                if (boss.hit <= 0) {
                    console.log('This kills the boss, and the player wins.')
                    return true
                }
            } else if (name === 'recharge') {
                console.log(`Recharge provides ${effect} mana; its timer is now ${turns - 1}.`)
                player.mana += effect
            }
            if (turns > 1) activeSpells.unshift({ name, effect, turns: turns - 1})
        }

        if (turn === 0) { // Player's turn
            const spell = spells.find(spell => spell.name === test[n])
            n++
            player.mana -= spell.cost
            if (player.mana < 0) {
                console.log('Player cannot afford more spells. You lose')
                return false
            }
            console.log(`Player casts ${spell.name}.`)

            if (spell.name === 'shield') {
                console.log(`increasing armor by ${spell.effect}.`)
                player.armor += spell.effect
                activeSpells.push(spell)
            } else if (spell.name === 'missile') {
                console.log(`Deal ${spell.damage} damage.`)
                boss.hit -= spell.damage
                if (boss.hit <= 0) {
                    console.log('This kills the boss, and the player wins.')
                    return true
                }
            } else if (spell.name === 'drain') {
                console.log(`Deal ${spell.damage} damage.`)
                boss.hit -= spell.damage
                if (boss.hit <= 0) {
                    console.log('This kills the boss, and the player wins.')
                    return true
                }
                console.log(`Heal ${spell.heal} points.`)
                player.hit += spell.heal
            } else {
                activeSpells.push(spell)
            }

        } else if (turn === 1) { // Boss turn
            console.log(`Boss attacks for ${ Math.max(1, boss.damage - player.armor)} damage!`)
            player.hit -= Math.max(1, boss.damage - player.armor)
            if (player.hit <= 0) {
                console.log('This kills the Player. You lose')
                return false
            }
        }
        turn = (turn + 1) % 2
    }
}


lineReader.on('line', (line) => {
})

lineReader.on('close', () => {
    play()
    // Result:
})

