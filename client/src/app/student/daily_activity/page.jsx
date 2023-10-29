'use client'

import React, { useEffect, useState } from 'react'

const AddDailyActivity = () => {

    const [weekNo, setWeekNo] = useState('')
    const [date, setDate] = useState('')
    const [description,  setDescription] = useState('')
    const [loading, setLoading] = useState(false)
  
  
    const addDailyActivity = () => {
      setLoading(true)
  
      if (!weekNo) {
        alert("insert week number")
        setLoading(false)
      } else if (!date) {
        alert("Insert date")
        setLoading(false)
      } else if (!description) {
        alert("Input activity")
      } else {
  
        const body = {
          weekno: weekNo,
          date:date,
          activity:description
        }
        fetch('https://tallyme576.pythonanywhere.com/student/add-daily-activity', {
          method: "POST",
          credentials: "include",
          // redirect: "follow",
          // referrerPolicy: "origin-when-cross-origin",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(res => res.json()).
        then(result => {
  
          if (result.success_message) {
            alert(success_message)
            setLoading(false)
          }
          if (result.error_message) {
            alert(result.success_message)
            setLoading(false)
          }
          alert(result)
          console.log(result);
          setLoading(false)
  
        }).
        catch(error => {
          alert(error)
          setLoading(false)
        })
      }
    }
  
    return <section className='transition-all duration-500 ease-in md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col' aria-label="Main Content" role="region">
      <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Add Daily Activity</h1>
      <label htmlFor='weekno'>Week Number</label> 
      <input className="p-2 bg-[#ccc] rounded-sm my-2" type='number' id='weekno' onChange={(e) => setWeekNo(e.target.value)}/>
      <label htmlFor='date'>Select date</label> 
      <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' id='date' onChange={(e) => setDate(e.target.value)}/>
      <label htmlFor="activity">Activity Description</label>
      <textarea name="activity" id="activity" cols="30" rows="10" className="p-2 bg-[#ccc] rounded-sm my-2" onChange={(e) => setDescription(e.target.value)}></textarea>
      <button 
        className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' 
        onClick={addDailyActivity}>{loading ? 'loading...' : 'Add Activity'}</button>
    </section>
  }

  export default AddDailyActivity