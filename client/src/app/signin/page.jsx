'use client'

import React, { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'
import {set_cookie} from '../helper_functions/Cookies'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const SignIn = () => {

    let user_details = useSelector((state) => state.cookie_slice.siwes_user_login); 
    
    if (user_details) {
        user_details = JSON.parse(user_details) ;
    }

    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const [loadingSignin, setLoadingSignin] = useState(false)
    const [role, setRole] = useState('')
    // const [url, setUrl] = useState('')

    console.log('role =>', role);

   const signIn = () => {

    setLoadingSignin(true)

    let url = "";

    if (role == 'admin') {
        // setUrl('http://127.0.0.1:5000/auth/admin/login')
        url = 'http://127.0.0.1:5000/auth/admin/login'
    }

    if (role == 'supervisor') {
        // setUrl('http://127.0.0.1:5000/auth/supervisor/login')
        url = 'http://127.0.0.1:5000/auth/supervisor/login'
    }

    if (role == 'student') {
        // setUrl('http://127.0.0.1:5000/auth/student/login')
        url = 'http://127.0.0.1:5000/auth/student/login'
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
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'rememberme':rememberMe
            })
        }).then(response => {
            /*
            if (!response.ok) {
                // throw new Error('Network response was not ok');
                throw new Error(response.json);
                
            } */
            
            return response.json(); // Parse response as JSON
        }).then(data => {
            console.log('Data received:', data);
            setLoadingSignin(false)
            // Handle the response data
            if (data.success_message == 'Login successful!'){
                
                let no_of_hours = 720  //expires 30 days

                if (rememberMe) {
                    no_of_hours = 2160  // expires 120 days
                }

                alert("Login Successful")
                const cookie_data = JSON.stringify( {
                    login: true,
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
                    ppa: data.ppa,
                    rememberedMe:rememberMe,
                    csrf_token: data.csrf_token
            })

                set_cookie(no_of_hours, "siwes_user_login", cookie_data, '/signin')

                if (data.role == "student") {
                    window.open('/student ', '_self')
                }

                if (data.role == "supervisor") {
                    window.open('/supervisor ', '_self')
                }
                if (data.role == "admin") {
                    window.open('/admin ', '_self')
                }
                // router.push('/student')
            } 

            if (data.error_message) {
                alert(data.error_message);
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
        window.open('/student', '_self')
    } else if (user_details && user_details.login == true && user_details.role == "supervisor") {
        window.open('/supervisor', '_self')
    } if (user_details && user_details.login == true && user_details.role == "damin") {
        window.open('/admin', '_self')
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
                            <option value="admin" className='w-[100%]'>Admin</option>
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
                <p className='my-4'>Not yet signed up? <Link href='/signup' className='italic underline text-blue-500'>Sign Up</Link> or <Link href='/verify-user' className='italic underline text-blue-500'>Verify user</Link></p>
                <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={signIn}>{loadingSignin ? 'Loading...':'Sign In'}</button>
            </main>
        </>
    }
}

export default SignIn