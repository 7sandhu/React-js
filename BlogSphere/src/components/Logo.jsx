import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className={`flex items-center`} style={{width}}>
      <div className="flex items-center space-x-2">
        {/* Logo Icon */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
            />
          </svg>
        </div>
        {/* Logo Text */}
        <div className="text-xl font-bold text-gradient font-playfair">
          BlogSphere
        </div>
      </div>
    </div>
  )
}

export default Logo