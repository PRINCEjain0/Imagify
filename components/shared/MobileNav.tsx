"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants/index'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"




const MobileNav = () => {
    const pathname = usePathname();
    const navlinksUp = navLinks.map((link) => {
        const isActive = link.route === pathname;

        return (
            <li
                key={link.route}
                className={` header-nav_element ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                    }`}
            >
                <Link href={link.route} className="sidebar-link" >
                    <Image src={link.icon} alt={link.label} width={24} height={10} className={`${isActive && 'brightness-200'}`} />
                    {link.label}
                </Link>
            </li>
        );


    });

    return (
        <header className='header'>

            <Link href={'/'} className="" >
                <Image src={'/assets/images/logo-text.svg'} alt='logo' width={180} height={28} />

            </Link>

            <nav className="flex gap-2">
                <SignedIn>

                    <ul>
                        <li className=" flex size-full gap-4 p-4">
                            <UserButton />
                        </li>
                    </ul>

                    <Sheet >
                        <SheetTrigger>
                            <Image src={'/assets/icons/menu.svg'} alt='logo' width={32} height={10} />

                        </SheetTrigger>
                        <SheetContent className="h-full w-64 sm:w-80 md:hidden">
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                                <SheetDescription>


                                </SheetDescription>
                            </SheetHeader>
                            <Link href={'/'} className="" >
                                <Image src={'/assets/images/logo-text.svg'} alt='logo' width={180} height={28} />

                            </Link>
                            <ul className="header-nav_elements">
                                {navlinksUp}
                            </ul>
                        </SheetContent>
                    </Sheet>

                </SignedIn>
                <SignedOut>

                    <Link href="/sign-in">
                        <Button className=" bg-purple-gradient bg-cover">
                            Login
                        </Button>
                    </Link>

                </SignedOut>
            </nav>
        </header>
    )
}

export default MobileNav