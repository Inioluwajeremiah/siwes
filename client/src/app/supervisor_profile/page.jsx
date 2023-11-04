
"use client"

import { useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'
import { get_cookie } from '../helper_functions/Cookies'

const SignUpSupervisor = () => {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('')
    // const [role, setRole] = useState('')
    // const [password, setPassword] = useState('');
    // const [cpassword, setCpaasword] = useState('')
    const [salutation, setSalutation] = useState('')
    const [resendCodedialog, setResendCodeDialog] = useState(false)

    const [registerLoading, setRegisterLoading] = useState(false)
    const [resendcodeLoading, setResendLoading] = useState(false)
    const [resendRole, setResendRole] = useState('')


    const ResetForm = () => {
        setFirstName('')
    }

    const CompleteProfile = () => {
        
        if (!salutation) {
            alert("select appropriate salutation")
        }
        else if (!firstName) {
            alert('input first name')
        }
        else if(!middleName) {
            alert("input middle name")
        }else if (!lastName){
            alert("input lastname")
        // } else if (!email) {
        //     alert("input email")
        } else if (!gender) {
            alert ("select gender")
        } else if (!department) {
            alert ("input departmenet")
        // } else if (password.length < 8) {
        //     alert("password too short. Password must have minimum of 8 characters")
        // } 
        // else if (password !== cpassword) {
        //     alert("password does not match")
        }  else {
            setRegisterLoading(true)

            let user_details  = get_cookie('siwes_user_login')
            if (user_details) {
            user_details = JSON.parse(user_details) ;
            // console.log('jwt => ', user_details.jwt);
            }

            const body = {
                salutation: salutation,
                firstname: firstName,
                middlename: middleName,
                lastname: lastName,
                gender: gender, 
                department: department,
            }         
            // fetch('https://tallyme576.pythonanywhere.com/auth/supervisor/register', {
            // fetch('http://127.0.0.1:5000/supervisor_profile/', {
            fetch("https://siweslogbook.pythonanywhere.com/supervisor_profile/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user_details.jwt}`
                },
                body: JSON.stringify(body)
            }).then(response => {
            
                return response.json()
                
            }).then(data => {
                console.log('Data received:', data);
                // Handle the response data
                if (data.error) {
                    alert(data.error)
                    // setResendCodeDialog(true)
                    setRegisterLoading(false)
                }
                if (data.success) {
                    alert(data.success)
                    setRegisterLoading(false)
                }
                setRegisterLoading(false)
            })
            .catch(error => {
            console.error('Fetch error:', error);
            // Handle errors here
                setRegisterLoading(false)
            })
           
             
        }
    }

    // const ResendCode = (email) => {

    //     setResendLoading(true)

    //     fetch('https://tallyme576.pythonanywhere.com/auth/resend_code', {
    //         method: "POST",
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({email: email, resend_role: resendRole})
    //     })
    //     .then(response => {
                
    //         return response.json()
            
    //     }).then(data => {
    //         console.log('Data received:', data);
    //         // Handle the response data
    //         if (data.success_message) {
    //             window.open('/signin', '_self')
    //         }
    //         setResendLoading(false)
    //     })
    //     .catch(error => {
    //     console.error('Fetch error:', error);
    //     // Handle errors here
    //     setResendLoading(false)
    //     })
    // }
    

    return <>
        <Header/>
        <main role='form'
            className='container mx-auto my-28 w-[96%] md:max-w-[600px] border-[#f3f2f2] border-[1px] shadow-lg p-8'
            method='POST'>
            <div className='flex flex-row'>
                <h1 className=' w-full flex justify-end text-2xl text-center font-bold p-4 text-green-500'>Profile</h1>
                <div className='w-full flex justify-end'>
                    <select name="salutation" id="salutation"
                        className='my-4 p-2 outline-none border justify-end'
                        onChange={(e) => setSalutation(e.target.value)}
                    >
                        <option value="">Select salutation</option>
                        <option value="mr" className='w-[100%]'>Mr</option>
                        <option value="dr" className='w-[100%]'>Dr</option>
                        <option value="prof" className='w-[100%]'>Prof.</option>
                    </select>
                </div>  
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' 
                        type='text' placeholder='First Name' id='firstname' name='firstname'
                        onChange={(fn) => setFirstName(fn.target.value)} required/>
                    <label htmlFor='middlename'>Middle Name</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Middle Name' id='middlename' name='middlename' onChange={(mn) => setMiddleName(mn.target.value)} required
                    />
                    <label htmlFor='lastname'>Last Name</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' 
                        type='text' placeholder='Last Name' id='lastname' name='lastname' 
                        onChange={(ln) => setLastName(ln.target.value)}
                        required
                    />
                    
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='department'>Department</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Department' id='department' name='department' onChange={(dept) => setDepartment(dept.target.value)}
                        required
                    />
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="gender">Gender</label>
                            <select aria-label='select gender' id='gender' 
                                className='my-2 outline-none hover:cursor-pointer border-[1px] border-[#ddd] p-2'
                                onChange={(e) => setGender(e.target.value)} name='gender' required>
                                <option value="" className='italoc'>Select Gender</option>
                                <option value="male">Male</option>  
                                <option value="female">Female</option> 
                            </select>
                        </div>
                    </div>
                   
                </div>
            </div>
        
            <button className='mt-10 px-4 py-2 mx-auto text-white bg-green-500 items-center flex flex-row justify-center rounded-md' onClick={CompleteProfile}>{registerLoading ? 'Loading...' : 'Submit'}</button>
            {/* <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' type='submit'>Sign Up</button> */}
           
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
                            <option value="admin">Admin</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="student">Student</option>
                        </select>
                    </div> 
                </div>  
                    <p className='mb-4 text-center'>User already exists but not verified, resend code to <b>{email}</b> </p>
                    <div className='flex flex-row justify-around'>
                        <button className=' bg-orange-600 p-2 rounded text-white' onClick={() => setResendCodeDialog(false)}>Cancel</button>
                        <button  className=' bg-green-600 p-2 rounded text-white' onClick={() => ResendCode(email)}>{resendcodeLoading ? 'Loading..' : 'Resend'}</button>
                    </div>
                </div>
            </div>
            : ""
        }
    </>
}

export default SignUpSupervisor