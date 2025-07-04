import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    error,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && (
            <label 
                htmlFor={id} 
                className='inline-block mb-2 text-sm font-medium text-gray-700'
            >
                {label}
            </label>
        )}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`
            w-full px-3 py-3 
            border border-gray-300 
            rounded-lg 
            bg-white 
            text-gray-900
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
        `}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
        </select>
        {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
            </p>
        )}
    </div>
  )
}

export default React.forwardRef(Select)