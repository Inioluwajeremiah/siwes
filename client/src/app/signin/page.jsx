'use client'

import React, { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'
import {get_cookie, set_cookie} from '../helper_functions/Cookies'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const SignIn = () => {

    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const [loadingSignin, setLoadingSignin] = useState(false)
    const [role, setRole] = useState('')
    // const [url, setUrl] = useState('')

     // let user_details = useSelector((state) => state.cookie_slice.siwes_user_login); 
     let user_details  = get_cookie('siwes_user_login')
    
     if (user_details) {
         user_details = JSON.parse(user_details) ;
     }

    console.log('role =>', role);

    // sign in function
   const signIn = () => {

    setLoadingSignin(true)

    let url = "";

    if (role == 'admin') {
        url = 'http://127.0.0.1:5000/auth/admin/login'
        // url = 'https://tallyme576.pythonanywhere.com/auth/admin/login'
    }

    if (role == 'supervisor') {
        url = 'http://127.0.0.1:5000/auth/supervisor/login'
        // url = 'https://tallyme576.pythonanywhere.com/auth/supervisor/login'
    }

    if (role == 'student') {
        url = 'http://127.0.0.1:5000/login/'
        // url = 'https://tallyme576.pythonanywhere.com/auth/student/login'
    }

    console.log('url => ', url);

    if (!role) {
        alert("Select role")
        setLoadingSignin(false)
    } else if (!email) {
        alert("input email")
        setLoadingSignin(false)
    } else if (!password) {
        alert ("input password")
        setLoadingSignin(false)
    } else {

        fetch(`${url}`, {

            method: "POST",
            credentials: 'include',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'rememberme':rememberMe
            })
        }).then(response => response.json()).then(data => {
            console.log('Data received:', data);
            // Handle the response data
            if (data.success){
                let no_of_hours = 720  //expires 30 days

                if (rememberMe) {
                    no_of_hours = 2160  // expires 120 days
                };
                const cookie_data = JSON.stringify( {
                    login: true,
                    email: email,
                    role: role
                });
                alert("Login Successful")
              
                set_cookie(no_of_hours, "siwes_user_login", cookie_data, '/')

                if (role == "student") {
                    router.push('/student')
                }

                if (role == "supervisor") {
                    router.push('/supervisor')
                }
                setLoadingSignin(false)
            } //ends data.success

            if (data.error) {
                alert(data.error);
                setLoadingSignin(false)
            }
        })
        .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
        setLoadingSignin(false)
        });
    }
   }

    if (user_details && user_details.login == true && user_details.role == "student") {
        router.push('/student')
    } else if (user_details && user_details.login == true && user_details.role == "supervisor") {
        router.push('/supervisor')
    } if (user_details && user_details.login == true && user_details.role == "damin") {
        router.push('/admin')
    } else {
        return <>
            <Header/>
            <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
                <div className='flex flex-row'>
                    <h1 className=' w-full flex justify-end text-2xl text-center font-bold p-4 text-blue-500'>Sign In</h1>
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
                <div className='flex flex-row'>
                    <label htmlFor="remember_me" className='mr-4'>Remember me</label>
                    <input type="checkbox" id='remember_me' value={true} onChange={(e) => setRememberMe(e.target.value)}/>
                </div>
                <p className='my-4'>Not yet signed up? 
                    <Link href={ role == "supervisor" ? "/supervisor_signup" : role == "student" ? "/student_signup": "/student_signup"} 
                    className='italic underline text-blue-500'>Sign Up</Link>
                     or <Link href='/verify-user' className='italic underline text-blue-500'>Verify user</Link></p>
                <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={signIn}>{loadingSignin ? 'Loading...':'Sign In'}</button>
            </main>
        </>
    }
}

export default SignIn