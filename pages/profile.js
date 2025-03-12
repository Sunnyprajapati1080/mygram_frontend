import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useContext, useState } from 'react'
import { GoSignOut } from "react-icons/go"
import BottomNav from '../components/BottomNav'
import Navbar from '../components/Navbar'
import { userContext } from "../contexts/userContext"

const Profile = (props) => {
    const { handleSignOut } = useContext(userContext)
    const [posts] = useState(props.posts)
    const handlePush = (id)=>{
        Router.push("/posts/#"+id)
    }
    return (
        <>
            <div className='z-10 border-b sm:hidden h-12 fixed top-0 left-0 w-full bg-white'>
                <p className='text-center relative top-[12px] font-semibold text-lg'>Profile</p>
                <GoSignOut onClick={handleSignOut} className="cursor-pointer absolute text-xl top-4 right-2" />
            </div>
            <Navbar classes="hidden sm:block" img={props.userDetails.profileImg} />
            <div className="max-w-[400px] mx-auto py-3 grid place-items-center mt-[50px]">
                <Image quality={1} width={96} height={96} loading="lazy" src={props.userDetails.profileImg} className="rounded-full object-cover object-center" />
                <h2 className='text-xl relative font-[500]'>{props.userDetails.username}</h2>
                <div className='max-w-[400px] mt-3'>
                    <div className='flex space-x-5 flex-wrap text-center'>
                        <p className='after:content-["posts"] font-medium after:font-normal after:block'>{posts.length}</p>
                        <Link href={`/users/${props.userDetails._id}/followers`}><p className='after:content-["followers"] font-medium after:font-normal after:block'>{props.userDetails.followers.length}</p></Link>
                        <Link href={`/users/${props.userDetails._id}/following`}><p className='after:content-["following"] font-medium after:font-normal after:block'>{props.userDetails.following.length}</p></Link>
                    </div>
                </div>
            </div>

            {posts.length === 0 ? <div className='flex flex-col items-center max-w-[500px] mx-auto'> <Link href={"/upload"}><div className='text-center my-[20px] bg-pink-500 hover:bg-pink-600 cursor-pointer text-white p-2 w-28 rounded'>Create Post</div></Link> <a ><Image quality={1} src="/empty.jpg" width={500} height={500} alt="no posts!" /></a></div> : <div className='max-w-[900px] p-1 mx-auto grid grid-cols-3 gap-1'>
                {posts.map((post, index) => {
                    return <Image quality={1} onClick={()=>{handlePush(post._id)}} key={index} width={500} height={500} className="object-cover cursor-pointer" src={post.img} alt="" />
                })}
            </div>}
            <div className='mb-[50px]'></div>
            <BottomNav img={props.userDetails.profileImg} />
        </>
    )
}

export async function getServerSideProps(context) {
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getUserDetails`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const resjson = await res1.json()
    if (resjson._id === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
            props: {},
        };
    }
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/getOwnPosts`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const postsjson = await res2.json()
    if (resjson.profileImg === "") {
        return {
            props: { userDetails: { ...resjson, profileImg: "/profile.png" }, posts: postsjson }
        }
    }
    return {
        props: { userDetails: resjson, posts: postsjson }
    }
}
export default Profile
