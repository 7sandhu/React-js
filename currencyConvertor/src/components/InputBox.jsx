import React from 'react';

function InputBox({
    label, // Label for the input box (e.g., "From" or "To")
    amount, // Current amount to be displayed in the input box
    options = [], // Array of available currency options for the dropdown
    seletedCurrency = "inr", // Selected currency for the dropdown
    onAmountChange, // Callback for when the amount input changes
    onCurrencyChange, // Callback for when the selected currency changes
    placeholder = "", // Placeholder text for the input field
    disabled = false // Whether the input field is read-only
}) {
    return (
        <div className='flex flex-col p-3 rounded-lg justify-around bg-white text-black w-[450px] h-28'>
            {/* Label and Currency Type Header */}
            <div className='flex items-center justify-between gap-5'>
                <p>{label}</p>
                <p>Currency Type</p>
            </div>

            {/* Input Field and Dropdown */}
            <div className='flex items-center justify-between gap-5'>
                <input
                    type="number"
                    readOnly={disabled} // Disable input if the "disabled" prop is true
                    placeholder={placeholder} // Display placeholder text
                    min={0} // Minimum value for the input
                    value={amount} // Current value of the input
                    onChange={(e) => {
                        onAmountChange(Number(e.target.value)); // Trigger callback with the new value
                    }}
                />

                <select
                    name="currency"
                    id="currency"
                    value={seletedCurrency} // Current selected currency
                    onChange={(e) => {
                        onCurrencyChange(e.target.value); // Trigger callback with the new selected currency
                    }}
                >
                    {/* Render currency options in the dropdown */}
                    {options.map((curr) => (
                        <option key={curr} value={curr}>
                            {curr}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
