
'use client'

import {createSlice} from '@reduxjs/toolkit'

const cookie_slice = createSlice ({
    name: 'cookie_slice',
    initialState:{},
    reducers: {
        get_all_cookies: (state) => {
            // if (typeof document !== 'undefined') {
            //   // Ensure this code runs only in a browser environment
            //   const cookies = document.cookie.split(';');
            //   for (const cookie of cookies) {
            //     const [cookie_name, cookie_value] = cookie.trim().split('=');
            //     state[cookie_name] = cookie_value;
            //   }
            // }
        }
    }
});
export const { get_all_cookies } = cookie_slice.actions;
export default cookie_slice.reducer;