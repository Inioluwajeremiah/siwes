'use client'
import { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'

const VerifyUser = () => {

    const [email, setEmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [role, setRole] = useState('')
    const [resendCodedialog, setResendCodeDialog] = useState(false)

    const [verifyLoading, setVerifyLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendRole, setResendRole] = useState('')

    // verify user function
    const verifyUser = () =>{
        setVerifyLoading(true)

        if (!role) {
            alert("Select role")
            setVerifyLoading(false)
        }else if (!email) {
            alert("Input email")
            setVerifyLoading(false)
        } else if (!authCode) {
            alert("Input authentication code")
            setVerifyLoading(false)
        } else {
            const body = {
                email:email,
                code:authCode,
                role: role
            }
            console.log(email, authCode, role);
            
            fetch('https://tallyme576.pythonanywhere.com/auth/verify-user', {

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
                    alert("token has expired")
                    setResendCodeDialog(true)
                    setVerifyLoading(false)
                }
                if (data.error_message == 'User already verified, you can proceed to login') {
                   alert(data.error_message)
                    window.open('/signin', '_self')
                }
                if (data.success_message) {
                    alert(data.success_message)
                    window.open('/signin', '_self')
                }
                if (data.error_message) {
                    alert(data.error_message)
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

        fetch('https://tallyme576.pythonanywhere.com/auth/resend_code', {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, resend_role: resendRole})
        })
        .then(response => {
                
            return response.json()
            
        }).then(data => {
            console.log('Data received:', data);
            // Handle the response data
            if (data.success_message) {
                alert(data.success_message)  
            }
            if (data.error_message) {
                alert(data.error_message)  
            }
            setResendLoading(false)

           
        })
        .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
        setResendLoading(false)
        })
    }

  return (
    <>
         <Header/>
        <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
            <div className='flex flex-row'>
                <h1 className=' w-full flex justify-end text-2xl text-center font-bold p-4 text-blue-500'>Verify User</h1>
                <div className='w-full flex justify-end'>
                    <select name="role" id="role"
                        className='my-4 p-2 outline-none border justify-end'
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" className='w-[100%]'>Select Role</option>
                        <option value="student" className='w-[100%]'>Student</option>
                        <option value="supervisor" className='w-[100%]'>Supervisor</option>
                       
                    </select>
                </div>  
            </div>
            {/* <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Verify User</h1> */}
            <label htmlFor='email'>Email</label>
            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='email' 
                placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="auth_code">Authentication Code</label>
            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                placeholder='Authentication code' id='auth_code' onChange={(e) => setAuthCode(e.target.value)}
            />

            <div className="flex flex-row gap-2 flex-wrap">
                <p className='my-2'>Not yet signed up? &nbsp;
                    <Link href={role == "student" ? '/student_signup' : role == "supervisor" ? '/supervisor_signup' :  '/student_signup'}
                        className='text-white bg-blue-500 rounded p-2 my-4'>Sign Up
                    </Link>  
                </p>
                <p className='my-2'>Already signed up? &nbsp;<Link href='/signin' className='text-white bg-blue-500 rounded p-2 my-4'>Sign In</Link></p>
            </div>
           
            <button 
                className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' 
                onClick={verifyUser}>{verifyLoading ? 'loading...' : 'Verify'}
            </button>
        </main>

        {
            resendCodedialog ? 
            <div role="dialog" aria-modal="true" aria-labelledby="modalTitle" className='fixed top-20 left-0 w-full h-full bg-[#afadf608]'>
                <div className=' p-4 rounded mt-36 bg-white mx-auto my-20 w-[80%] max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg '>
                <div className='flex flex-row'>
                    <h2 className='w-full flex justify-end text-center font-bold p-4 text-blue-500' id='modalTitle'>Resend Code</h2>
                    <div className='w-full flex flex-col justify-end'>
                        <select name="resend_role" id="resend_role" 
                            className='my-4 p-2 outline-none border justify-end' 
                            onClick={(e) => setResendRole(e.target.value)}>
                            <option value="">Role</option>     
                            <option value="">Select Role</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="student">Student</option>
                        </select>
                    </div> 
                </div> 
                    <p className='mb-4 text-center'>User already registered, Resend code to <b>{email}</b> </p>
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