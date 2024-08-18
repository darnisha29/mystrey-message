"use client"

import React from 'react'
import Link from 'next/link'
import { useSession ,signOut} from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './button'
export default function Navbar () {
  const {data: session} = useSession()


  const user:User = session?.user as User

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className = 'container mx-auto flex flex-col md:flex-row justify-between items-centes'>
        <a href="#" className='text-xl font-bold md-4 md:mb-0'>Mystrey Message</a>
        {
          session ? (
           <>
            <span className = 'mr-4'>Welcome, {user?.username || user?.email } </span>
            <Button onClick={() => signOut()} className='w-full md:w-auto'>Logout</Button>
           </>
          ) : (
            <Link href='/sign-in' className='w-full md:w-auto'>LogIn</Link>
          )
        }
      </div>
    </nav>
  )
}


