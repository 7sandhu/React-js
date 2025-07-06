import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 md:col-start-2 flex flex-col items-center text-center">
            <div className="flex items-center mb-4 justify-center">
              <Logo width="180px" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A modern blogging platform where ideas come to life. Share your thoughts, 
              connect with readers, and build your digital presence.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm text-center">
            © {currentYear} BlogSphere. Built with ❤️ by Kartavya Sandhu
          </p>
          <p className="text-slate-400 text-sm mt-2 md:mt-0 text-center">
            Made with React, Tailwind CSS & Appwrite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer