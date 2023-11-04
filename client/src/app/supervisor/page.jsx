"use client"

import React, {useEffect, useState} from 'react'
import Header from '../components/header'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { get_cookie } from '../helper_functions/Cookies';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';


const WeeklyRemarkTable = ({weeklyRemarkData, email}) => {
  return (
    <section
      className="px-6 md:px-10 w-[90%]"
      aria-label="Main Content"
      role="region"
    >
      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 ">
        <h1 className="text-green-500 text-xl font-bold">Weekly Summary</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <div className=' overflow-x-scroll'>
        <table className="mx-auto table-auto w-full border-collapse border text-left">
          <thead>

            <tr className="w-full">
              <th className="border p-2 w-[10%]">SN</th>
              <th className="border p-2 w-[22%]">Supervisor's Remark</th>
              <th className="border p-2 w-[22%]">Student Email</th>
              <th className="border p-2 w-[10%]">Week</th>
              <th className="border p-2 w-[20%]">Date</th>
            </tr>
          </thead>
          <tbody>
            {weeklyRemarkData.map((item, index) => {
              // replace summary with job
              return (
                <tr key={index} className="border">
                  <td className="border p-2 w-[10%]">{index + 1}</td>
                  <td className="border p-2 w-[22%]">{item.remark}</td>
                  <td className="border p-2 w-[22%]">{item.student_email}</td>
                  <td className="border p-2 w-[10%]">{item.weekNo}</td>
                  <td className="border p-2 w-[20%]">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const AddWeeklyRemark = ({email}) => {
  const [weekNo, setWeekNo] = useState("");
  const [date, setDate] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const addWeeklyRemark = () => {
    if (!weekNo) {
      alert("insert week number");
    } else if (!date) {
      alert("Insert date");
    } else if (!studentEmail) {
      alert("Input student email");
    } else if (!remark) {
      alert("Input remark");
    } else {
      setLoading(true);

      let user_details = get_cookie("siwes_user_login");
      console.log("user_details_before_if =>", user_details);
      if (user_details) {
        user_details = JSON.parse(user_details);
        console.log("user_details =>", user_details);
      }
      const body = {
        weekno: weekNo,
        date: date,
        student_email: studentEmail,
        remark: remark,
      };
      // http://tallyme576.pythonanywhere.com/

      // fetch("http://127.0.0.1:5000/supervisor/add-weekly-remark", {
      fetch("https://siweslogbook.pythonanywhere.com/supervisor/add-weekly-remark", {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_details.jwt}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert(result.success);
            setLoading(false);
          }
          if (result.error) {
            alert(result.error);
            setLoading(false);
          }
          // alert(result)
          console.log(result);
          setLoading(false);
        })
        .catch((error) => {
          // alert(error.message)
          console.log(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <section
      className="md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col"
      aria-label="Main Content"
      role="region"
    >
       <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 ">
        <h1 className="text-green-500 text-xl font-bold">Add Weekly Remark</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <label htmlFor="weekno">Week Number</label>
      <input
        className="p-2 bg-[#ccc] rounded-sm my-2"
        type="number"
        id="weekno"
        onChange={(e) => setWeekNo(e.target.value)}
      />
      <label htmlFor="startdate">Select date</label>
      <input
        className="p-2 bg-[#ccc] rounded-sm my-2"
        type="date"
        id="startdate"
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="email">Student email</label>
      <input
        className=" outline-none p-2 bg-[#ccc] rounded-sm my-2"
        type="text"
        placeholder="Student's email"
        id="email"
        onChange={(e) => setStudentEmail(e.target.value)}
      />
      <label htmlFor="remark">Remark</label>
      <textarea
        name="remark"
        id="remark"
        cols="30"
        rows="10"
        className="p-2 bg-[#ccc] rounded-sm my-2"
        onChange={(e) => setRemark(e.target.value)}
      ></textarea>
      <button
        className="mt-10 px-4 py-2 mx-auto text-white bg-green-500 items-center flex flex-row justify-center rounded-md"
        onClick={addWeeklyRemark}
      >
        {loading ? "Loading..." : "Add Remark"}
      </button>
    </section>
  );
}

const Profile = ({profileData, email, role}) => {

    return <section className='' aria-label="Main Content" role="region">
         <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 ">
        <h1 className="text-green-500 text-xl font-bold">Profile Details</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <div className="p-4 md:p-8">
        <h1>{profileData.salutaion} {profileData.firstName} {profileData.middleName} {profileData.lastName}</h1>
        <div className="flex flex-row gap-2">
          <h1 className="py-2 text-[1em]"><span className="font-bold">Role: </span>{role}</h1>
          <h1 className="py-2 text-[1em]"><span className="font-bold">Gender: </span>{profileData.gender}</h1>
        </div>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Department: </span>{profileData.department}</h1>
      </div>
    </section>
}
  
const Supervisor = () => {

  // const router = useRouter();

  // // let user_details = useSelector((state) => state.cookie_slice.siwes_user_login); 
  // let user_details  = get_cookie('siwes_user_login')
  // if (user_details) {
  //   user_details = JSON.parse(user_details) ;
  // }

  const [weeklyRemarkData, setWeeklyRemarkData] = useState([]);
  const [profileData, setProfileData] = useState({})

  const [selectedContent, setSelectedContent] = useState(1)
  const [toggleSubmenu, setToggleSubMenu] = useState(false);
  const [user_details, set_user_details] = useState(null)

  const ToggleSubMenu = () => {
    setToggleSubMenu(!toggleSubmenu)
  }

  const GetWeeklyRemark = (jwt) => {
    // fetch("http://127.0.0.1:5000/supervisor/weekly-remarks", {
    fetch("https://siweslogbook.pythonanywhere.com/supervisor/weekly-remarks", {
      method: "GET",
      // credentials: "include",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 'X-CSRF-TOKEN': csrf_token,
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setWeeklyRemarkData(result.data);
        }
        if (result.error) {
          alert(result.error)
          
        }
        console.log("result =>", result);
      })
      .catch((error) => {
        // alert(error.message);
        console.log("error", error);
      });
  };

  const GetProfileData = (jwt) => {
    fetch("https://siweslogbook.pythonanywhere.com/supervisor_profile/", {
    // fetch("http://127.0.0.1:5000/supervisor_profile/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setProfileData(result.data);
        }
        if (result.nill) {
          alert(result.message)
          
        }
        if (result.error) {
          alert(result.error)
          
        }
        console.log("result =>", result);
      })
      .catch((error) => {
        // alert(error.message);
        console.log("error", error);
      });

  }

  useEffect(() => {
    let siwes_cookies = get_cookie('siwes_user_login')
    siwes_cookies = JSON.parse(siwes_cookies)
    set_user_details(siwes_cookies)
    if (siwes_cookies) {
      GetWeeklyRemark(siwes_cookies.jwt);
      GetProfileData(siwes_cookies.jwt)
    }
  
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
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(1)}>Add Weekly Remark</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(2)}>Weekly Remarks</button>
                <button className='p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-green-500 rounded-sm' onClick={()=> setSelectedContent(3)}>Profile</button>
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
            selectedContent == 1 ? <AddWeeklyRemark email={user_details.email}/>  
            : selectedContent == 2 ? <WeeklyRemarkTable weeklyRemarkData={weeklyRemarkData} email={user_details.email}/>
            : selectedContent == 3 ? <Profile profileData={profileData} email={user_details.email} role={user_details.role}/>
            : ""
          }
          </section>

        </section>
    </main>
  } else {
    // router.push('/signin');
    return  <main>
      <Header/>
      <div className="w-[96%] md:w-1/2 mx-auto border-2 shadow px-8 mt-28 h-1/2 flex flex-col items-center" >
        <h1 className="font-bold my-4" >Unauthorized Acess!!! </h1>
        <div className="flex flex-row flex-wrap">
          <button className="mb-4"><Link href="/signin" className='text-blue-500'>Signin </Link></button>
          <span className="italic font-bold">&nbsp;or&nbsp;</span>
          <button className="mb-4">Click<Link href="/student" className='text-blue-500'> here </Link></button>
           <span>&nbsp;to continue</span>
        </div>
      </div>
    </main>
  }
}

export default Supervisor