import React from 'react'
import {Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-2 text-sm font-medium text-gray-700'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    rules={{
        required: "Content is required",
        minLength: { value: 50, message: "Content must be at least 50 characters long" }
    }}
    render={({field: {onChange, value}, fieldState: {error}}) => (
        <div>
            <div className="relative">
                <textarea
                    value={value || defaultValue}
                    onChange={onChange}
                    placeholder="Write your blog content here... Tell your story, share your insights, or explore new ideas."
                    className={`
                        w-full h-80 p-4 
                        border border-gray-300 
                        rounded-lg 
                        bg-white 
                        text-gray-900
                        placeholder-gray-500
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        focus:border-blue-500
                        transition-all duration-200
                        resize-vertical
                        ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                    `}
                    rows={12}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {value ? value.length : 0} characters
                </div>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error.message}
                </p>
            )}
            <div className="mt-2 text-sm text-gray-500">
                <p className="mb-1">💡 <strong>Writing Tips:</strong></p>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Use headings to organize your content</li>
                    <li>• Keep paragraphs short for better readability</li>
                    <li>• Add personal insights and examples</li>
                </ul>
            </div>
        </div>
    )}
    />

     </div>
  )
}