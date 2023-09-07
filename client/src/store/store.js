'use client'

import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import cookie_slice from './cookieSlice'
import { get_all_cookies } from './cookieSlice'

const store = configureStore({
    reducer: {

        'auth_slice': authSlice,
        'cookie_slice': cookie_slice,
    }

});


// dispatch all cookies immediately the app starts
store.dispatch(get_all_cookies());

export default store