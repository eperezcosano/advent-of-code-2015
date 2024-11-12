/*
*   --- Day 22: Wizard Simulator 20XX ---
*             --- Part One ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

const boss = []

function simulate(playerHit, mana, bossHit, shieldTimer, poisonTimer, rechargeTimer, myTurn, depth) {
    //if (myTurn) playerHit -= 1
    if (bossHit <= 0) return 0

    //playerHit = Math.min(playerHit, 50)

    if (depth === 0 || playerHit <= 0) return 1e10

    const newShieldTimer = Math.max(0, shieldTimer - 1)
    const newPoisonTimer = Math.max(0, poisonTimer - 1)
    const newRechargeTimer = Math.max(0, rechargeTimer - 1)

    if (!myTurn) {
        if (poisonTimer > 0) bossHit -= 3
        const playerArmor = shieldTimer === 0 ? 0 : 7
        if (rechargeTimer > 0) mana += 101
        if (bossHit <= 0) return 0
        else playerHit -= Math.max(1, boss[1] - playerArmor)
        return simulate(playerHit, mana, bossHit, newShieldTimer, newPoisonTimer, newRechargeTimer, !myTurn, depth - 1)
    } else {
        if (poisonTimer > 0) bossHit -= 3
        if (bossHit <= 0) return 0
        if (rechargeTimer > 0) mana += 101
        let min = 6e10
        if (mana < 53) return 1e10
        if (mana >= 53) min = Math.min(min, 53 + simulate(playerHit, mana - 53, bossHit - 4, newShieldTimer, newPoisonTimer, newRechargeTimer, !myTurn, depth - 1))
        if (mana >= 73) min = Math.min(min, 73 + simulate(playerHit + 2, mana - 73, bossHit - 2, newShieldTimer, newPoisonTimer, newRechargeTimer, !myTurn, depth - 1))
        if (mana >= 113 && newShieldTimer === 0) min = Math.min(min, 113 + simulate(playerHit, mana - 113, bossHit, 6, newPoisonTimer, newRechargeTimer, !myTurn, depth - 1))
        if (mana >= 173 && newPoisonTimer === 0) min = Math.min(min, 173 + simulate(playerHit, mana - 173, bossHit, newShieldTimer, 6, newRechargeTimer, !myTurn, depth - 1))
        if (mana >= 229 && newRechargeTimer === 0) min = Math.min(min, 229 + simulate(playerHit, mana - 229, bossHit, newShieldTimer, newPoisonTimer, 5, !myTurn, depth - 1))
        return min
    }
}

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


lineReader.on('line', line => {
    boss.push(parseInt(line.split(' ').pop()))
})

lineReader.on('close', () => {
    const res = simulate(50, 500, boss[0], 0, 0, 0, true, 1e10)
    console.log('Result:', res)
    // Result:
})
