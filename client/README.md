This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

when a user clicks edit, instead of using a modlal class, we can use the add daily and weekly activity respectivey  



## Technical Documentation for the `Header` Component

### Introduction

The `Header` component is a React component used to create the header section of a web application. It provides navigation links, a logo, and user authentication-related functionality. This documentation will explain the purpose of the component, its structure, and its key functionalities.

## Purpose

The `Header` component serves the following purposes:

1. Display a logo and application name ("Siwes").
2. Provide navigation links to different sections of the application based on user roles.
3. Display user authentication-related options such as signing up, signing in, and logging out.

## Dependencies

The `Header` component depends on the following external libraries and modules:

- React: The core library for building user interfaces in React applications.
- Next.js: A React framework used for server-rendered React applications.
- react-icons: A library for using icons in React applications.
- react-redux: A state management library for React applications using Redux.
- `delete_cookie` function: An external helper function for deleting cookies.
- `useSelector` function: A function from React Redux for selecting data from the Redux store.

## Component Structure

The `Header` component consists of the following key elements and functionalities:

1. **User Authentication and Role Checking:**
   - It uses the `useSelector` hook to retrieve user login details and check the user's role.
   - If the user is logged in, it parses the stored user login details.

2. **State Management:**
   - It uses React's `useState` hook to manage two states: `isOpen` and `dropDown`.
   - `isOpen` controls the visibility of the mobile menu.
   - `dropDown` controls the visibility of the signup dropdown menu.

3. **Toggle Menu:**
   - The `toggleMenu` function toggles the mobile menu's visibility when the menu button is clicked.

4. **Logout Functionality:**
   - The `logout` function sends a POST request to a logout endpoint when the "Log Out" button is clicked.
   - If the logout is successful, it deletes the `siwes_user_login` cookie and redirects the user to the signin page.

5. **Navigation Links:**
   - It conditionally renders navigation links based on the user's role and login status.
   - Links are provided for the "Student," "Supervisor," and "Admin" sections, as well as "Sign In" and "Sign Up" options.
   - The "Sign Up" option opens a dropdown menu with links to signup pages for "Student" and "Supervisor."

6. **Responsive Design:**
   - The header is designed to be responsive, with a mobile menu that slides in from the right when the menu button is clicked.
   - The dropdown menu for signing up is also responsive.

## Usage

To use the `Header` component in your Next.js application, you should import it and include it within your application's layout or as needed in your page components.

```javascript
import Header from './Header'; // Adjust the import path as needed

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```


## Signin Page
**Description:**
This is a React-based web application that implements a sign-in page (`SignIn`) and a header component (`Header`). The code focuses on user authentication and role-based navigation within the application. It allows users to sign in with their credentials, select their role (student, supervisor, or admin), and handles authentication-related actions such as setting cookies, error handling, and redirection to respective dashboard pages.

**Code:**

Below is the code for the `SignIn` component:

```jsx
import React, { useState } from 'react';
import Header from '../components/header';
import Link from 'next/link';
import { set_cookie } from '../helper_functions/Cookies';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const SignIn = () => {
    // ...
    // (Code for user authentication, state management, and form inputs)
    // ...

    return (
        <>
            <Header />
            <main className='container mx-auto my-28 max-w-[500px] border-[#f3f2f2] border-[1px] shadow-lg p-8 flex flex-col'>
                {/* ... */}
                {/* (Code for rendering the sign-in form, role selection, inputs, and buttons) */}
                {/* ... */}
            </main>
        </>
    );
}

export default SignIn;
```


## Student Signup

**Description:**
This component is part of a web application and is responsible for rendering a sign-up form where users can register for the application. It captures various user details such as name, email, gender, department, and more, and allows users to select their role (admin, supervisor, or student).

The code employs React's state management to track user input values and control the form's behavior. It also handles user interactions, input validation, and error alerts. Additionally, the code includes functionality for resending verification codes in case of registration confirmation issues.

Below is the code for the `SignUp` component:

```jsx
import React, { useState } from 'react';
import Header from '../components/header';
import Link from 'next/link';

const SignUp = () => {
    // ...
    // (Code for managing and capturing user input and form fields)
    // ...

    return (
        <>
            <Header />
            <main role='form'
                className='container mx-auto my-28 w-[80%] md:max-w-[600px] border-[#f3f2f2] border-[1px] shadow-lg p-8'
                method='POST'>
                <h1 className=' text-xl text-center font-bold p-4 text-blue-500'>Sign up</h1>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='flex flex-col'>
                        {/* ... */}
                        {/* (Code for rendering various form input fields) */}
                        {/* ... */}
                    </div>

                    <div className='flex flex-col'>
                        {/* ... */}
                        {/* (Code for rendering additional form input fields) */}
                        {/* ... */}
                    </div>
                </div>
                <p className='my-2'>Already signed up? <Link rel="stylesheet" href="/signin" className='text-white bg-blue-500 rounded p-2'>Sign In</Link></p>
                <button className='mt-10 px-4 py-2 mx-auto text-white bg-blue-500 items-center flex flex-row justify-center rounded-md' onClick={Register}>{registerLoading ? 'Loading...' : 'Sign Up'}</button>
            </main>

            {/* Resend code dialog */}
            {resendCodedialog ? 
                <div role="dialog" aria-modal="true" aria-labelledby="modalTitle" className='fixed top-20 left-0 w-full h-full bg-[#afadf608]'>
                    {/* ... */}
                    {/* (Code for rendering a dialog to resend verification code) */}
                    {/* ... */}
                </div>
                : ""
            }
        </>
    );
}

export default SignUp;
```

### Spervisor Page
The code is a React-based web application designed for a supervisor role within a system. It includes components for adding weekly remarks, viewing daily and weekly activities, and managing a user profile. Here's a summary of the key components and functionality:

1. **AddWeeklyRemark Component:** Allows supervisors to add weekly remarks, including week number, remarks, and date.

2. **DailyActivitiesTable Component:** A placeholder for displaying daily activities, currently not functional.

3. **WeeklyActivitiesTable Component:** Displays a table of weekly activities with search and filter options. Contains static sample data.

4. **SupervisorWeeklyRemarks Component:** A placeholder for displaying supervisor weekly remarks, currently not functional.

5. **Profile Component:** A placeholder for displaying the user's profile, currently not functional.

6. **Supervisor Component:** The main component managing the application's state and content based on user interactions. It checks if the user is logged in as a supervisor and fetches a CSRF token and student data on component mount.

7. **Side Navigation and Content Display:** Users can select different content sections via the side menu, such as adding daily activities or viewing weekly activities.

8. **Toggle Submenu:** A toggle button for showing/hiding the side menu on smaller screens (responsive design).

9. **Redirect to Sign In:** If the user is not logged in as a supervisor, they are redirected to the sign-in page.

10. **Usage of CSRF Tokens:** CSRF tokens are used for secure HTTP requests to protect against cross-site request forgery attacks.


### Student Page
Here's a summary of the key components and functionality:

1. **AddDailyActivity Component**: Allows students to add daily activities by specifying the week number, date, and activity description. It handles data submission to the server using the `fetch` API.

2. **AddWeeklyActivity Component**: Enables students to add weekly activities, including date, job for the week, department attached, and student comments.

3. **DailyActivityTable Component**: Displays a table of daily activities, providing search and filter options based on the date. It uses static sample data for demonstration purposes.

4. **WeeklyActivityTable Component**: Presents a table of weekly activities with search and filter options based on the date. It also uses static sample data, including columns for week number, date, job for the week, department attached, and student comments.

5. **Profile Component**: A placeholder for displaying user profile information.

6. **Student Component**: The main component manages application state and content based on user interactions. It checks if the user is logged in as a student, retrieves user details, and allows navigation between different content sections via a side menu. The design is responsive, with a toggle menu for smaller screens, and it redirects users to the sign-in page if not logged in as a student.

