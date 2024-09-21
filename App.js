import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    const [segundos, setSegundos] = React.useState(0)
    const [minutos, setMinutos] = React.useState(0)
    const [stopwatchid, setStopwatchid] = React.useState()
    
    function stop () {
        clearInterval(stopwatchid)    
    }
   let counter_s = 0
   let counter_m = 0
   
    function  count (){
        stop()
    const stopwatch = setInterval(function()  {
        
            
            if (counter_s == 60) {
              counter_s = 0
              counter_s++
              counter_m++
              if (counter_m == 0) {
                counter_m = 0
              }
              
            }
            counter_s++
            setStopwatchid(stopwatch)
             setSegundos(counter_s)
             setMinutos(counter_m)   
    }, 1000)
      
    } 
 
 function reset () {
    stop()
    setSegundos(counter_s)
    setMinutos(counter_m)   
 }
   
       function rollDice() {
      //JSON.parse(localStorage.getItem("now")) || 0
      //let now =  Math.floor(Date.now() / 1000)
     // localStorage.setItem("now", JSON.stringify(now))    
       let count = JSON.parse(localStorage.getItem("hashvark")) || 1
        count ++
        localStorage.setItem("hashvark", JSON.stringify(count))
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            
            localStorage.clear()
            setTenzies(false)
            setDice(allNewDice())     
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
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <p> Number of attempts: {JSON.parse(localStorage.getItem("hashvark"))}</p>
            
            <button className="start" onClick={count}>Start</button>
            <p>
                <span>{minutos}</span>:<span>{segundos}</span>
            </p>
            <button className="stop" onClick={stop}>Stop</button>
            <button className="reset" onClick={reset}>Reset</button>
        </main>
    )
}
localStorage.clear()