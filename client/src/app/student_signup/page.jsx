"use client"

import { use, useState } from 'react'
import Header from '../components/header'
import Link from 'next/link'

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [gender, setGender] = useState('');
    const [matricNo, setMatricNo] = useState('')
    const [department, setDepartment] = useState('')
    const [course, setCourse]  = useState('')
    const [level, setLevel] = useState('')
    const [role, setRole] = useState('')
    const [ppa, setPpa] = useState('')
    const [password, setPassword] = useState('');
    const [cpassword, setCpaasword] = useState('')
    const [resendCodedialog, setResendCodeDialog] = useState(false)
    const [supervisorName, setSupervisorName] = useState('')

    const [registerLoading, setRegisterLoading] = useState(false)
    const [resendcodeLoading, setResendLoading] = useState(false)


    const ResetForm = () => {
        setFirstName('')
    }

    const Register = () => {
        
        if (!firstName) {
            alert('input first name')
        }
        else if(!middleName) {
            alert("input middle name")
        }else if (!lastName){
            alert("input lastname")
        } else if (!matricNo) {
            alert ("input matriculation number")
        } else if (!email) {
            alert("input email")
        } else if (!startDate) {
            alert("input start date")
        } else if (!endDate) {
            alert ("input end date")
        } else if (!supervisorName) {
            alert("Input supervisor\'s full name")
        }
        else if (!gender) {
            alert ("select gender")
        } else if (!department) {
            alert ("input departmenet")
        } else if (!course) {
            alert ("input course")
        } else if (!level) {
            alert("select level")
        } else if (!ppa) {
            alert("input place of attachment")
        } else if (password.length < 8) {
            alert("password too short. Password must have minimum of 8 characters")
        } 
        else if (password !== cpassword) {
            alert("password does not match")
        }  else {
            setRegisterLoading(true)
            const body = {
                firstname: firstName,
                middlename: middleName,
                lastname: lastName,
                email: email,
                startdate: startDate,
                enddate: endDate, 
                supervisoname: supervisorName,  
                gender: gender, 
                matricno: matricNo,
                department: department,
                course: course,
                level: level,
                ppa: ppa,
                password: password,
                role: role  
                }         
            fetch('http://127.0.0.1:5000/auth/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(response => {
            
                return response.json()
                
            }).then(data => {
                console.log('Data received:', data);
                // Handle the response data
                if (data.error_message == `${email} registered but not verified` || data.error_message == `${matricNo} registered but not verified` ) {
                    setResendCodeDialog(true)
                }
                setRegisterLoading(false)
            })
            .catch(error => {
            console.error('Fetch error:', error);
            // Handle errors here
                setRegisterLoading(false)
            })
             console.log(body);
             
        }
    }

    const ResendCode = (email) => {
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
            setResendLoading(false)
        })
        .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors here
        setResendLoading(false)
        })
    }
    

    return <>
        <Header/>
        <main role='form'
            className='container mx-auto my-28 w-[96%] md:max-w-[600px] border-[#f3f2f2] border-[1px] shadow-lg p-8'
            method='POST'>
            <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Sign up</h1>
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
                    <label htmlFor='matricno'>Matric. Number</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Matric. Number' 
                        id='matricno' name='matricno' onChange={(mat) => setMatricNo(mat.target.value)} required/>
                    <label htmlFor='email'>Email</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Email' id='email' name='email'
                        onChange={(eml)=> setEmail(eml.target.value)}
                        required
                    />
                     {/* duration */}
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <label htmlFor='startdate'>Start date</label> 
                            <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' 
                                id='startdate' name='startdate' onChange={(sd) => setStartDate(sd.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='enddate'>End date</label> 
                            <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' 
                                id='enddate' name='enddate' onChange={(ed) => setEndDate(ed.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <label htmlFor='supervisor_name'>Supervisor&apos;s Name</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Firstname Middlename Lastname' id='supervisor_name' name='supervisor_name' onChange={(mn) => setSupervisorName(mn.target.value)} required
                    />
                </div>


                <div className='flex flex-col'>
                    <label htmlFor="gender">Gender</label>
                    <select aria-label='select gender' id='gender' 
                        className='my-2 outline-none hover:cursor-pointer border-[1px] border-[#ddd] p-2'
                        onChange={(e) => setGender(e.target.value)} name='gender' required>
                        <option value="" className='italoc'>Select Gender</option>
                        <option value="male">Male</option>  
                        <option value="female">Female</option> 
                    </select>
                    <label htmlFor='department'>Department</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Department' id='department' name='department' onChange={(dept) => setDepartment(dept.target.value)}
                        required
                        />
                    <label htmlFor='course'>Course</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Course' id='course' name='course' onChange={(e) => setCourse(e.target.value)}
                        required
                        />
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="level">Level</label>
                            <select aria-label='select level' id='level' 
                                className='my-2 outline-none hover:cursor-pointer border-[1px] border-[#ddd] px-1 py-2'
                                onChange={(e) => setLevel(e.target.value)} name='level' required>
                                <option value="" defaultValue={""} className=' italic'>Select Level</option>
                                <option value="100">100</option>  
                                <option value="200">200</option> 
                                <option value="300">300</option>  
                                <option value="400">400</option> 
                                <option value="500">500</option>  
                                <option value="600">600</option> 
                            </select>
                        </div>
                        <div className='flex flex-col'>
                        </div>
                    </div>
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" 
                        className='my-2 outline-none hover:cursor-pointer border-[1px] border-[#ddd] px-1 py-2' 
                        onClick={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="supervisor">Supervisoor</option>
                        <option value="student">Student</option>
                    </select>
                    <label htmlFor='ppa'>Place of Attachment</label>
                    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                        placeholder='Place of Attachment' id='ppa' name='ppa' onChange={(ppa) => setPpa(ppa.target.value)} required/>
                     {/* password */}
                    <div className='flex flex-col  justify-around'>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Password' 
                                id='password' onChange={(pwd) => setPassword(pwd.target.value)} name='password' required minLength={8} maxLength={20}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="cpassword">Confirm password</label>
                            <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' 
                                placeholder='Confirm password' id='cpassword' name='cpassword' onChange={(cpwd) => setCpaasword(cpwd.target.value)}
                                required
                                />
                        </div>        
                    </div>
                </div>
            </div>
            <p className='my-2'>Already signed up? <Link rel="stylesheet" href="/signin" className='text-white bg-blue-500 rounded p-2'>Sign In </Link></p>
            <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={Register}>{registerLoading ? 'Loading...' : 'Sign Up'}</button>
            {/* <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' type='submit'>Sign Up</button> */}
           
        </main>

        {
            resendCodedialog ? 
            <div role="dialog" aria-modal="true" aria-labelledby="modalTitle" className='fixed top-20 left-0 w-full h-full bg-[#afadf608]'>
                <div className=' p-4 rounded mt-36 bg-white mx-auto my-20 w-[80%] max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg '>
                    <h2 className='text-center p-2' id='modalTitle'>Resend Code</h2>
                    <p className='mb-4 text-center'>Resend code to <b>{email}</b> </p>
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

export default SignUp