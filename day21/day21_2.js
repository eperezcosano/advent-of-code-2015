/*
*   --- Day 21: RPG Simulator 20XX ---
*           --- Part One ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day21.txt')
})

const boss = []
const weapons = [
    { cost: 8,  damage: 4, armor: 0 },
    { cost: 10, damage: 5, armor: 0 },
    { cost: 25, damage: 6, armor: 0 },
    { cost: 40, damage: 7, armor: 0 },
    { cost: 74, damage: 8, armor: 0 }
]
const armors = [
    { cost: 13,  damage: 0, armor: 1 },
    { cost: 31,  damage: 0, armor: 2 },
    { cost: 53,  damage: 0, armor: 3 },
    { cost: 75,  damage: 0, armor: 4 },
    { cost: 102, damage: 0, armor: 5 },
    { cost: 0,   damage: 0, armor: 0 }
]
const rings = [
    { cost: 25,  damage: 1, armor: 0 },
    { cost: 50,  damage: 2, armor: 0 },
    { cost: 100, damage: 3, armor: 0 },
    { cost: 20,  damage: 0, armor: 1 },
    { cost: 40,  damage: 0, armor: 2 },
    { cost: 80,  damage: 0, armor: 3 },
    { cost: 0,   damage: 0, armor: 0 }
]

function getAllEquipments() {
    const equipments = []
    for (const weapon of weapons) {
        for (const armor of armors) {
            for (const ring1 of rings) {
                for (const ring2 of rings) {
                    if (ring1 === ring2) continue
                    equipments.push({
                        cost: weapon.cost + armor.cost + ring1.cost + ring2.cost,
                        damage: weapon.damage + armor.damage + ring1.damage + ring2.damage,
                        armor: weapon.armor + armor.armor + ring1.armor + ring2.armor
                    })
                }
            }
        }
    }
    return equipments
}

lineReader.on('line', line => {
    boss.push(parseInt(line.split(' ').pop()))
})

lineReader.on('close', () => {
    const equipments = getAllEquipments()
    equipments.sort((a, b) => b.cost - a.cost)
    const [ hit, damage, armor ] = boss
    const lose = equipments.find(equipment =>
        Math.ceil(100 / Math.max(1, damage - equipment.armor)) <
        Math.ceil(hit / Math.max(1, equipment.damage - armor))
    )
    console.log('Result', lose.cost)
    // Result: 201
})
