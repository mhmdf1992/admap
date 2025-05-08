"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { redirect, usePathname } from 'next/navigation';
import './header.css';
import { IJWTPayload, UserRole } from '@/types/jwt-payload';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [me, setMe] = useState<IJWTPayload>();
    const pathname = usePathname()
    const inRoute = (route: string) => pathname === route;
    useEffect(() => {
        const me = localStorage.getItem('me');
        if(me)
            setMe(JSON.parse(me) as IJWTPayload);
    },[])
    return (
    <header>
        <nav className="bg-white shadow-md">
        <div className="max-w-8xl mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold">
                <img
                    height={10}
                    width={1}
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
            </Link>
            <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
            </button>
            <div className={`flex-col md:flex md:flex-row ${navOpen ? 'flex' : 'hidden'} md:flex`}>
            <Link href="/" className="p-2 menu-item"><span className={`linkText ${inRoute('/') ? 'selected' : ''}`}>Home</span></Link>
            <Link href="/ads" className="p-2 menu-item"><span className={`linkText ${inRoute('/ads') ? 'selected' : ''}`}>Ads</span></Link>
            {me?.role === UserRole.ADMIN ? '' :<Link href="/my-ads" className="p-2 menu-item"><span className={`linkText ${inRoute('/my-ads') ? 'selected' : ''}`}>My Ads</span></Link>}
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={
                () => fetch('/api/auth/logout', {
                    method: 'POST'
                }).then(() => redirect('/'))
            }>
                Logout
            </button>
            </div>
        </div>
        </nav>
    </header>
    );
};

export default Header;