"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { delete_cookie, get_cookie } from "../helper_functions/Cookies";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  // let user_login_details = useSelector((state) => state.cookie_slice.siwes_user_login);

  let user_login_details = get_cookie("siwes_user_login");

  if (user_login_details) {
    user_login_details = JSON.parse(user_login_details);
  }

  console.log("user_login_details => ", user_login_details);

  let [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropdown] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    // fetch('https://siweslogbook.pythonanywhere.com/logout/', {

    let user_details = get_cookie("siwes_user_login");

    if (user_details) {
      user_details = JSON.parse(user_details);
      console.log("jwet => ", user_details.jwt);
    }
    // fetch("http://127.0.0.1:5000/logout/", {
      fetch("https://siweslogbook.pythonanywhere.com/logout/", {
      method: "POST",
      // credentials: 'include',
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_details.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          delete_cookie("siwes_user_login");
          console.log(data.success);
          // window.open('/signin ', '_self')
          router.push("/signin ", "_self");
        }
      })
      .catch((error) => console.log(error));
  };

  /*
  const logout = async () => {
    const response = await fetch('http://127.0.0.1:5000/auth/logout')
    const result = await response.json()
    alert(result.success_message)
  }
  */

  return (
    <>
      <header className="w-full container mx-auto top-0 left-0 right-0 h-20 fixed bg-white flex flex-row justify-between px-10 p-3 items-center shadow">
        <h1
          className={`${
            user_login_details && user_login_details.role == "student"
              ? "text-blue-500"
              : user_login_details && user_login_details.role == "supervisor"
              ? "text-green-500"
              : "text-black"
          } font-black text-2xl`}
        >
          Siwes<span className="text-black font-black text-2xl">.</span>
        </h1>
        <nav
          aria-label="Main navigation"
          className={`absolute top-20 shadow-md w-[70%] h-[100vh] bg-white px-8 py-14 
            md:p-0 md:h-fit text-black md:w-fit md:shadow-none md:text-black  
            md:relative md:top-0 md:right-0 transition-all duration-500 ease-in 
            ${isOpen ? "right-0" : "-right-[70%]"}`}
        >
          <ul
            className={`flex flex-col md:flex-row md:justify-between h-full md:h-fit items-left md:items-center`}
          >
            {user_login_details && user_login_details.role == "student" && (
              <li className=" pr-4 hover:underline hover:text-blue-500 active:text-blue-500 py-2">
                <Link href="/student">Student</Link>
              </li>
            )}
            {user_login_details && user_login_details.role == "student" && (
              <li className=" pr-4 hover:underline hover:text-blue-500 active:text-blue-500 py-2">
                <Link href="/student_profile">Profile</Link>
              </li>
            )}
            {user_login_details && user_login_details.role == "supervisor" && (
              <li className="md:mb-0 pr-4 hover:underline hover:text-blue-700 py-2  ">
                <Link href="/supervisor">Supervisor</Link>
              </li>
            )}
            {user_login_details && user_login_details.role == "supervisor" && (
              <li className=" pr-4 hover:underline hover:text-blue-700 active:text-blue-500 py-2 ">
                <Link href="/supervisor_profile">Profile</Link>
              </li>
            )}
            {user_login_details && user_login_details.role == "admin" && (
              <li className="mb-4 md:mb-0 pr-4 hover:underline hover:text-blue-500 py-2">
                <Link href="/admin">Admin</Link>
              </li>
            )}
            {user_login_details && user_login_details.login == true ? (
              <button
                className="hover:underline text-white hover:bg-red-700 bg-red-500 px-4 py-2 my-2"
                onClick={logout}
              >
                Log Out
              </button>
            ) : (
              <>
                <li className="flex flex-row bg-blue-500 px-4 py-2 rounded-md mr-4 text-white items-center cursor-pointer">
                  <Link href="/register">Register</Link>
                </li>

                <li className="mb-4 md:mb-0 pr-4 hover:underline hover:text-blue-500">
                  <Link href="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div
          className={`absolute top-20 w-[30%] h-[100vh] md:hidden ${
            isOpen ? "left-0" : "-left-[50%]"
          }`}
          onClick={toggleMenu}
        ></div>
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </header>
    </>
  );
};

export default Header;
