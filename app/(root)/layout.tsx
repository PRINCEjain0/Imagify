import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import Sidebar from '@/components/shared/sidebar'
import MobileNav from '@/components/shared/MobileNav'
// function Header() {
//     return (
//         <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>

//             <SignedIn>
//                 {/* Mount the UserButton component */}
//                 <UserButton />
//             </SignedIn>
//             <SignedOut>
//                 {/* Signed out users get sign in button */}
//                 <SignInButton />
//             </SignedOut>
//         </header>
//     )
// }


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='root'>
            <Sidebar />
            <MobileNav />
            <div className='root-container'>
                <div className='wrapper'>
                    {/* <Header /> */}
                    {children}
                </div>
            </div>
        </main>
    )
}

export default layout