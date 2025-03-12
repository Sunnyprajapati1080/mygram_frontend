import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import BottomNav from '../../components/BottomNav'
import Navbar from '../../components/Navbar'

const getUser = (props) => {
    const [posts] = useState(props.posts)
    const [user] = useState(props.user)
    const [followed, setfollowed] = useState(props.followed)
    const handlePush = (id) => {
        Router.push("/posts/#" + id)
    }

    const handleFollowing = async () => {
        setfollowed(!followed)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/updateFollowers/${user._id}`, {
            headers: {
                "token": Cookies.get("token")
            },
            method: "PATCH"
        })
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/updateFollowing/${user._id}`, {
            headers: {
                "token": Cookies.get("token")
            },
            method: "PATCH"
        })
    }
    return (
        <>
            <div className='z-10 border-b sm:hidden h-12 fixed top-0 left-0 w-full bg-white'>
                <p className='text-center relative top-[12px] font-semibold text-lg'>Profile</p>
            </div>
            <Navbar classes="hidden sm:block" img={props.profileImg} />
            <div className="max-w-[400px] mx-auto py-3 grid place-items-center mt-[50px]">
                <Image quality={1} width={96} height={96} src={user.profileImg === "/profile.png" ? "/profile.png" :user.profileImg} className="rounded-full object-cover object-center" />
                <h2 className='text-xl relative font-[500]'>{user.username}</h2>
                <div className='max-w-[400px] mt-3'>
                    <div className='flex space-x-5 flex-wrap text-center'>
                        <p className='after:content-["posts"] font-medium after:font-normal after:block'>{posts.length}</p>
                        <Link href={`/users/${user._id}/followers`}><p className='after:content-["followers"] font-medium after:font-normal after:block'>{user.followers.length}</p></Link>
                        <Link href={`/users/${user._id}/following`}><p className='after:content-["following"] font-medium after:font-normal after:block'>{user.following.length}</p></Link>
                    </div>
                </div>
                <div>
                    <button onClick={handleFollowing} className={`${followed ? "font-semibold text-rose-400 border-none bg-none transition-colors" : "text-white transition-colors border-rose-400 bg-rose-400"} mt-2 rounded-full border-2 w-[110px] h-10 text-lg `}>{followed ? "following" : "follow"}</button>
                </div>
            </div>

            {posts.length === 0 ? <div className='flex items-center max-w-[500px] mx-auto'><a ><Image quality={1} src="/empty.jpg" width={500} height={500} alt="no posts!" /></a></div> : <div className='max-w-[900px] p-1 mx-auto grid grid-cols-3 gap-1'>
                {posts.map((post, index) => {
                    return <Image quality={1} onClick={() => { handlePush(post._id) }} key={index} width={500} height={500} className="object-cover cursor-pointer" src={post.img} alt="" />
                })}
            </div>}
            <div className='mb-[50px]'></div>
            <BottomNav img={props.profileImg === "/profile.png" ? "/profile.png" : props.profileImg} />
        </>
    )
}

export async function getServerSideProps(context) {
    const imgjson = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getProfileImg`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const img = await imgjson.json()
    if (img.name && img.message) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        };
    }
    const userjson = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser/${context.query.id}`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    if (userjson.status === 500) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    const user = await userjson.json()
    if (user.own) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            }
        }
    }
    const postsjson = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/getUserPosts/${context.query.id}`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const posts = await postsjson.json()
    let props = { profileImg: img.profileImg, followed: user.followed, user: user._doc, posts }
    if (props.profileImg === "") {
        props.profileImg = "/profile.png"
    }
    if (props.user.profileImg === "") {
        props.user.profileImg = "/profile.png"
    }
    return {
        props: props
    }
}
export default getUser
