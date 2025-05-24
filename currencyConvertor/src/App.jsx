import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  // State variables to manage selected currencies, amount, and converted amount
  const [from, setFrom] = useState("inr"); // Source currency
  const [to, setTo] = useState("usd"); // Target currency
  const [amount, setAmount] = useState(NaN); // Amount to convert
  const [convertedAmount, setConvertedAmount] = useState(NaN); // Converted amount
  const [swapped, setSwapped] = useState(false); // State for swap confirmation animation
  const [converted, setConverted] = useState(false); // State for conversion confirmation

  // Fetching currency information for the selected "from" currency
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo); // Available currency options

  // Swap the "from" and "to" currencies and their corresponding amounts
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);

    // Show temporary feedback for the swap action
    setSwapped(true);
    setTimeout(() => {
      setSwapped(false);
    }, 400);
  };

  // Perform the conversion and update the converted amount
  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2)); // Calculate converted amount
    setConverted(true); // Show temporary feedback for the conversion action
    setTimeout(() => {
      setConverted(false);
    }, 700);
  };

  return (
    <>
      {/* Main container with background and central alignment */}
      <div className="flex justify-center items-center w-screen h-screen bg-myBg bg-cover overflow-hidden">

        {/* Conversion box with a blurred background effect */}
        <div className="bg-white/30 backdrop-blur-sm relative top-48 text-white border-[1px] rounded-lg p-4 border-gray-200 flex flex-col gap-6 items-center justify-between w-[500px] animated-box">

          <div className="flex flex-col items-center gap-4">
            {/* Input box for the source currency */}
            <InputBox
              label="From"
              amount={amount}
              seletedCurrency={from}
              options={options}
              onAmountChange={(amount) => {
                setAmount(Number(amount));
                if (amount == 0) {
                  setAmount(NaN);
                }
              }}
              onCurrencyChange={(currency) => setFrom(currency)}
              placeholder="Enter amount"
              className="bg-orange-300"
            ></InputBox>

            {/* Swap button to exchange source and target currencies */}
            <button onClick={swap} className="bg-blue-500 w-16 rounded-md absolute top-[120px] h-[36px] flex justify-center items-center pb-1 hover:bg-blue-400 duration-200">
              <p>{swapped ? '✓' : 'swap'}</p>
            </button>

            {/* Input box for the target currency (disabled for user input) */}
            <InputBox
              label="To"
              amount={convertedAmount}
              seletedCurrency={to}
              options={options}
              onAmountChange={(amount) => setConvertedAmount(Number(amount))}
              onCurrencyChange={(currency) => setTo(currency)}
              placeholder="Converted Amount"
              disabled={true}
              className="bg-orange-300"
            ></InputBox>
          </div>

          {/* Convert button to perform the currency conversion */}
          <div>
            <button className="w-[450px] h-12 rounded-xl bg-blue-500 hover:bg-blue-400 duration-200" onClick={convert}>
              {converted ? 'CONVERTED ✓' : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
          </div>

        </div>

      </div>

      {/* Animation for the conversion box */}
      <style>
        {`
          @keyframes moveAndRotate {
            0% {
              transform: translate(-200%, -200%) rotate(0deg);
            }
            100% {
              transform: translate(0, 0) rotate(1080deg);
            }
          }

          .animated-box {
            animation: moveAndRotate 1s ease-in-out forwards;
          }
        `}
      </style>
    </>
  );
}

export default App;
