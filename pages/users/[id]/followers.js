import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import CustomNav from '../../../components/CustomNav'

const Followers = (props) => {
  const [followers] = useState(props.followers)

  const handleClick = () => {
    history.back()
  }
  return (
    <>
      <CustomNav title="Followers" img={props.profileImg} goback />
      {/* for mobile and tablets */}
      <div className='sm:hidden block'>
        {followers.length <= 0 ? <p className={`h-screen flex justify-center items-center`}>no followers yet!</p> :
          <div className='mt-[60px] md:mt-[66px] mx-auto mb-[60px] px-2 max-w-2xl'>
            {followers.map((follower, index) => {
              return (
                <div key={index} className="relative my-5">
                  <Link href={"/users/" + follower._id}><div className='absolute cursor-pointer'><Image quality={1} src={`${follower.profileImg === "" ? "/profile.png" :follower.profileImg}`} width={32} height={32} className="object-cover rounded-full" /></div></Link>
                  <Link href={"/users/" + follower._id}><p className='inline break-words font-semibold cursor-pointer ml-[38px]'>{follower.username}</p></Link>
                </div>
              )
            })}
          </div>
        }
      </div>
      {/* above mobile and tablets */}
      <div className='sm:block hidden my-3'>
        <div>
          <div className="border border-gray-200 relative mx-auto rounded-xl mt-[70px] w-[95vw] h-[85vh] max-h-[650px] max-w-[560px]">
            {/* top */}
            <div className='flex justify-between items-center py-2 border-b-2'>
              <BsArrowLeft onClick={handleClick} className='stroke-[0.5px] text-xl relative left-3 cursor-pointer' />
              <p className={`text-center font-semibold text-lg`}>Followers</p>
              <div></div>
            </div>
            {/* center*/}
            <div className='h-[calc(100%_-_85px)] p-2 overflow-auto'>
              {followers.map((follower, index) => {
                return (
                  <div key={index} className="mb-5">
                    <Link href={"/users/" + follower._id}><div className='float-left cursor-pointer'><Image quality={1} src={`${follower.profileImg === "" ? "/profile.png" :follower.profileImg}`} width={32} height={32} className="object-cover rounded-full" /></div></Link>
                    <Link href={"/users/" + follower._id}><p className='inline break-words cursor-pointer font-semibold ml-[8px] mr-1'>{follower.username}</p></Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getProfileImg`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/getfollowers/${context.query.id}`, {
    headers: {
      "token": context.req.cookies.token
    }
  })
  const followers = await response.json()
  if (res.status === 404) {
    return {
      props: { profileImg: "/profile.png",followers: followers.followers}
    }
  }
  if (resjson.profileImg === "" || resjson.profileImg === undefined) {
    return {
      props: { profileImg: "/profile.png",followers:followers.followers }
    }
  }
  return {
    props: { profileImg: resjson.profileImg,followers:followers.followers }
  }
}
export default Followers
