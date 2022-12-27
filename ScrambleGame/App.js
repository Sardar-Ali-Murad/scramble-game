
import React from 'react'
import Words from './data.txt'
import "./app.css"
import { FaSlack } from 'react-icons/fa'

const App = () => {
    
    let [randomWord,setRandomWord]=React.useState([])
    let [userWord,setUserWord]=React.useState("")
    let [sortedArray,setSortedArray]=React.useState([])
    let [win,setWin]=React.useState(false)
    let [lose,setLose]=React.useState(false)
    let [time,setTime]=React.useState(30)

    let start=async ()=>{
        let data=await fetch(Words)
        let final=await data.text()
        final=final.split("\n")
        let random=Math.floor(Math.random()*final.length-1)
        let randomWords=final[random].split("").slice(0,-1)
        let New=final[random].split("").slice(0,-1).sort(()=>Math.random() - 0.5)
        setSortedArray(New)
        setRandomWord(randomWords)
    }

    React.useEffect(()=>{
        if(time!==0 && !lose===true && !win===true){
            setTimeout(()=>{
                setTime((pre)=>pre-1)
            },1000)
        }
    },[time])

    
    
    React.useEffect(()=>{
         start()
      },[])

      function UserWord(e){
        if(!win===true && !lose===true && time!==0){
            setUserWord(e.target.value)
        }
      }
      
      
      function reset(){
         start()
         setUserWord("")
         setWin(false)
         setLose(false)
         setTime(30)
      }
      
    
    function result(){
        let IfWin=userWord.split("").every((all,i)=>all.toLocaleLowerCase()===randomWord[i])
        if(IfWin){
            setWin(true)
        }
        else{
            setLose(true)
        }
    }

    React.useEffect(()=>{
       if(time===0){
        setLose(true)
       }
    },[time])

    
    console.log(randomWord)
    return (
    <div className='div-center-50' style={{marginTop:"100px"}}>
      <h2>Scramble Game</h2>
      <h1>{time}s Left</h1>

      <div style={{display:"flex",gap:"20px"}}>
       {
          sortedArray.map((all,i)=>{
              return <h1 key={i}>{all}</h1>
            })
       }
        </div>

        <input className='input' value={userWord} onChange={(e)=>UserWord(e)}/>

        <div style={{display:"flex",gap:"20px",marginTop:"30px"}}>
            <button className='btn' onClick={reset}>Reset</button>
            <button className='btn'  onClick={result}>Check</button>
        </div>

        {
            win && <p>Your Win Reset to play again</p>
        }

        {
            lose && <p>Your Lose The correct word is {randomWord.join("")} Reset To Play Again</p>
        }

    </div>
  )
}

export default App
