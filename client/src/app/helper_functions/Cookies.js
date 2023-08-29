'use client'

export const set_cookie = (no_of_hours, cookie_name, cookie_value, cookie_path) => {
    if (no_of_days) {
        const current_date = new Date();
        let expiry_date = current_date + (no_of_hours*60*60*1000)
        expiry_date = new Date(expiry_date)
        expiry_date = expiry_date.toUTCString();
    }
    document.cookie = `${cookie_name} = ${cookie_value}; expires=${expiry_date}; ${cookie_path}` 
}

export const get_cookie = (cookie_name) => {
    const cookie_details = 
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

