'use client'

import React, { useState } from 'react'
import Header from '../components/header'
import { useRouter } from 'next/navigation'

const SignUp = () => {

    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState('')
    // const [url, setUrl] = useState('')

    // sign in function
   const Register = () => {

    setLoading(true)

    if (!role) {
        alert("Select role")
        setLoading(false)
    } else if (!email) {
        alert("input email")
        setLoading(false)
    } else if (!password) {
        alert ("input password")
        setLoading(false)
    } else {

        // fetch(`${url}`, {
        // fetch("http://127.0.0.1:5000/register/", {
        fetch('https://siweslogbook.pythonanywhere.com/register/', {

            method: "POST",
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'role':role
            })
        }).then(response => response.json()).then(data => {
            // Handle the response data
            if (data.success){
                alert(data.success)
                router.push('/signin')
                setLoading(false)
            } //ends data.success

            if (data.error) {
                alert(data.error);
                setLoading(false)
            }
            setLoading(false)
        })
        .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
        setLoading(false)
        });
    }
   }
        return <>
            <Header/>
            <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
                <div className='flex flex-row'>
                    <h1 className=' w-full flex justify-end text-2xl text-center font-bold p-4 text-blue-500'>Register</h1>
                    <div className='w-full flex justify-end'>
                        <select name="role" id="role"
                            className='my-4 p-2 outline-none border justify-end'
                            onChange={(e) => setRole(e.target.value)}
                        >   
                            <option value="">Select role</option>
                            <option value="student" className='w-[100%]'>Student</option>
                            <option value="supervisor" className='w-[100%]'>Supervisor</option>
                            {/* <option value="admin" className='w-[100%]'>Admin</option> */}
                        </select>
                    </div>  
                </div>
                <label htmlFor='email'>Email</label>
                <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='email' 
                    placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Password' id='password' onChange={(e) => setPassword(e.target.value)}/>
        
                <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={Register}>{loading ? 'Loading...':'Register'}</button>
            </main>
        </>
}

export default SignUp