"use client";
import { IApiResponse } from '@/types/api-response';
import { ILoginResponseData } from '@/types/login-response';
import { redirect } from 'next/navigation';
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import IFormInput, { FormValidator } from '@/form-validator';
import Image from 'next/image';
const Login = () => {
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
			password: formData.get('password')
		};
		await fetch('/api/auth/login', {
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
				<Image
					alt="Your Company"
					src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>

				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					{error}
				</div> : ''}
				<form onSubmit={onSubmit} className="space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
							Username
						</label>
						<div className="mt-2">
							<input
								id="username"
								name="username"
								type="text"
								required
								autoComplete="username"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
								Password
							</label>
							<div className="text-sm">
								<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Not a member?{' '}
					<Link href="register" className="font-semibold text-indigo-600 hover:text-indigo-500">
						Register now
					</Link>
				</p>
			</div>
		</div>
	)
}
export default Login;