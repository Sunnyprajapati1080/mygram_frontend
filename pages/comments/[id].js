import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import CustomNav from '../../components/CustomNav'

const Comments = (props) => {
    const [comments, setcomments] = useState(props.comments)
    const [commentValue, setcommentValue] = useState("")
    const handleChange = (e) => {
        setcommentValue(e.target.value)
    }
    const handleComment = async () => {
        if (commentValue !== "") {
            scrollTo(0, 0)
            setcomments([{ message: commentValue, user: { _id: Cookies.get("id"), username: Cookies.get("username"), profileImg: props.img } }, ...comments])
            await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/posts/postcomment/${props.postId}`, {
                method: "POST",
                headers: {
                    token: Cookies.get("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment: commentValue })
            })
            setcommentValue("")
        }
    }
    const handleClick = () => {
        history.back()
    }
    return (
        <>
            <CustomNav title="Comments" img={props.profileImg} goback />
            {/* for mobile and tablets */}
            <div className='sm:hidden block'>
                {comments.length <= 0 ? <p className={`h-screen flex justify-center items-center`}>no comments yet!</p> :
                    <div className='mt-[56px] md:mt-[66px] mx-auto mb-[60px] px-2 max-w-2xl'>
                        {comments.map((comment, index) => {
                            return (
                                <div key={index} className="relative my-5">
                                    <Link href={"/users/" + comment.user._id}><div className='absolute cursor-pointer'><Image quality={1} src={`${comment.user.profileImg === "" ? "/profile.png" : comment.user.profileImg}`} width={30} height={30} className="object-cover rounded-full" /></div></Link>
                                    <Link href={"/users/" + comment.user._id}><p className='inline break-words font-semibold cursor-pointer ml-[38px] mr-1'>{comment.user.username}</p></Link>
                                    <p className='break-words inline leading-7'>{comment.message}</p>
                                </div>
                            )
                        })}
                    </div>
                }
                <div className='flex justify-around bg-gray-100 max-w-40 items-center w-full fixed bottom-0'>
                    <input value={commentValue} onChange={handleChange} type="text" className='w-[88%] p-2 pr-4 bg-gray-100 outline-none' placeholder='write comment...' />
                    <p onClick={handleComment} className='text-blue-600 relative cursor-pointer right-2 font-semibold'>send</p>
                </div>
            </div>
            {/* above mobile and tablets */}
            <div className='sm:block hidden my-3'>
                <div>
                    <div className="border-2 border-gray-100 relative mx-auto rounded-xl mt-[70px] w-[95vw] h-[85vh] max-h-[650px] max-w-[660px]">
                        {/* top */}
                        <div className='flex justify-between items-center py-2 border-b'>
                            <BsArrowLeft onClick={handleClick} className='stroke-[0.5px] text-xl relative left-3 cursor-pointer' />
                            <p className={`text-center font-semibold text-lg`}>Comments</p>
                            <div></div>
                        </div>
                        {/* center*/}
                        <div className='h-[calc(100%_-_85px)] p-2 overflow-auto'>
                {comments.length <= 0 ? <p className={` h-full flex justify-center items-center`}>no comments yet!</p> :
                            comments.map((comment, index) => {
                                return (
                                    <div key={index} className="mb-5">
                                        <Link href={"/users/" + comment.user._id}><div className='float-left cursor-pointer'><Image quality={1} src={`${comment.user.profileImg === "" ? "/profile.png" :comment.user.profileImg}`} width={30} height={30} className="object-cover rounded-full" /></div></Link>
                                        <Link href={"/users/" + comment.user._id}><p className='inline break-words cursor-pointer font-semibold ml-[8px] mr-1'>{comment.user.username}</p></Link>
                                        <p className='break-words inline leading-7'>{comment.message}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {/* bottom*/}
                        <div className='flex absolute bottom-0 justify-around bg-gray-100 max-w-40 items-center w-full'>
                            <input value={commentValue} onChange={handleChange} type="text" className='w-[92%] p-2 pr-4 bg-gray-100 outline-none' placeholder='write comment...' />
                            <p onClick={handleComment} className='text-blue-600 relative cursor-pointer right-2 font-semibold'>send</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/auth/getProfileImg`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/posts/getcomments/${context.query.id}`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    const post = await response.json()
    if (res.status === 404) {
        return {
            props: { img: resjson.profileImg, profileImg: "/profile.png", postId: post._id, comments: post.comments }
        }
    }
    if (resjson.profileImg === "" || resjson.profileImg === undefined) {
        return {
            props: { img: resjson.profileImg, profileImg: "/profile.png", postId: post._id, comments: post.comments }
        }
    }
    return {
        props: { img: resjson.profileImg, profileImg:resjson.profileImg, comments: post.comments, postId: post._id }
    }
}
export default Comments
