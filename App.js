import React,{useState, useEffect} from 'react'
import Confetti from 'react-confetti'
import Die from './components/Die'
import {nanoid} from 'nanoid'

export default function App() {
    const [dice, setDice] = useState(allDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const checkHold = dice.every(die => die.isHeld)
        const giveNum1stValue = dice[0].value
        const checkValue = dice.every(die => die.value === giveNum1stValue)
        if(checkHold && checkValue) {
            setTenzies(true)
            console.log("You won")
        }
    }, [dice])

    //a function to avoid repeatition, des creat new die
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    // create a function to generate random numbers in an array

    function allDice() {
        const diceArr = []
        for(let i = 0; i < 10; i++) {
            diceArr.push(generateNewDie)
        } return dice
    }

    function rollDice() {
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                die : 
                generateNewDie()
            })) 
        } else {
            setTenzies(false)
            setDice(allDice())
        }
        }
      function holdDice(id) {
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ?
                        {...die, isHeld: !die.isHeld} :
                        die
            }))
        }
    const diceElements = dice.map(die => (
            <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />
        ))
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{this.state.tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}