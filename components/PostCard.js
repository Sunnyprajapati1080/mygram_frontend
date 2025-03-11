import Cookies from "js-cookie"
import Image from "next/image"
import Link from 'next/link'
import { useState } from "react"
import { BsHeartFill, BsThreeDots } from "react-icons/bs"
import { FaRegComment } from "react-icons/fa"
import { FiHeart, FiSend } from 'react-icons/fi'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const PostCard = (props) => {
    const [likes, setlikes] = useState(props.likes)
    const [liked, setliked] = useState(props.liked)
    const [desc] = useState(props.desc)
    const [toggleDesc, settoggleDesc] = useState(false)

    const handleImage = (e) => {
        if (e.target.previousElementSibling) { e.target.previousSibling.remove() }
        if (e.target.parentElement.style) { e.target.parentElement.style = "" }
    }

    const handleLike = async () => {
        setliked(!liked)
        if (!liked) {
            setlikes(likes + 1)
        } else {
            setlikes(likes - 1)
        }
        await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/posts/updateLikes/${props.postId}`, {
            headers: {
                "token": Cookies.get("token")
            },
            method: "PATCH"
        })
    }
    const showDevInfo = () => {
        return toast.warn('this feature is coming soon!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark"
        });
    }
    return (
        <>
            {/* card */}
            <div id={props.postId} className='border-b'>
                {/* top actions*/}
                <div className='p-1 py-2 mt-1 flex justify-between'>
                    <div className='flex space-x-1'>
                        <Link href={`users/${props.profileUrl}`}><div><Image quality={1} src={props.profileImg} width={28} height={28} className='object-cover rounded-full cursor-pointer' alt="" /></div></Link>
                        <Link href={`users/${props.profileUrl}`}><p className='relative left-1 cursor-pointer font-medium'>{props.username}</p></Link>
                    </div>
                    {/* context menu */}
                    <div onClick={showDevInfo}>
                        <BsThreeDots className='mt-1 relative right-1 cursor-pointer text-xl text-gray-800' />
                    </div>
                </div>
                {/* post*/}
                <Image quality={1} src={props.image} width={600} height={400} onLoad={handleImage} className="image" alt="" />
                {/* bottom actions */}
                <div id='bottom_actions' className='p-2 mt-1 flex justify-between'>
                    <div className='flex space-x-3'>
                        {liked ? <BsHeartFill onClick={handleLike} className=' text-rose-400 transition-opacity duration-300 ease-in-out cursor-pointer text-[22px]' /> : <FiHeart onClick={handleLike} className='cursor-pointer text-[22px]' />}
                        <Link href={`/comments/${props.postId}`}><div><FaRegComment className='cursor-pointer text-[22px]' /></div></Link>
                        <FiSend className='cursor-pointer text-[22px]' onClick={showDevInfo} />
                    </div>
                </div>
                <p className='font-semibold ml-2 mb-1'>{likes} likes</p>
                {props.comments.length > 0 && <Link href={`/comments/${props.postId}`}><p className='font-semibold  text-sm ml-2 mb-1 cursor-pointer text-gray-500'>{props.comments.length === 1 ? "view 1 comment" : `view all ${props.comments.length} comments`}</p></Link>}
                {/* desc */}
                <p className="m-2 mt-1">{desc.length > 80 ? <>{toggleDesc ? desc : `${desc.slice(0, 80)}`}<span className="font-semibold cursor-pointer" onClick={() => settoggleDesc(!toggleDesc)}>{toggleDesc ? " hide" : " show more.."}</span></> : desc}</p>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
        </>
    )
}
export default PostCard