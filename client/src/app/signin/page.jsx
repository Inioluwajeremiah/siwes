'use client'
import React, { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const [loadingSignin, setLoadingSignin] = useState(false)

   const signIn = () => {

    setLoadingSignin(true)

    fetch('http://127.0.0.1:5000/auth/login', {

        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    }).then(response => {
        if (!response.ok) {
            // throw new Error('Network response was not ok');
            throw new Error(response.json);
        }
        return response.json(); // Parse response as JSON
    }).then(data => {
        console.log('Data received:', data);
        setLoadingSignin(false)
        // Handle the response data
        if (data.success_message && data.role == "student" && rememberMe){
            alert("Login Successful")
            const cookie_data = JSON.stringify( {
                login: true,
                login_duration: 4,
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                email: data.email,
                startDate: data.startDate,
                endDate: data.endDate,
                role: data.role,
                gender: data.gender,
                matricNo: data.matricNo,
                department:data.department,
                course:data.course,
                level:data.level,
                ppa: data.ppa
           })

            window.location.href
            document.cookie  = `${cookie_data}, expiry`
            window.open('/student ', '_self')
        }
    })
    .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors here
    setLoadingSignin(false)
    });
   }
   
 return <>
    <Header/>
    <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
        <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Sign In</h1>
        <label htmlFor='email'>Email</label>
        <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='email' 
            placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Password' id='password' onChange={(e) => setPassword(e.target.value)}/>
        <div className='flex flex-row'>
            <label htmlFor="remember_me" className='mr-4'>Remember me</label>
            <input type="checkbox" id='remember_me' value={true} onChange={(e) => setRememberMe(e.target.value)}/>
        </div>
        <p className='my-4'>Not yet signed up? <Link href='/signup' className='italic underline text-blue-500'>Sign Up</Link> or <Link href='/verify-user' className='italic underline text-blue-500'>Verify user</Link></p>
        <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={signIn}>{loadingSignin ? 'Loading...':'Sign In'}</button>
    </main>
 </>
}

export default SignIn