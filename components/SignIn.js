/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useContext, useState } from 'react'
import { userContext } from '../contexts/userContext'

const SignIn = () => {
    const usercontext = useContext(userContext)
    const [errors, seterrors] = useState({ emailError: true, passwordError: true, email: false, password: false })
    const handleEmailChange = (e) => {
        const pett = /\w+@\w+\.\w+/
        if (pett.test(e.target.value) === true) { return seterrors({ ...errors, emailError: false, email: true }) } else return seterrors({ ...errors, emailError: true, email: true })
    }
    const handlePasswordChange = (e) => {
        if (e.target.value.length > 0) { return seterrors({ ...errors, passwordError: false, password: true }) } else return seterrors({ ...errors, passwordError: true, password: true })
    }
    return (
        <div className="flex items-center min-h-screen bg-gray-100">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="hidden md:block md:w-1/2">
                        <img loading="lazy" className="object-cover w-full h-full rounded-l-xl hidden md:block" src="/signin.jpg" alt="img" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <h1 className={`mb-4 text-2xl font-bold text-center text-gray-700`}>
                                Sign In To Continue
                            </h1>
                            {usercontext.wrongData && <p className="text-rose-500 text-center">please try to login with correct credentials!</p>}

                            <form onSubmit={usercontext.handleOnSignIn}>
                                <div className="mt-4">
                                    <label className="block text-sm">
                                        Email
                                    </label>
                                    <input onChange={handleEmailChange} autoComplete="true" name='email'
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Email Address" />
                                    {<p className={`text-rose-500 text-sm ${errors.emailError && errors.email ? "block" : "hidden"}`}>enter a valid email!</p>}
                                </div>
                                <div>
                                    <label className="block mt-4 text-sm">
                                        Password
                                    </label>
                                    <input onChange={handlePasswordChange} autoComplete="true" name='password'
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Password" type="password" />
                                    {<p className={`text-rose-500 text-sm ${errors.passwordError && errors.password ? "block" : "hidden"}`}>password cannot be blank!</p>}
                                </div>
                                <button
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" disabled={errors.emailError === false && errors.passwordError === false ? false : true}>
                                    Sign In
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-sm">don't have an account yet? <Link href="/signup"
                                ><a className="text-blue-600 hover:underline"> Sign Up.</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

