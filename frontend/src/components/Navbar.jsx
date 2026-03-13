import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between h-12 items-center px-4'>
        <div className="logo font-bold">KeyNova</div>
        <ul>
            <li className='flex gap-3'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
      
    </nav>
  )
}

export default Navbar
