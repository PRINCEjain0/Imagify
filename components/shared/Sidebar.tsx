"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import navLinks from '@/constants/index'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"



const Sidebar = () => {
    const pathname = usePathname();
    const navlinksUp = navLinks.slice(0, 6).map((link) => {
        const isActive = link.route === pathname;

        return (
            <li
                key={link.route}
                className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                    }`}
            >
                <Link href={link.route} className="sidebar-link" >
                    <Image src={link.icon} alt={link.label} width={10} height={10} className={`${isActive && 'brightness-200'}`} />
                    {link.label}
                </Link>
            </li>
        );


    });
    const navlinksDown = navLinks.slice(6).map((link) => {
        const isActive = link.route === pathname;

        return (
            <li
                key={link.route}
                className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                    }`}
            >
                <Link href={link.route} className="sidebar-link" >
                    <Image src={link.icon} alt={link.label} width={10} height={10} className={`${isActive && 'brightness-200'}`} />
                    {link.label}
                </Link>
            </li>
        );


    });

    return (
        <aside className="sidebar">
            <div className='flex flex-col gap-4'>
                <Link href={'/'} className="sidebar-logo" >
                    <Image src={'/assets/images/logo-text.svg'} alt='logo' width={180} height={28} />

                </Link>
                <nav className="sidebar-nav">

                    <SignedIn >
                        <ul className="sidebar-nav_elements">
                            {navlinksUp}
                        </ul>
                        <ul className="sidebar-nav_elements">
                            {navlinksDown}
                            <li className=" flex size-full gap-4 p-4">
                                <UserButton showName />
                            </li>

                        </ul>
                    </SignedIn>
                    <SignedOut>

                        <Link href="/sign-in">
                            <Button className=" bg-purple-gradient bg-cover">
                                Login
                            </Button>
                        </Link>

                    </SignedOut>
                </nav>
            </div>
        </aside >
    );
}

export default Sidebar;
