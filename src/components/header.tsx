"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { redirect } from 'next/navigation';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
    <header>
        <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold">
            Logo
            </Link>
            <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
            </button>
            <div className={`flex-col md:flex md:flex-row ${navOpen ? 'flex' : 'hidden'} md:flex`}>
            <Link href="/" className="p-2">Home</Link>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={
                () => fetch('/api/auth/logout', {
                    method: 'POST'
                }).then(res => redirect('/'))
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