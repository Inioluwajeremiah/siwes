'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {

  let [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen) 
  }

  const logout = () => {
    fetch('', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },

    })
  }
  return <>
      <header className='w-full container mx-auto top-0 left-0 right-0 h-20 fixed bg-white flex flex-row justify-between px-10 p-3 items-center shadow'>
        <h1 className=' text-blue-500 font-black text-2xl'>Siwes<span className='text-black font-black text-2xl'>.</span></h1>
        <nav aria-label='Main navigation' 
          className={`absolute top-20 shadow-md w-[50%] h-[90vh] bg-white px-8 py-14 
            md:p-0 md:h-fit text-black md:w-fit md:shadow-none md:text-black  
            md:relative md:top-0 md:right-0 transition-all duration-500 ease-in 
            ${isOpen ? 'right-0' : '-right-[50%]'}`}>
          <ul className={`flex flex-col md:flex-row justify-between h-full md:h-fit items-center md:items-start`}>
            <li className=' pr-4 hover:underline hover:text-blue-500 active:text-blue-500'><Link href="/student">Student</Link></li>
            <li className=' pr-4 hover:underline hover:text-blue-500'><Link href="/supervisor">Supervisor</Link></li>
            <li className=' pr-4 hover:underline hover:text-blue-500'><Link href="/admin">Admin</Link></li>
            <li className=' pr-4 hover:underline hover:text-blue-500'><Link href="/signup">Sign Up</Link></li>
            <li className='pr-4 hover:underline hover:text-blue-500'><Link href="/signin">Sign In</Link></li>
            <button className='hover:underline hover:text-red-500'>Log Out</button>
          </ul>
        </nav>
        <button onClick={toggleMenu} className='md:hidden'>{ isOpen ? <AiOutlineClose/> : <AiOutlineMenu/>}</button>
      </header>
   </>

}

export default Header