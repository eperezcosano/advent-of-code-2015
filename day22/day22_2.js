/*
*   --- Day 22: Wizard Simulator 20XX ---
*             --- Part Two ---
*           Advent Of Code 2015
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

class PriorityQueue {
    constructor() {
        this.values = []
    }

    isEmpty() {
        return this.values.length === 0
    }

    enqueue(element) {
        this.values.push(element)
        this._bubbleUp()
    }

    dequeue() {
        if (this.values.length === 0) return null
        if (this.values.length === 1) return this.values.pop()

        const min = this.values[0]
        this.values[0] = this.values.pop();
        this._sinkDown()

        return min;
    }

    _bubbleUp() {
        let i = this.values.length - 1
        const element = this.values[i]

        while (i > 0) {
            const parentIdx = Math.floor((i - 1) / 2)
            const parent = this.values[parentIdx]

            if (element.manaSpent >= parent.manaSpent) break

            this.values[parentIdx] = element
            this.values[i] = parent
            i = parentIdx
        }
    }

    _sinkDown() {
        let i = 0
        const length = this.values.length
        const element = this.values[0]

        while (true) {
            const leftChildIdx = 2 * i + 1;
            const rightChildIdx = 2 * i + 2;
            let leftChild, rightChild
            let swap = null

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx]
                if (leftChild.manaSpent < element.manaSpent) swap = leftChildIdx
            }

            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx]
                if (
                    (swap === null && rightChild.manaSpent < element.manaSpent) ||
                    (swap !== null && rightChild.manaSpent < leftChild.manaSpent)
                ) {
                    swap = rightChildIdx
                }
            }

            if (swap === null) break

            this.values[i] = this.values[swap]
            this.values[swap] = element
            i = swap
        }
    }
}

class GameState {
    constructor(playerHealth, playerMana, bossHealth, bossDamage, shieldTimer, poisonTimer, rechargeTimer, manaSpent) {
        this.playerHealth = playerHealth
        this.playerMana = playerMana
        this.bossHealth = bossHealth
        this.bossDamage = bossDamage
        this.shieldTimer = shieldTimer
        this.poisonTimer = poisonTimer
        this.rechargeTimer = rechargeTimer
        this.manaSpent = manaSpent
    }

    clone() {
        return new GameState(this.playerHealth, this.playerMana, this.bossHealth, this.bossDamage, this.shieldTimer, this.poisonTimer, this.rechargeTimer, this.manaSpent)
    }

    state() {
        return `${this.playerHealth},${this.playerMana},${this.bossHealth},${this.shieldTimer},${this.poisonTimer},${this.rechargeTimer}`
    }
}

function findLeastManaToWin(playerHealth, playerMana, bossHealth, bossDamage) {
    const initialState = new GameState(playerHealth, playerMana, bossHealth, bossDamage, 0, 0, 0, 0)
    const queue = new PriorityQueue()
    queue.enqueue(initialState)

    const visited = new Set()
    const comeFrom = new Map()

    const spells = {
        missile: { cost: 53, damage: 4 },
        drain: { cost: 73, damage: 2, heal: 2 },
        shield: { cost: 113, duration: 6 },
        poison: { cost: 173, duration: 6 },
        recharge: { cost: 229, duration: 5 }
    }

    function applyEffects(state) {
        if (state.rechargeTimer > 0) {
            state.playerMana += 101
            state.rechargeTimer--
        }
        if (state.shieldTimer > 0) {
            state.shieldTimer--
        }
        if (state.poisonTimer > 0) {
            state.bossHealth = Math.max(0, state.bossHealth - 3)
            state.poisonTimer--
        }
    }

    function expandState(state) {
        const results = []

        state = state.clone()

        state.playerHealth--
        if (state.playerHealth <= 0) return results

        applyEffects(state)

        if (state.bossHealth <= 0) return [{ state, spell: null }]

        for (const [spellName, spell] of Object.entries(spells)) {
            if (state.playerMana >= spell.cost) {
                const newState = state.clone()
                newState.playerMana -= spell.cost
                newState.manaSpent += spell.cost

                switch(spellName) {
                    case 'missile':
                        newState.bossHealth = Math.max(0, newState.bossHealth - spell.damage)
                        break
                    case 'drain':
                        newState.bossHealth = Math.max(0, newState.bossHealth - spell.damage)
                        newState.playerHealth += spell.heal
                        break;
                    case 'shield':
                        if (newState.shieldTimer === 0) {
                            newState.shieldTimer = spell.duration
                        } else continue
                        break
                    case 'poison':
                        if (newState.poisonTimer === 0) {
                            newState.poisonTimer = spell.duration
                        } else continue
                        break
                    case 'recharge':
                        if (newState.rechargeTimer === 0) {
                            newState.rechargeTimer = spell.duration
                        } else continue
                        break
                }

                applyEffects(newState)

                if (newState.bossHealth > 0) {
                    const damage = Math.max(1, newState.bossDamage - (newState.shieldTimer > 0 ? 7 : 0))
                    newState.playerHealth -= damage
                }

                if (newState.playerHealth > 0) {
                    results.push({ state: newState, spell: spellName })
                }
            }
        }

        return results
    }

    function reconstructPath(finalState) {
        const spells = []
        let currentState = finalState.state()

        while (comeFrom.has(currentState)) {
            const { prevState, spell } = comeFrom.get(currentState)
            if (spell) spells.unshift(spell)
            currentState = prevState
        }

        return spells
    }

    while (!queue.isEmpty()) {
        const currentState = queue.dequeue()
        const stateKey = currentState.state()

        if (visited.has(stateKey)) continue
        visited.add(stateKey)

        const nextStates = expandState(currentState)

        for (const { state: nextState, spell } of nextStates) {
            if (nextState.bossHealth <= 0) {
                comeFrom.set(nextState.state(), { prevState: stateKey, spell })
                return { manaSpent: nextState.manaSpent, spellSequence: reconstructPath(nextState) }
            }
            const nextStateKey = nextState.state()
            if (!visited.has(nextStateKey)) {
                comeFrom.set(nextStateKey, { prevState: stateKey, spell })
                queue.enqueue(nextState)
            }
        }
    }

    throw new Error("No solution found")
}

const boss = []
lineReader.on('line', line => {
    boss.push(parseInt(line.split(' ').pop()))
})

lineReader.on('close', () => {
    const res = findLeastManaToWin(50, 500, boss[0], boss[1])
    console.log('Result:', res.manaSpent)
    // Result: 1289
})
