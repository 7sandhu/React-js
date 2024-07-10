import { InputBox } from "./components"
function App() {


  return (
    <>
     <div className="flex justify-center items-center w-screen h-screen bg-myBg bg-cover">

      <div className="bg-white/30 backdrop-blur-sm relative top-52 text-white border-[1px] rounded-lg p-4 border-gray-200 flex flex-col gap-2 items-center justify-between w-[450px]">

        <div className="flex flex-col ">
          <InputBox className=" bg-orange-300"></InputBox>
          <button >
            swap
          </button>
          <InputBox className="] bg-orange-300"></InputBox>
        </div>

        <div>
          <button className="w-96 h-20">
            Convert USD to INR
          </button>
        </div>

      </div>

     </div>
    </>
  )
}

export default App
