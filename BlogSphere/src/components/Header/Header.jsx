import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link to='/' className='transition-transform hover:scale-105'>
              <Logo width='180px' />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className='flex items-center space-x-1'>
            {navItems.map((item) => 
              item.active ? (
                <Link
                  key={item.name}
                  to={item.slug}
                  className='px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200'
                >
                  {item.name}
                </Link>
              ) : null
            )}
            
            {/* User Section */}
            {authStatus && (
              <div className='flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200'>
                {userData && (
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                      {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className='text-sm font-medium text-gray-700 hidden md:block'>
                      {userData.name || 'User'}
                    </span>
                  </div>
                )}
                <LogoutBtn />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header