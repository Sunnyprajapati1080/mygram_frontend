import BottomNav from "../components/BottomNav.js"
import Main from "../components/Main.js"
import Navbar from "../components/Navbar"

const Home = (props) => {
  return (
    <>
      <Navbar img={props.profileImg} />
      <Main posts={props.posts.length > 0 ? props.posts : []} />
      <BottomNav img={props.profileImg} />
    </>
  )
}
export async function getServerSideProps(context) {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/auth/getProfileImg`, {
    headers: {
      "token": context.req.cookies.token
    }
  })

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACK_HOST}/api/posts/getHomePosts`, {
    headers: {
      "token": context.req.cookies.token
    }
  })
  const resjson = await res1.json()
  console.log(resjson)
  if (resjson.name || resjson.message || resjson.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signup",
      },
    };
  }
  const postsjson = await res2.json()
  if (res1.status === 404) {
    return {
      props: { profileImg: "/profile.png", posts: postsjson.posts }
    }
  }

  if (resjson.profileImg === "" || resjson.profileImg === undefined) {
    return {
      props: { profileImg: "/profile.png", posts: postsjson.posts }
    }
  }
  return {
    props: { profileImg: resjson.profileImg, posts: postsjson.posts }
  }
}
export default Home