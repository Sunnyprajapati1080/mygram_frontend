import Image from 'next/image'
import Router from 'next/router'
import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import CustomNav from '../components/CustomNav'

const explore = (props) => {
    const [posts] = useState(props.posts.posts)
    const handlePush = (id)=>{
        Router.push("/posts/#"+id)
    }
    return (
        <>
            <CustomNav title="Explore" img={props.profileImg} />
            {posts.length > 0 ? <div className='max-w-[1000px] mt-[50px] sm:mt-[60px] grid grid-cols-3 gap-[3px] md:gap-[5px] p-1 mx-auto'>
                {posts.map((post, index) => {
                    return <Image quality={1} key={index} onClick={()=>handlePush(post._doc._id)} width={500} height={500} className="object-cover cursor-pointer" src={post._doc.img} alt="" />
                })}
            </div> :
                <div className='max-w-[500px] flex-col h-screen justify-center flex mx-auto'>
                    <Image quality={1} loading = "lazy" src="/empty.jpg" width={450} height={450} alt="" />
                    <h2 className='text-center text-lg md:text-2xl'>sorry! no posts found!</h2>
                </div>}
            <div className='mb-[54px]'></div>
            <BottomNav img={props.profileImg} />
        </>
    )
}

export async function getServerSideProps(context) {
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getProfileImg`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/getAllPosts`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const imgjson = await res1.json()
    if (imgjson.name && imgjson.message) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        };
    }
    const postsjson = await res2.json()
    if (imgjson.profileImg === "" || imgjson.profileImg === undefined) {
        return {
            props: { profileImg: "/profile.png", posts: postsjson }
        }
    }
    return {
        props: { profileImg:imgjson.profileImg, posts: postsjson }
    }
}
export default explore
