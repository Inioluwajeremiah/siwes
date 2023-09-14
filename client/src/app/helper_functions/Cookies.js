'use client'

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
    
    document.cookie = `${cookie_name} = ${cookie_value}; expires=${expiry_date}; ${cookie_path}` 
}

export const get_cookie = (cookie_name) => {

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        console.log('cookie =>', cookie);
        const [name, value] = cookie.split('=');
        if (name == cookie_name) {
        return decodeURIComponent(value);
        }
    }
    return null; // Cookie not found
      
}

export const delete_cookie = (cookie_name)  => {
    document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


// get_all_cookies: (state) => {
//     const cookies = document.cookie.split(';');
//     for (const cookie of cookies) {
//         const [cookie_name, cookie_value] = cookie.trim().split('=');
//         state[cookie_name] = cookie_value;
//     }