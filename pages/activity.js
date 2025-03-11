import Image from 'next/image'
import BottomNav from '../components/BottomNav'
import CustomNav from '../components/CustomNav'
import Link from 'next/link'
import { useState } from 'react'

const Activity = (props) => {
    const [activities] = useState(props.activities)
    return (
        <>
            <CustomNav title="Activity" img={props.profileImg} />
            <div className={`mt-[45px] sm:mt-[80px] sm:border sm:rounded mb-[50px]  overflow-x-hidden max-w-[640px] mx-auto sm:max-h-[80vh] pr-1 overflow-y-auto`}>
                {activities.length === 0 ? <p className={`flex justify-center items-center h-[90vh]`}>no activities yet!</p> :
                    activities.map((activity, index) => {
                        return (
                            <div key={index} className='pb-1 my-3 ml-1.5 flex relative w-full space-x-2'>
                                <div>
                                    <Link href={`/users/${activity.id}`}><div><Image quality={1} src={activity.profileImg === "" ? "/profile.png" : activity.profileImg} className="min-w-[31px] min-h-[31px] object-cover rounded-full" width={31} height={31} /></div></Link>
                                </div>
                                {!activity.comment && <p className={`break-words ${activity.postImg && "pr-[36px]"}`}><Link href={`/users/${activity.id}`}><span className='break-words font-semibold'>{activity.username}</span></Link> {activity.message}</p>}
                                {activity.comment && <Link href={`/comments/${activity.postId}`}><p className={`break-words ${activity.postImg && "pr-[36px]"}`}><Link href={`/users/${activity.id}`}><span className='break-words font-semibold'>{activity.username}</span></Link> {activity.message}</p></Link>}
                                {activity.postImg && <Link href={"/posts#" + activity.postId}><div className='absolute right-1.5'><Image quality={1} src={activity.postImg === "" ? "/profile.png" :activity.postImg} width={31} height={31} className=" object-cover" /></div></Link>}
                            </div>
                        )
                    })}
            </div>
            <BottomNav img={props.profileImg} />
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

    const activitiesjson = await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/auth/getactivities`, {
        headers: {
            "token": context.req.cookies.token
        }
    })

    const resjson2 = await activitiesjson.json()
    if (res.status === 404) {
        return {
            props: { profileImg: "/profile.png", activities: resjson2.activities?resjson2.activities:[] }
        }
    }
    if (resjson.profileImg === "" || resjson.profileImg === undefined) {
        return {
            props: { profileImg: "/profile.png", activities: resjson2.activities?resjson2.activities:[]}
        }
    }
    return {
        props: { profileImg: resjson.profileImg, activities: resjson2.activities?resjson2.activities:[]}
    }
}
export default Activity