import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {useSelector} from 'react-redux'

export default function middleware(req) {
  const  url = req.url
  console.log("middleware url => ", url);

  if (url.includes('/signin')) {
    return NextResponse.redirect('localhost:3000/signup')
  }
}
 
// export function middleware(request) {

//   const selector = useSelector();
//   let user_login_details = useSelector((state) => state.cookie_slice.siwes_user_login);

//   if (request.nextUrl.pathname.startsWith('/about')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url))
//   }
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
// }