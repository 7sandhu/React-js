import React from 'react'

function InputBox() {
  
    return (
   <div className='flex flex-col p-3 rounded-lg justify-around bg-white text-black w-[420px] h-28'>
    
        <div className='flex items-center justify-between gap-5'>
            <p>From |To</p>
            <p>Currency Type</p>
        </div>
        <div className='flex items-center justify-between gap-5'>
            <input type="number" value={0} />
            <select name="" id="">
                <option value="">
                    inr
                </option>
            </select>
        </div>

   </div>
  )
}

export default InputBox