import { useCallback, useEffect, useRef, useState } from "react"


function App() {

  const [password,setPassword]=useState("")
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [copied, setCopied] = useState(false);

  const myref=useRef(null)

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

  const copyToClipboard = useCallback(() => {
    myref.current?.select();
    myref.current?.setSelectionRange(0, 99999); // Select the password content
    window.navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          // Programmatically clear selection by focusing and blurring the input
          myref.current?.setSelectionRange(0, 0)
        }, 400);
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  }, [password]);




  return (
    <>
    <div className=" w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-violet-600">

      <div className="bg-gradient-to-r from-zinc-800 to-violet-600 p-5 rounded-lg flex flex-col gap-4 animate-slide-in ">

        <div className="flex justify-center items-center text-white font-mediumbold text-lg ">
            <p>Password Generator</p>
        </div>

        <div className="flex  overflow-hidden rounded-lg">


             <input type="text" ref={myref} value={password} readOnly className="w-96 rounded-l-lg h-8 text-orange-400 pl-2" />

   
            <button className="bg-blue-600 text-white h-8 rounded-r-lg w-14 hover:bg-blue-500 duration-100 outline-none " onClick={copyToClipboard}>
              <p className="text-[16px] font-semibold mb-1">{copied ? '✓' : 'copy'}</p>
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

    <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-220%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 1s ease-in-out;
        }
      `}</style>
    </>
  )
}

export default App
