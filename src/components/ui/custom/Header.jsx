import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/dashboard'}>
            <img src='/logo.svg' className='cursor-pointer'  />
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
  )
}

export default Header