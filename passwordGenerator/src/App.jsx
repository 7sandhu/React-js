import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  // State variables
  const [password, setPassword] = useState(""); // Holds the generated password
  const [length, setLength] = useState(8); // Password length
  const [numAllowed, setNumAllowed] = useState(false); // Flag to include numbers
  const [charAllowed, setCharAllowed] = useState(false); // Flag to include special characters
  const [copied, setCopied] = useState(false); // Flag to indicate if password is copied

  const myref = useRef(null); // Reference for the input field

  // Function to generate password
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    if (numAllowed) {
      str += "1234567890"; // Add numbers to the character set
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+"; // Add special characters to the character set
    }

    for (let i = 0; i < length; i++) {
      let index = Math.floor(str.length * Math.random());
      pass += str[index]; // Generate password by randomly picking characters
    }

    setPassword(pass); // Update the password state
  }, [length, numAllowed, charAllowed]);

  // Effect to generate password on dependency change
  useEffect(generatePassword, [numAllowed, charAllowed, length]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    myref.current?.select();
    myref.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
    setCopied(true); // Indicate password copied
    setTimeout(() => {
      setCopied(false);
      myref.current?.setSelectionRange(0, 0);
    }, 400);
  }, [password]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="bg-gradient-to-r from-zinc-800 to-violet-600 p-5 rounded-lg flex flex-col gap-4 animate-slide-in">
          <div className="flex justify-center items-center text-white font-mediumbold text-xl font-serif">
            <p>Password Generator</p>
          </div>

          <div className="flex overflow-hidden rounded-lg">
            <input type="text" ref={myref} value={password} readOnly className="w-96 rounded-l-lg h-8 text-orange-400 pl-2" />
            <button className="bg-blue-600 text-white h-8 rounded-r-lg w-14 hover:bg-blue-500 duration-100 outline-none" onClick={copyToClipboard}>
              <p className="text-[16px] font-semibold mb-1">{copied ? '✓' : 'copy'}</p>
            </button>
          </div>

          <div className="flex gap-3 text-orange-400">
            <div className="flex gap-1">
              <input type="range" id="len" value={length} onChange={(e) => {
                setLength(e.target.value);
              }} />
              <label htmlFor="len">Length:{length}</label>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="num" value={numAllowed} onChange={() => {
                setNumAllowed(prev => !prev);
              }} />
              <label htmlFor="num">Numbers</label>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="char" value={charAllowed} onChange={() => {
                setCharAllowed(prev => !prev);
              }} />
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
  );
}

export default App;
