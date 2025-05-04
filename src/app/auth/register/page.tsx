"use client"
import IFormInput, { FormValidator } from '@/form-validator';
import { IApiResponse } from '@/types/api-response';
import { ILoginResponseData } from '@/types/login-response';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';
const register = () => {
    const [error, setError] = useState('');
    const validations: IFormInput[] = [
        {
            name: 'username',
            validate: val => /^[a-z][a-z0-9_.]{6,24}$/.test(val),
            error: 'Username is not valid',
            onerror: err => setError(err)
        },
        {
            name: 'password',
            validate: val => /[a-zA-Z0-9_.@$]{6,24}$/.test(val),
            error: 'Password is not valid',
            onerror: err => setError(err)
        }
    ];
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        if(!FormValidator.validate(formData, validations))
            return;
        const data = {
            username: formData.get('username'), 
            password: formData.get('password'),
            firstname: formData.get('firstname'), 
            lastname: formData.get('lastname')
        };
        await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(async res => {
            const result = await res.json() as IApiResponse<ILoginResponseData>;
            if(res.status !== 200){
                setError(result.message);
                return;
            }
            redirect('/');
        })
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
					alt="Your Company"
					src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Create new account
				</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					{error}
				</div> : ''}
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input type="text" name="firstname" id="firstname" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="alex" required />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input type="text" name="lastname" id="lastname" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="alex" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" name="username" id="username" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required />
                    </div>
                    
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default register;