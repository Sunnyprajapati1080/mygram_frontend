import { useContext, useRef, useState } from 'react'
import BottomNav from '../components/BottomNav'
import CustomNav from '../components/CustomNav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Router from 'next/router';

const Upload = (props) => {
    const [img, setimg] = useState("")
    const ref = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/webp") {
                ref.current.value = ""
                return toast.error('only png, jpg and webp file formats are supported!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark"
                });
            }

            const reader = new FileReader()
            reader.onload = () => {
                setimg(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("desc", e.target.desc.value);
        formData.append('img', e.target.upload.files[0]);
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posts/createPost`, {
            headers: {
                token: Cookies.get("token")
            },
            method: "POST",
            body: formData
        })
        const resjson = await res.json()
        if (resjson.success) {
            Router.push("/")
        }
    }
    const handleOnCancel = () => {
        setimg("")
        ref.current.value = ""
    }
    return (
        <>
            <CustomNav title="Upload" img={props.profileImg} />
            <div className={`mb-[50px] sm:mb-0 min-h-screen flex justify-center items-center`}>
                <div className='max-w-[450px] lg:max-w-[600px] mt-[50px] sm:mt-[60px] flex flex-col mx-auto p-2'>
                    <img loading="lazy" className='rounded mb-2' src={img} alt="" />
                    <form className='space-y-2 flex flex-col' onSubmit={handleOnSubmit}>
                        <textarea type="text" name='desc' placeholder='write description here...' className={`${img !== "" ? "block" : "hidden"} bg-transparent max-w-full resize-none p-1 outline-none focus:border-blue-500 border-2 border-transparent rounded`} />
                        <div className='flex justify-between flex-wrap-reverse'>
                            <label className={`max-w-32`} htmlFor="upload">
                                <div className={`${img === "" ? "inline-block" : "hidden"} bg-gradient-to-r from-pink-500 to-red-400 cursor-pointer text-white rounded-full text-base p-2 px-4`}>Upload Image</div>
                                <div className={`${img !== "" ? "inline-block" : "hidden"} bg-indigo-500 cursor-pointer hover:bg-indigo-400 text-white rounded text-base p-2 sm:px-4`}>Change</div>
                            </label>
                            <div className='flex space-x-2 flex-wrap'>
                                <div onClick={handleOnCancel} className={`${img !== "" ? "inline-block" : "hidden"} bg-rose-500 cursor-pointer mx-auto hover:bg-rose-400 text-white rounded text-base p-2 sm:px-4`}>Cancel</div>
                                <button className={`${img !== "" ? "inline-block" : "hidden"} bg-indigo-500 cursor-pointer mx-auto hover:bg-indigo-400 text-white rounded text-base p-2 sm:px-4`}>Post</button>
                            </div>
                        </div>
                        <input onChange={handleFileChange} ref={ref} type="file" name="upload" id="upload" className='hidden' />
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
                        <div>
                        </div>
                    </form>
                </div>
            </div>
            <BottomNav img={props.profileImg} />
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getProfileImg`, {
        headers: {
            "token": context.req.cookies.token
        }
    })
    if (res.status === 404) {
        return {
            props: { profileImg: "/profile.png" }
        }
    }
    const resjson = await res.json()
    if (resjson.name && resjson.message) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        };
    }
    if (resjson.profileImg === "" || resjson.profileImg === undefined) {
        return {
            props: { profileImg: "/profile.png", hello: 23 }
        }
    }
    return {
        props: { profileImg: resjson.profileImg }
    }
}
export default Upload
