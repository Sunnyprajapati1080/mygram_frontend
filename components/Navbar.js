import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai"
import { CgAddR } from "react-icons/cg"
import { FiCamera, FiCompass } from "react-icons/fi"
import { GoSignOut } from "react-icons/go"
import { userContext } from '../contexts/userContext'

const Navbar = (props) => {
    const { handleSignOut } = useContext(userContext)

    return (
        <>
            <div className={`py-2 z-10 border-b h-14 fixed top-0 left-0 w-full transition-colors bg-white ${props.classes}`}>
                <div className="container flex items-center sm:items-stretch justify-between lg:justify-evenly max-w-[1536px] h-full mx-auto">
                    <Link href="/upload"><div><FiCamera className={`cursor-pointer text-[22px] sm:hidden relative left-3`} /></div></Link>
                    <p className='font-semibold relative right-2 text-xl font-[cursive]'>MicroGram</p>
                    <div></div>
                    <div className='lg:block hidden'>
                        <input type="text" className='bg-gray-200 h-[95%] px-2 lg:relative outline-none w-64 rounded' placeholder='search username' />
                    </div>
                    <div className='nav-actions mx-4 hidden sm:flex sm:justify-between sm:space-x-5 text-2xl my-auto'>
                        <Link href="/"><div><AiOutlineHome className='cursor-pointer' /></div></Link>
                        <Link href="/explore"><div><FiCompass className='cursor-pointer' /></div></Link>
                        <Link href="/upload"><div><CgAddR className='cursor-pointer' /></div></Link>
                        <Link href="/activity"><div><AiOutlineHeart className='cursor-pointer' /></div></Link>
                        <Link href="/profile"><div><Image quality={1} src={props.img} width={24} height={24} className='cursor-pointer object-cover rounded-full' /></div></Link>
                        <GoSignOut onClick={handleSignOut} className="cursor-pointer text-xl mt-1" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
