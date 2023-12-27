
import React from 'react'
import {useState, useEffect, Card } from 'react'
import './App.css'
import ReactConfetti from 'react-confetti'

function App() {
  const [cards, setCards] = useState([]) // list of 16 denoting cards
  const [flips, setFlips] = useState([]) // flipped index, -1 for no flips
  const [matches, setMatches] = useState([]) // list of matched indexes 

  function reset() {
    
    setMatches([])
    setFlips([])
    const symbols = [1,2,3,4,5,6,7,8]
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setCards(deck)
  }

  useEffect(()=> {
    reset()
  }, []);

  const handleCardClick = index => {
    console.log("index", index)
    console.log("card", cards[index])
    
      // check if tried to flip alr matched or flipped
    if(flips.includes(index) || matches.includes(index))
    {
      return;
    }
  
    if(flips.length == 0) // if no flips, set flips
    {
      setFlips([index])
    }
    else if(flips.length == 1) 
    {
      // set flips
      setFlips([flips[0], index])

      // check if flips match
      if(cards[flips[0]] == cards[index])
      {
        // set match after half second
        setTimeout(()=>{
          setMatches( [...matches, flips[0], index])
          setFlips([])
        }, 500)
      
        return;
      }

      // reset flips after 1s
      setTimeout(()=>{
        setFlips([])
      }, 1000)
    }
  }

  return (
    <>
     <div className="container">
      <h1>Card Match</h1>
      <p>Challenge your memory and matching skills by flipping cards, seeking pairs, and putting your memory to the test!</p>
      
      <div className="cards-grid">
      {cards.map((card, index) => (
        <div 
        
          key = {index}
          className={`card 
            ${flips.includes(index) ? 'flipped' : ''}
            ${matches.includes(index) ? 'matched' : ''}
            `}
          onClick = {()=> handleCardClick(index)}>
        
        {matches.includes(index) ||  flips.includes(index) ? card : ""}
        </div>
      ))}
      </div>
      
      <button className="reset-button" onClick={reset}>Reset</button>

      {matches.length == 16 ?
      <ReactConfetti numberOfPieces={1000} recycle={false}></ReactConfetti>:
      <></>
      }
      </div>
    </>
  )
}
export default App
