import { useEffect, useState } from "react"
import { InputBox } from "./components"
import useCurrencyInfo from "./hooks/useCurrencyInfo";





function App() {

  const [from,setFrom]=useState("inr");
  const [to,setTo]=useState("usd");
  const [amount, setAmount]=useState(0);
  const [convertedAmount, setConvertedAmount]=useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }





  return (
    <>
     <div className="flex justify-center items-center w-screen h-screen bg-myBg bg-cover">

      <div className="bg-white/30 backdrop-blur-sm relative top-52 text-white border-[1px] rounded-lg p-4 border-gray-200 flex flex-col gap-6 items-center justify-between w-[500px]">

        <div className="flex flex-col items-center gap-4 ">
          <InputBox
          label="from"
          amount={amount}
          seletedCurrency={from}
          options={options}
          onAmountChange={amount => setAmount(Number(amount))}
          onCurrencyChange={currency => setFrom(currency)}

          className=" bg-orange-300"></InputBox>
          <button onClick={swap} className=" bg-blue-500 w-16 rounded-md absolute top-[120px] h-[36px] flex justify-center items-center pb-1">
            <p>swap</p>
          </button>
          <InputBox
          label="to"
          amount={convertedAmount}
          seletedCurrency={to}
          options={options}
          onAmountChange={amount => setConvertedAmount(Number(amount))}
          onCurrencyChange={currency => setTo(currency)}
          
          className=" bg-orange-300"></InputBox>
        </div>

        <div>
          <button className="w-[450px] h-12 rounded-xl bg-blue-500" onClick={convert}>
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </div>

      </div>

     </div>
    </>
  )
}

export default App



// api link https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json