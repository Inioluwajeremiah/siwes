'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { useRouter } from 'next/navigation';
import { get_cookie } from '../helper_functions/Cookies';

const AddDailyActivity = () => {

  const [weekNo, setWeekNo] = useState(1)
  const [date, setDate] = useState('')
  const [description,  setDescription] = useState('')


  const addDailyActivity = () => {

    const body = {
      weekno: weekNo,
      date:date,
      description:description
    }
    fetch('https://tallyme576.pythonanywhere.com/student/add-daily-activity', {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).
    then(result => console.log('result => ', result)).
    catch(error => console.log('error => ', error))
  }

  return <section className='transition-all duration-500 ease-in md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col' aria-label="Main Content" role="region">
    <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Add Daily Activity</h1>
    <label htmlFor='weekno'>Week Number</label> 
    <input className="p-2 bg-[#ccc] rounded-sm my-2" type='number' id='weekno' onChange={(e) => setWeekNo(e.target.value)}/>
    <label htmlFor='date'>Select date</label> 
    <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' id='date' onChange={(e) => setDate(e.target.value)}/>
    <label htmlFor="activity">Activity Description</label>
    <textarea name="activity" id="activity" cols="30" rows="10" className="p-2 bg-[#ccc] rounded-sm my-2" onChange={(e) => setDescription(e.target.value)}></textarea>
    <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={addDailyActivity}>Add Activity</button>
  </section>
}

const AddWeeklyActivity = () => {
  return <section className='md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col' aria-label="Main Content" role="region">
    <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Add Weekly Activity</h1>
    <label htmlFor='startdate'>Select date</label> 
    <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' id='startdate'/>
    <label htmlFor='job'>Job for the week</label>
    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Job for the week' id='job'/>
    <label htmlFor='department'>Department Attached</label>
    <input className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' type='text' placeholder='Department Attached' id='department'/>
    <label htmlFor="comment">Comment</label>
    <textarea name="comment" id="comment" cols="30" rows="10" className="p-2 bg-[#ccc] rounded-sm my-2"></textarea>
    <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md'>Sign In</button>
  </section>
}

const DailyActivityTable = () => {
  return  <section className='' aria-label="Main Content" role="region">
    <div>
      <input type="text" name="" id="" aria-label='search' />
      <select name="filter" aria-label='filter by date' id="">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>Date</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01/01/01</td>
          <td>my activity</td>
        </tr>
      </tbody>
    </table>
  </section>
}

const WeeklyActivityTable = () => {
  return  <section className='' aria-label="Main Content" role="region">
    <div>
      <input type="text" name="" id="" aria-label='search' />
      <select name="filter" aria-label='filter by date' id="">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>Date</th>
          <th>Job for the Week</th>
          <th>Department Attached</th>
          <th>Student Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>01/01/01</td>
          <td>Analysis of machine logic</td>
          <td>Mechatronics</td>
          <td>Successfully carried out system logic tests</td>
        </tr>
      </tbody>
    </table>
  </section>
}

const Profile = () => {
  return <section className='' aria-label="Main Content" role="region">
    <h1>Profile</h1>
    </section>
}


const Student = () => {

  // const router = useRouter();

  // let user_details = useSelector((state) => state.cookie_slice.siwes_user_login); 
  let user_details  = get_cookie('siwes_user_login')
  if (user_details) {
    user_details = JSON.parse(user_details) ;
  }

  const [selectedContent, setSelectedContent] = useState(1);
  const [toggleSubmenu, setToggleSubMenu] = useState(false);

  const ToggleSubMenu = () => {
    setToggleSubMenu(!toggleSubmenu)
  }

  if (user_details && user_details.login == true && user_details.role == "student") {

    return <>
      <Header/>
        <main className='container mx-auto flex flex-col md:flex-row '>
          <aside aria-label='side navigation' className='w-[100%] md:w-[25%]  md: mt-20 md:p-4 md:mr-28'>
            
            <div className='flex flex-row items-center h-16 md:hidden bg-slate-100 p-4'>
              <button className='mr-4 h-7 w-7' onClick={ToggleSubMenu}>
                {toggleSubmenu ? <AiOutlineClose/> : <AiOutlineMenu/> }
              </button>
              <h1 className='font-bold'>Menu</h1>
            </div>
            
            <nav aria-label='side menu' 
              className={`w-[70%] h-[100vh] absolute bg-white p-8 shadow-md border border-[#ddd] 
                transition-all duration-500 ease-linear md:h-fit md:w-full md:static md:mb-8
                ${toggleSubmenu ? 'left-0' : '-left-[70%]'}
                
              `}
            >
              <ul className='flex flex-col justify-start items-start'>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(1)}>Add daily activity</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(2)}>Display daily activities</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(3)}>Add weekly summary</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(4)}>Display weekly activities</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(5)}>Profile</button>
              </ul>
            </nav>

            {/* empty div */}
            <div 
              className={`absolute w-[30%] h-[100vh] md:hidden ${toggleSubmenu ? 'right-0' : '-left-[30%]'}`}
              onClick={ToggleSubMenu}
            >
            </div>
          </aside>

          <section className='my-24'>
            {
              selectedContent == 1 ? <AddDailyActivity/>  
              : selectedContent == 2 ? <DailyActivityTable/>
              : selectedContent == 3 ? <AddWeeklyActivity/>
              : selectedContent == 4 ? <WeeklyActivityTable/>
              : selectedContent == 5 ? <Profile/>
              : ""
            }
          </section>

        </main>
    </>
  } else {
    // router.push('/signin');
  }
}

export default Student