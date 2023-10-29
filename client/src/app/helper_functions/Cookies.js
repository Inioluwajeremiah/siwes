'use client';

export const set_cookie = (no_of_hours, cookie_name, cookie_value, cookie_path) => {
    let expiry_date = null
    if (no_of_hours) {
        let current_date = new Date();
        let expiry_date_in_milliseconds = current_date.getTime() + (no_of_hours*60*60*1000)
        expiry_date = new Date(expiry_date_in_milliseconds)
        expiry_date = expiry_date.toUTCString();
    }

    alert('expiry date =>', expiry_date);
    console.log('expiry date =>', expiry_date);
    if (typeof document !== 'undefined') {
        document.cookie = `${cookie_name} = ${cookie_value}; expires=${expiry_date}; ${cookie_path}`
        alert("login details saved in cookie ")
    } 
}

export const get_cookie = (cookie_name) => {

    try {

        if (typeof document !== 'undefined') {

            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                console.log('cookie =>', cookie);
                const [name, value] = cookie.trim().split('=');
                if (name ==  cookie_name) {
                    console.log("name, value => ", name, value);
                    return decodeURIComponent(value);
                }
            }
            return null; // Cookie not found
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

export const delete_cookie = (cookie_name)  => {
    if (typeof document !== 'undefined') {
        document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}


// get_all_cookies: (state) => {
//     const cookies = document.cookie.split(';');
//     for (const cookie of cookies) {
//         const [cookie_name, cookie_value] = cookie.trim().split('=');
//         state[cookie_name] = cookie_value;
//     }