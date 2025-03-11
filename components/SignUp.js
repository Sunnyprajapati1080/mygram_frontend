/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useContext, useState } from 'react'
import { userContext } from '../contexts/userContext'

const SignUp = () => {
    const usercontext = useContext(userContext)
    const [fileName, setfileName] = useState("")
    const [errors, seterrors] = useState({ nameError: true, emailError: true, passwordError: true, name: false, email: false, password: false, fileError: false })
    const handleNameChange = (e) => {
        if (e.target.value.length > 0) { return seterrors({ ...errors, nameError: false, typing: true }) } else return seterrors({ ...errors, nameError: true, name: true })
    }
    const handleEmailChange = (e) => {
        const pett = /\w+@\w+\.\w+/
        if (pett.test(e.target.value) === true) { return seterrors({ ...errors, emailError: false, email: true }) } else return seterrors({ ...errors, emailError: true, email: true })
    }
    const handlePasswordChange = (e) => {
        if (e.target.value.length > 5) { return seterrors({ ...errors, passwordError: false, password: true }) } else return seterrors({ ...errors, passwordError: true, password: true })
    }

    const handleOnFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/webp", "image/png"];
        const isValid = validTypes.includes(file.type);

        seterrors({ ...errors, fileError: !isValid });

        if (!isValid) return;

        setfileName(file.name);
        console.log("Selected file:", file);
    };

    return (
        <div className="flex items-center min-h-screen bg-gray-100">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="hidden md:block md:w-1/2">
                        <img loading="lazy" className="object-cover w-full h-full rounded-l-xl hidden md:block" src="/signup.jpg" alt="img" />
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
                                Sign Up To Continue
                            </h1>
                            {usercontext.duplicate && <p className="text-rose-500 text-center">a user with this email already exists!</p>}
                            <form encType="multipart/form-data" onSubmit={usercontext.handleOnSignUp} className="relative">
                                <div>
                                    <label className="block text-sm">
                                        username
                                    </label>
                                    <input onChange={handleNameChange} autoComplete="true" name='username' type="text"
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Name" />
                                    {<p className={`text-rose-500 text-sm ${errors.nameError && errors.name ? "block" : "hidden"}`}>username is required!</p>}
                                    {<p className={`text-rose-500 text-sm ${usercontext.duplicateName ? "block" : "hidden"}`}>sorry! this username is unavailable!</p>}
                                </div>
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
                                    {<p className={`text-rose-500 text-sm ${errors.passwordError && errors.password ? "block" : "hidden"}`}>password must be at least 6 characters long!</p>}
                                </div>
                                <label htmlFor="profileImg" className="inline-block relative z-10 top-4 mb-4 text-base">
                                    <div className="text-sm bg-gray-800 hover:bg-gray-700 cursor-pointer text-white inline-block p-2 py-[10px] rounded">Choose Profile Picture</div>
                                    <span className="ml-2">{fileName}</span>
                                </label>
                                <input accept="image/*" onChange={handleOnFileUpload} type="file" id="profileImg" name="profileImg" className="hidden absolute mt-1" />
                                <button
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" disabled={errors.nameError === false && errors.emailError === false && errors.fileError === false && errors.passwordError === false ? false : true}>
                                    Sign up
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-sm">Already Have An Account? <Link href="/signin"
                                ><a className="text-blue-600 hover:underline"> Sign In.</a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp