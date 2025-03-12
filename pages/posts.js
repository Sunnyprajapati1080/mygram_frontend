import Image from 'next/image'
import React, { useState } from "react"
import BottomNav from '../components/BottomNav'
import CustomNav from '../components/CustomNav'
import PostCard from '../components/PostCard'

const Posts = (props) => {
    const [posts] = useState(props.posts)
    return (
        <>
            <CustomNav title="Posts" img={props.profileImg} />
            <div id='posts_container' className='mb-[103px] sm:mb-0 max-w-[600px] flex flex-col relative top-12 mx-auto'>
                {posts.length === 0 ? <div className='flex p-2 justify-center text-center flex-col items-center max-w-[500px] mx-auto'><a ><Image quality={1} src="/empty.jpg" width={450} height={450} alt="no posts!" /></a> <h3 className='text-lg font-semibold'>sorry! no posts found!</h3></div> :
                    posts.map((post, index) => {
                        return <PostCard key={index} liked={post.liked} postId={post._doc._id} comments={post._doc.comments} profileUrl={post._doc.user._id} likes={post._doc.likes} desc={post._doc.desc} username={post._doc.user.username} profileImg={post._doc.user.profileImg === "" ? "/profile.png" : `${post._doc.user.profileImg}`} image={`${post._doc.img}`} />
                    })}
            </div>
            <BottomNav img={props.profileImg} />
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/getAllPosts`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const resjson = await res.json()
    if (resjson.name && resjson.message) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        };
    }
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getProfileImg`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    if (res1.status === 404) {
        return {
            props: { posts: resjson, profileImg: "/profile.png" }
        }
    }
    const imgjson = await res1.json()

    if (imgjson.profileImg === "" || imgjson.profileImg === undefined) {
        return {
            props: { posts: resjson.posts, profileImg: "/profile.png" }
        }
    }
    return {
        props: { posts: resjson.posts, profileImg:imgjson.profileImg }
    }
}
export default Posts