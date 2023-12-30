import { cookies } from 'next/headers' 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid =  uidCookie ? uidCookie.value : null
    if (process.env.NODE_ENV !== 'development' && uid) {
      return NextResponse.redirect(new URL(`/shots/popular`, request.url))
    }
}
 
export const config = {
  matcher: ['/']
}