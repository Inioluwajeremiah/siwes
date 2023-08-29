'use client'
import { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'

const VerifyUser = () => {

    const [email, setEmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [resendCodedialog, setResendCodeDialog] = useState(false)

    const [verifyLoading, setVerifyLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)

    // verify user function
    const verifyUser = () =>{

        if (!email) {
            alert("Input email")
        } else if (!authCode) {
            alert("Input authentication code")
        } else {

            const body = {
                email:email,
                code:authCode
            }
            console.log(email, authCode);
            setVerifyLoading(true)
            
            fetch('http://127.0.0.1:5000/auth/verify-user', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }). then(response => {
                return response.json()
            }).then(data => {
                console.log("data:", data);
                if (data.error_message == `token has expired`) {
                    setResendCodeDialog(true)
                }
                setVerifyLoading(false)
            }).catch(error => {
                console.error("error:", error);
                setVerifyLoading(false)
            })
        }

    }

    // resend code function

    const ResendCode = (email) => {

        setResendLoading(true)

        fetch('http://127.0.0.1:5000/auth/resend_code', {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then(response => {
                
            return response.json()
            
        }).then(data => {
            console.log('Data received:', data);
            // Handle the response data
        })
        .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
        })
    }

  return (
    <>
         <Header/>
        <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
            <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Verify User</h1>
            <label htmlFor='email'>Email</label>
            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='email' 
                placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="auth_code">Authentication Code</label>
            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                placeholder='Authentication code' id='auth_code' onChange={(e) => setAuthCode(e.target.value)}
            />

            <p className='my-4'>Not yet signed up? <Link href='/signup' className='text-white bg-blue-500 rounded p-2'>Sign Up</Link>  Already signed up? <Link href='/signin' className='text-white bg-blue-500 rounded p-2'>Sign In</Link></p>
            <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={verifyUser}>{verifyLoading ? 'loading...' : 'Verify'}</button>
        </main>

        {
            resendCodedialog ? 
            <div role="dialog" aria-modal="true" aria-labelledby="modalTitle" className='fixed top-20 left-0 w-full h-full bg-[#afadf608]'>
                <div className=' p-4 rounded mt-36 bg-white mx-auto my-20 w-[80%] max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg '>
                    <h2 className='text-center p-2' id='modalTitle'>Resend Code</h2>
                    <p className='mb-4 text-center'>Resend code to <b>{email}</b> </p>
                    <div className='flex flex-row justify-around'>
                        <button className=' bg-orange-600 p-2 rounded text-white' onClick={() => setResendCodeDialog(false)}>Cancel</button>
                        <button  className=' bg-green-600 p-2 rounded text-white' onClick={() => ResendCode(email)}>{resendLoading ? 'Loading...' : 'Resend'}</button>
                    </div>
                </div>
            </div>
            : ""
        }
    </>
  )
}

export default VerifyUser