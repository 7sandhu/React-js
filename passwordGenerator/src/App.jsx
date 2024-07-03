import { useCallback, useEffect, useState } from "react"


function App() {

  const [password,setPassword]=useState("")
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)

  const generatePassword=useCallback(()=>{
    
    let pass=""
    let str='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'

    if(numAllowed){
      str +="1234567890"
    }

    if(charAllowed){
      str +="!@#$%^&*()_+"
    }

    for(let i=0; i<length;i++){
      let index=Math.floor(str.length*Math.random())
      pass +=str[index]
    }

    setPassword(pass)

  },[length,numAllowed,charAllowed])

  useEffect(generatePassword,[numAllowed,charAllowed,length])

  const copyToClipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])




  return (
    <>
    <div className="bg-black w-screen h-screen flex justify-center items-center">

      <div className="bg-gray-600 p-5 rounded-lg flex flex-col gap-3">

        <div className="flex justify-center items-center text-white font-mediumbold text-lg ">
            <p>Password Generator</p>
        </div>

        <div className="flex justify-center items-center">

            <input type="text" value={password} readOnly className="w-96 rounded-l-lg h-8 text-orange-400 pl-2" />
            <button className="bg-blue-500 text-white h-8 rounded-r-lg w-14 hover:bg-blue-400 duration-100 " onClick={copyToClipboard}>
              <p className="text-[16px] font-semibold mb-1">copy</p>
            </button>

        </div>

        <div className="flex gap-3 text-orange-400">
          <div className="flex gap-1">
            <input type="range" value={length} onChange={(e)=>{
              setLength(e.target.value)
            }} />
            <label htmlFor="">Length:{length}</label>
          </div>

          <div className="flex gap-1">
            <input type="checkbox" value={numAllowed} onChange={()=>{
              setNumAllowed(prev=>!prev)
            }}/>
            <label htmlFor="">Numbers</label>
          </div>

          <div className="flex gap-1">
            <input type="checkbox" value={charAllowed} onChange={()=>{
              setCharAllowed(prev=>!prev)
            }}/>
            <label htmlFor="">Characters</label> 
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default App
