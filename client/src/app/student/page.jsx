"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { useRouter } from 'next/navigation';
import { get_cookie } from "../helper_functions/Cookies";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

// add daily activity tab
const AddDailyActivity = ({email}) => {
  const [weekNo, setWeekNo] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addDailyActivity = () => {
    setLoading(true);

    let user_details = get_cookie("siwes_user_login");
    console.log("user_details_before_if =>", user_details);
    if (user_details) {
      user_details = JSON.parse(user_details);
      console.log("user_details =>", user_details);
    }

    if (!weekNo) {
      alert("insert week number");
      setLoading(false);
    } else if (!date) {
      alert("Insert date");
      setLoading(false);
    } else if (!description) {
      alert("Input activity");
      setLoading(false);
    } else {
      const body = {
        weekno: weekNo,
        date: date,
        activity: description,
      };
      // http://tallyme576.pythonanywhere.com/

      // fetch("http://127.0.0.1:5000/student/add-daily-activity", {
      fetch("https://siweslogbook.pythonanywhere.com/student/add-daily-activity", {
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
          if (result.message) {
            alert(result.message);
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
      className="transition-all duration-500 ease-in md:w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col"
      aria-label="Main Content"
      role="region"
    >
      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8">
        <h1 className="text-blue-500 text-xl font-bold"> Add Daily Activity</h1>
        <h1 className="ml-8">{email}</h1>
      </div>
      
      <label htmlFor="weekno">Week Number</label>
      <input
        className="p-2 bg-[#ccc] rounded-sm my-2"
        type="number"
        id="weekno"
        onChange={(e) => setWeekNo(e.target.value)}
      />
      <label htmlFor="date">Select date</label>
      <input
        className="p-2 bg-[#ccc] rounded-sm my-2"
        type="date"
        id="date"
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="activity">Activity Description</label>
      <textarea
        name="activity"
        id="activity"
        cols="30"
        rows="10"
        className="p-2 bg-[#ccc] rounded-sm my-2"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md"
        onClick={addDailyActivity}
      >
        {loading ? "loading..." : "Add Activity"}
      </button>
    </section>
  );
};

// add weekly activity tab
const AddWeeklyActivity = ({email}) => {
  const [weekNo, setWeekNo] = useState("");
  const [date, setDate] = useState("");
  const [job, setJob] = useState("");
  const [department, setDepartment] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addWeeklyActivity = () => {
    if (!weekNo) {
      alert("insert week number");
    } else if (!date) {
      alert("Insert date");
    } else if (!job) {
      alert("Input job for the week");
    } else if (!department) {
      alert("Input department attached");
    } else if (!comment) {
      alert("Input comment");
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
        job: job,
        department: department,
        comment: comment,
      };
      // http://tallyme576.pythonanywhere.com/
      fetch("https://siweslogbook.pythonanywhere.com/student/add-weekly-summary", {
      // fetch("http://127.0.0.1:5000/student/add-weekly-summary", {
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
      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8">
        <h1 className="text-blue-500 text-xl font-bold">Add Weekly Summary</h1>
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
      <label htmlFor="job">Job for the week</label>
      <input
        className=" outline-none p-2 bg-[#ccc] rounded-sm my-2"
        type="text"
        placeholder="Job for the week"
        id="job"
        onChange={(e) => setJob(e.target.value)}
      />
      <label htmlFor="department">Department Attached</label>
      <input
        className=" outline-none p-2 bg-[#ccc] rounded-sm my-2"
        type="text"
        placeholder="Department Attached"
        id="department"
        onChange={(e) => setDepartment(e.target.value)}
      />
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        className="p-2 bg-[#ccc] rounded-sm my-2"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        className="mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md"
        onClick={addWeeklyActivity}
      >
        {loading ? "Loading..." : "Add Summary"}
      </button>
    </section>
  );
};

// display daily activity tab
const DailyActivityTable = ({ dailyActivitiesData, email }) => {
  return (
    <section
      className="px-6 md:px-10 w-[90%]"
      aria-label="Main Content"
      role="region"
    >
      {/* <div>
      <input type="text" name="" id="" aria-label='search' />
      <select name="filter" aria-label='filter by date' id="">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div> */}

      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8">
        <h1 className="text-blue-500 text-xl font-bold">Daily Activities</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <div className="overflow-x-scroll">
        <table className="mx-auto w-full border-collapse border text-left">
          <thead>
            <tr className="w-full">
              <th className="border p-2 w-[25%]">SN</th>
              <th className="border p-2 w-[25%]">Activity</th>
              <th className="border p-2 w-1/4">Week</th>
              <th className="border p-2 w-1/4">Date</th>
            </tr>
          </thead>
          <tbody>
            {dailyActivitiesData.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.activity}</td>
                  <td className="border p-2">{item.weekno}</td>
                  <td className="border p-2">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const WeeklyActivityTable = ({weeklySummaryData, email}) => {
  return (
    <section
      className="px-6 md:px-10 w-[90%]"
      aria-label="Main Content"
      role="region"
    >
      {/* <div>
      <input type="text" name="" id="" aria-label='search' />
      <select name="filter" aria-label='filter by date' id="">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div> */}

      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 ">
        <h1 className="text-blue-500 text-xl font-bold">Weekly Activities</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <div className="overflow-x-scroll">
        <table className="mx-auto w-full border-collapse border text-left">
          <thead>
            <tr className="w-full">
              <th className="border p-2 w-1/6 ">SN</th>
              <th className="border p-2 w-1/6">Job for the Week</th>
              <th className="border p-2 w-1/6">Department</th>
              <th className="border p-2 w-1/6">Comment</th>
              <th className="border p-2 w-1/6">Supervisor's Remark</th>
              <th className="border p-2 w-1/6">Week</th>
              <th className="border p-2 w-1/6">Date</th>
            </tr>
          </thead>
          <tbody>
            {weeklySummaryData.map((item, index) => {
              // replace summary with job
              return (
                <tr key={index} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.summary}</td>
                  <td className="border p-2">{item.departmentAttached}</td>
                  <td className="border p-2">{item.studentComment}</td>
                  <td className="border p-2">{item.remark ? item.remark : "No remark"}</td>
                  <td className="border p-2">{item.weekNo}</td>
                  <td className="border p-2">{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Profile = ({profileData, email, role}) => {


  return (
    <section className="" aria-label="Main Content" role="region">

      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 ">
        <h1 className="text-blue-500 text-xl font-bold">Profile Details</h1>
        <h1 className="ml-8">{email}</h1>
      </div>

      <div className="p-4 md:p-8">
        <h1>{profileData.firstName} {profileData.middleName} {profileData.lastName}</h1>
        <div className="flex flex-row gap-2">
          <h1 className="py-2 text-[1em]"><span className="font-bold">Role: </span>{role}</h1>
          <h1 className="py-2 text-[1em]"><span className="font-bold">Gender: </span>{profileData.gender}</h1>
        </div>
        <div className="flex flex-row gap-2">
          <h1 className="py-2 text-[1em]"><span className="font-bold">Start: </span>{profileData.startDate}</h1>
          <h1 className="py-2 text-[1em]"><span className="font-bold">End: </span>{profileData.endDate}</h1>
        </div>
        
        <h1 className="py-2 text-[1em]"><span className="font-bold">Supervisor: </span>{profileData.supervisorName}</h1>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Matric. No: </span>{profileData.matricNo}</h1>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Department: </span>{profileData.department}</h1>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Course: </span>{profileData.course}</h1>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Level: </span>{profileData.level}</h1>
        <h1 className="py-2 text-[1em]"><span className="font-bold">Organization: </span>{profileData.ppa}</h1>
      </div>
    </section>
  );
};

const Student = () => {
  const router = useRouter();

  const [dailyActivitiesData, setDailyActivitiesData] = useState([]);
  const [weeklySummaryData, setWeeklySummaryData] = useState([]);
  const [weeklyRemarksData, setWeeklyRemarkData] =useState([]);
  const [profileData, setProfileData] = useState({})

  const GetAllDailyActivitiesData = (jwt) => {
    // fetch("http://127.0.0.1:5000/student/daily-activities", {
    fetch("https://siweslogbook.pythonanywhere.com/student/daily-activities", {
      method: "GET",
      // credentials: "include",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 'X-CSRF-TOKEN': csrf_token,
        Authorization: `Bearer ${jwt} `,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setDailyActivitiesData(result.data);
        }
        console.log("result =>", result);
      })
      .catch((error) => {
        alert(error.message);
        console.log("error", error);
      });
  };

  const GetWeeklySummaryData = (jwt) => {
    // fetch("http://127.0.0.1:5000/student/weekly-activities", {
    fetch("https://siweslogbook.pythonanywhere.com/student/weekly-activities", {
      method: "GET",
      // credentials: "include",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // 'X-CSRF-TOKEN': csrf_token,
        Authorization: `Bearer ${jwt} `,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setWeeklySummaryData(result.data);
          setWeeklyRemarkData(result.remarks)

          // console.log('summary data => ', result.data);
          // console.log('remarks data => ', result.remarks);
        } 
        console.log("result =>", result);
        if (result.error) {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log("error", error);
      });
  };

  const GetProfileData = (jwt) => {
    // fetch("http://127.0.0.1:5000/student_profile/", {
    fetch("https://siweslogbook.pythonanywhere.com/student_profile/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt} `,
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setProfileData(result.data);
        }
        if (result.nill) {
          alert(result.error)
          
        }
        // console.log("result =>", result);
      })
      .catch((error) => {
        alert(error.message);
        console.log("error", error);
      });

  }

  useEffect(() => {
    let siwes_cookies = get_cookie("siwes_user_login");
    siwes_cookies = JSON.parse(siwes_cookies);
    // set_user_details(siwes_cookies)
    if (siwes_cookies) {
      GetAllDailyActivitiesData(siwes_cookies.jwt);
      GetWeeklySummaryData(siwes_cookies.jwt);
      GetProfileData(siwes_cookies.jwt)
    }
  }, []);

  // let user_details = useSelector((state) => state.cookie_slice.siwes_user_login);

  const [selectedContent, setSelectedContent] = useState(1);
  const [toggleSubmenu, setToggleSubMenu] = useState(false);

  const ToggleSubMenu = () => {
    setToggleSubMenu(!toggleSubmenu);
  };

  let user_details = get_cookie("siwes_user_login");
  console.log("user_details_before_if @student =>", user_details);
  if (user_details) {
    user_details = JSON.parse(user_details);
    console.log("user_details @student =>", user_details);
  }

  if (
    user_details &&
    user_details.login == true &&
    user_details.role == "student"
  ) {
    return (
      <>
        <Header />
        <main className="container mx-auto flex flex-col md:flex-row ">
          <aside
            aria-label="side navigation"
            className="w-[100%] md:w-[25%]  md: mt-20 md:p-4 md:mr-28"
          >
            <div className="flex flex-row items-center h-16 md:hidden bg-slate-100 p-4">
              <button className="mr-4 h-7 w-7" onClick={ToggleSubMenu}>
                {toggleSubmenu ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
              <h1 className="font-bold">Menu</h1>
            </div>

            <nav
              aria-label="side menu"
              className={`w-[70%] h-[100vh] absolute bg-white p-8 shadow-md border border-[#ddd] 
                transition-all duration-500 ease-linear md:h-fit md:w-full md:static md:mb-8
                ${toggleSubmenu ? "left-0" : "-left-[70%]"}
                
              `}
            >
              <ul className="flex flex-col justify-start items-start">
                <button
                  className="p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm"
                  onClick={() => setSelectedContent(1)}
                >
                  Add daily activity
                </button>
                <button
                  className="p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm"
                  onClick={() => setSelectedContent(2)}
                >
                  Display daily activities
                </button>
                <button
                  className="p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm"
                  onClick={() => setSelectedContent(3)}
                >
                  Add weekly summary
                </button>
                <button
                  className="p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm"
                  onClick={() => setSelectedContent(4)}
                >
                  Display weekly activities
                </button>
                <button
                  className="p-4 w-full hover:cursor-pointer text-start text-white mb-4 bg-blue-500 rounded-sm"
                  onClick={() => setSelectedContent(5)}
                >
                  Profile
                </button>
              </ul>
            </nav>

            {/* empty div */}
            <div
              className={`absolute w-[30%] h-[100vh] md:hidden ${
                toggleSubmenu ? "right-0" : "-left-[30%]"
              }`}
              onClick={ToggleSubMenu}
            ></div>
          </aside>

          <section className="my-24 w-full md:w-[80%]">
            {selectedContent == 1 ? (
              <AddDailyActivity email={user_details.email}/>
            ) : selectedContent == 2 ? (
              <DailyActivityTable
                dailyActivitiesData={dailyActivitiesData}
                email={user_details.email}
              />
            ) : selectedContent == 3 ? (
              <AddWeeklyActivity email={user_details.email}/>
            ) : selectedContent == 4 ? (
              <WeeklyActivityTable 
                weeklySummaryData={weeklySummaryData}
                email={user_details.email}
              />
            ) : selectedContent == 5 ? (
              <Profile  profileData={profileData} email={user_details.email} role={user_details.role}/>
            ) : (
              ""
            )}
          </section>
        </main>
      </>
    );
  } else {
    // router.push('/signin');
    return (
      <main>
        <Header />
        <div className="w-[96%] md:w-1/2 mx-auto border-2 shadow px-8 mt-28 h-1/2 flex flex-col items-center">
          <h1 className="font-bold my-4">Unauthorized Acess!!! </h1>
          <div className="flex flex-row flex-wrap">
            <button className="mb-4">
              <Link href="/signin" className="text-blue-500">
                Signin{" "}
              </Link>
            </button>
            <span className="italic font-bold">&nbsp;or&nbsp;</span>
            <button className="mb-4">
              Click
              <Link href="/supervisor" className="text-blue-500">
                {" "}
                here{" "}
              </Link>
            </button>
            <span>&nbsp;to continue</span>
          </div>
        </div>
      </main>
    );
  }
};

export default Student;
