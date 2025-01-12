import React from 'react'

function InputBox({
    label,
    amount,
    options=[],
    seletedCurrency="inr",
    onAmountChange,
    onCurrencyChange,
}) {
  
    return (
   <div className='flex flex-col p-3 rounded-lg justify-around bg-white text-black w-[450px] h-28'>
    
        <div className='flex items-center justify-between gap-5'>
            <p>{label}</p>
            <p>Currency Type</p>
        </div>
        <div className='flex items-center justify-between gap-5'>
            <input type="number" value={amount} onChange={(e)=>{
                onAmountChange(Number(e.target.value))
            }} />
            <select name="" id="" value={seletedCurrency} onChange={(e)=>{
                onCurrencyChange(e.target.value)
            }}>

            {options.map(curr=>(
                            <option key={curr} value={curr}>
                                {curr}
                            </option>
            ))}

            </select>
        </div>

   </div>
  )
}

export default InputBox