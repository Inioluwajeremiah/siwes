"use client"
import React, {useEffect, useState} from 'react'
import Header from '../components/header'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { get_cookie } from '../helper_functions/Cookies';
// import { useRouter } from 'next/navigation';

const AddWeeklyRemark = ({csrf_token}) => {

  const [weekno, setWeekno] = useState('')
  const [remark, setRemark] = useState('')
  const [date, setDate] = useState(null);
  const [loadingAddRemark, setLoadingAddRemark] = useState(false)

  const addWeeklyRemark = () => {

    if (!weekno) {
      alert("Input week number")
    } else if (!remark) {
      alert("Input remark")
    } else if(!date) {
      alert("input date")
    } else {
      fetch("http://127.0.0.1:5000/supervisor/add_remark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": '5c771ca70ed74040798e36e651ec2489'
        },
        body: JSON.stringify({
          student_id: student_id,
          weekno: weekno,
          remark: remark,
          date: date
        })
      })
    }
  }

  const fetchData = () => {

    setLoadingAddRemark(true)

    fetch('http://127.0.0.1:5000/supervisor/students', {
      method: "GET",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': csrf_token
      },
      credentials:"same-origin"
      
    }).then(response => response.json()).then((result) => {
      console.log("result =>", result);
      setLoadingAddRemark(false)
    })
  }

    return <section className='md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col' aria-label="Main Content" role="region">
      <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Add Weekly RemarK</h1>

      <label htmlFor='week'>Week No.</label>
      <input 
        className=' outline-none p-2 bg-[#ccc] rounded-sm my-2' 
        type='number' placeholder='Input week no' id='week'
        onClick={(e) => setWeekno(e.target.value)}/>
      <label htmlFor="remark">Remark</label>
      <textarea 
        name="remark" id="remark" cols="30" rows="10" 
        className="p-2 bg-[#ccc] rounded-sm my-2"
        onClick={(e) => setRemark(e.target.value)}
      >

      </textarea>
      <label htmlFor='date'>Select date</label> 
      <input className="p-2 bg-[#ccc] rounded-sm my-2" type='date' id='date'
        onClick={(e) => setDate(e.target.value)}
      />

      <button 
        className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md'
        onClick={fetchData}
        >
        {loadingAddRemark ? "Loading"  : 'Submit'}
      </button>
    </section>
}

const DailyActivitiesTable = () => {
  return <div>
    <h1>Daily Activities</h1>
  </div>
}
  
const WeeklyActivitiesTable = () => {
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

const SupervisorWeeklyRemarks = () => {
  return <div>
    <h1>Weekly Remark</h1>
  </div>
}

const Profile = () => {
    return <section className='' aria-label="Main Content" role="region">
        <h1>Prifile</h1>
    </section>
}
  
const Supervisor = () => {

  // const router = useRouter();

  // // let user_details = useSelector((state) => state.cookie_slice.siwes_user_login); 
  // let user_details  = get_cookie('siwes_user_login')
  // if (user_details) {
  //   user_details = JSON.parse(user_details) ;
  // }


  const [selectedContent, setSelectedContent] = useState(1)
  const [toggleSubmenu, setToggleSubMenu] = useState(false);
  const [token, setToken] = useState('')
  const [user_details, set_user_details] = useState(null)

  const ToggleSubMenu = () => {
    setToggleSubMenu(!toggleSubmenu)
  }

  useEffect(() => {
    let siwes_cookies = get_cookie('siwes_user_login')
    siwes_cookies = JSON.parse(siwes_cookies)
    set_user_details(siwes_cookies)
    const csrf_token = siwes_cookies.csrf_token
    console.log('siwes_cookies => ', csrf_token)
    setToken(csrf_token)

    fetch('https://ephphathagc.pythonanywhere.com/supervisor/students', {
      method: "GET",
      headers: {
        Accept: '*/*',
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': csrf_token,
        // 'Authorization': `Bearer ${siwes_cookies.access_token} `
      },
    }).then(response => response.json()).then(result => 
      console.log("result =>", result)).catch(error => console.log('error', error));
  
  }, [])


  if (user_details && user_details.login == true && user_details.role == "supervisor") {

    return <main>
      <Header/>
      <section className='container mx-auto flex flex-col md:flex-row '>
      <aside aria-label='side navigation' className='w-[100%] md:w-[25%]  md: mt-20 md:p-4 md:mr-28'>
            
            <div className='flex flex-row items-center h-16 md:hidden bg-slate-100 p-4'>
              <button className='mr-4 h-7 w-7' onClick={ToggleSubMenu}>
                {toggleSubmenu ? <AiOutlineClose/> : <AiOutlineMenu/> }
              </button>
              <h1 className='font-bold'>Menu</h1>
            </div>
            
            <nav aria-label='side menu' 
              className={`w-[70%] h-[100vh] absolute bg-white p-8 shadow-md border border-[#ddd] 
                transition-all duration-500 ease-linear md:w-full md:static md:mb-8
                ${toggleSubmenu ? 'left-0' : '-left-[70%]'}
                
              `}
            >
              <ul className='flex flex-col justify-start items-start'>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(1)}>Add daily activity</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(2)}>Students&apos; daily activities</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(3)}>Students&apos; weekly activities</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(4)}>Weekly Remarks</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(5)}>Profile</button>
              </ul>
            </nav>

             {/* empty div */}
             <div 
              className={`absolute w-[30%] h-[100vh] md:hidden ${toggleSubmenu ? 'right-0' : '-left-[30%]'}`}
              onClick={ToggleSubMenu}
              >
              </div>

          </aside>

          <section className='mb-24 md:mt-24'>

          {
            selectedContent == 1 ? <AddWeeklyRemark csrf_token={token}/>  
            : selectedContent == 2 ? <WeeklyActivitiesTable/>
            : selectedContent == 3 ? <WeeklyActivitiesTable/>
            : selectedContent == 4 ? <SupervisorWeeklyRemarks/>
            : selectedContent == 5 ? <Profile/>
            : ""
          }
          </section>

        </section>
    </main>
  } else {
    // router.push('/signin');
    null
  }
}

export default Supervisor