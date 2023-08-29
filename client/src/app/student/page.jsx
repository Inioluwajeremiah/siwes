'use client'
import React, { useState } from 'react'
import Header from '../components/header'

const AddDailyActivity = () => {

  const [date, setDate] = useState('')
  const [description,  setDescription] = useState('')

  const addDailyActivity = () => {

    const body = {
      date:date,
      description:description
    }
    fetch('/add-daily-activity', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
      
    })
  }


  return <section className='transition-all duration-500 ease-in md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col' aria-label="Main Content" role="region">
    <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Add Daily Activity</h1>
    <label htmlFor='date'>Select date</label> 
    <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' id='date' onChange={(e) => setDate(e.target.value)}/>
    <label htmlFor="activity">Description</label>
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

  const [selectedContent, setSelectedContent] = useState(1)

  return <>
    <Header/>
      <main className='container mx-auto my-28  p-8 flex flex-col md:flex-row '>
        <aside aria-label='side navigation' className='max-w-[500px] p-8 mr-28 shadow-md border border-[#ddd]'>
          <h1 className='pb-4 font-bold'>Menu</h1>
          <nav aria-label='side menu'>
            <ul className='flex flex-col justify-start items-start'>
              <button className='p-4 w-60 hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(1)}>Add daily activity</button>
              <button className='p-4 w-60 hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(2)}>Display daily activities</button>
              <button className='p-4 w-60 hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(3)}>Add weekly summary</button>
              <button className='p-4 w-60 hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(4)}>Display weekly activities</button>
              <button className='p-4 w-60 hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm' onClick={()=> setSelectedContent(5)}>Profile</button>
            </ul>
          </nav>
        </aside>

        {
          selectedContent == 1 ? <AddDailyActivity/>  
          : selectedContent == 2 ? <DailyActivityTable/>
          : selectedContent == 3 ? <AddWeeklyActivity/>
          : selectedContent == 4 ? <WeeklyActivityTable/>
          : selectedContent == 5 ? <Profile/>
          : ""
      }

      </main>
  </>
}

export default Student