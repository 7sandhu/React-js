import { useState } from "react"


function App() {
 
  let [counter,setCounter]=useState(15)

  const add= ()=>{
    setCounter(counter+1)
  }
  const remove= ()=>{
    setCounter(counter-1)
  }

  return (
    <>
      <h1>Counter : {counter}</h1>
      <button onClick={add}>Increase value</button> 
      <button onClick={remove}>Decrease value</button> 
    </>
  )
}

export default App

