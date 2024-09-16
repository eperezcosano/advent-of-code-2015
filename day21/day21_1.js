/*
*   --- Day 21: RPG Simulator 20XX ---
*           --- Part One ---
*          Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day21.txt')
})

let boss = []
const shop = {
    weapons: [
        { name: "dagger", cost: 8, damage: 4, armor: 0 },
        { name: "shortSword", cost: 10, damage: 5, armor: 0 },
        { name: "warHammer", cost: 25, damage: 6, armor: 0 },
        { name: "longSword", cost: 40, damage: 7, armor: 0 },
        { name: "greatAxe", cost: 74, damage: 8, armor: 0 }
    ],
    armor: [
        { name: "leather", cost: 13, damage: 0, armor: 1 },
        { name: "chainMail", cost: 31, damage: 0, armor: 2 },
        { name: "splintMail", cost: 53, damage: 0, armor: 3 },
        { name: "bandedMail", cost: 75, damage: 0, armor: 4 },
        { name: "plateMail", cost: 102, damage: 0, armor: 5 }
    ],
    rings: [
        { name: "damage+1", cost: 25, damage: 1, armor: 0 },
        { name: "damage+2", cost: 50, damage: 2, armor: 0 },
        { name: "damage+3", cost: 100, damage: 3, armor: 0 },
        { name: "defense+1", cost: 20, damage: 0, armor: 1 },
        { name: "defense+2", cost: 40, damage: 0, armor: 2 },
        { name: "defense+3", cost: 80, damage: 0, armor: 3 }
    ]
}


function getAllEquipments() {
    const equipments = []
    shop.weapons.forEach(weapon => {
        shop.armor.forEach(armor => {
            shop.rings.forEach(firstRing => {
                shop.rings.forEach(secondRing => {
                    if (firstRing !== secondRing) equipments.push([weapon, armor, firstRing, secondRing])
                })
            })
        })
    })
    return equipments
        .map(equipment => equipment
            .reduce((acc, item) => ({
                cost: acc.cost + item.cost,
                damage: acc.damage + item.damage,
                armor: acc.armor + item.armor
            }))
        ).sort((a, b) => a.cost - b.cost)
}

/*
const playerTurns = Math.ceil(player.hit / Math.max(1, boss.damage - player.armor))
const bossTurns = Math.ceil(boss.hit / Math.max(1, player.damage - boss.armor))
*/

lineReader.on('line', line => {
    boss.push(parseInt(line.split(' ').pop()))
})

lineReader.on('close', () => {
    const equipments = getAllEquipments()
    const wins = equipments.filter(equipment =>
        Math.ceil(100 / Math.max(1, boss[1] - equipment.armor) >=
        Math.ceil(boss[0] / Math.max(1, equipment.damage - boss[2])))
    )
    console.log(wins)
    // Result:
})
