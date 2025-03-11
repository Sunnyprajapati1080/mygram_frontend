import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai"
import { CgAddR } from "react-icons/cg"
import { FiCompass } from "react-icons/fi"

const BottomNav = ({img}) => {
  return (
    <div className='border-t bg-white py-2 z-20 sm:hidden flex text-2xl justify-around fixed bottom-0 w-full'>
      <Link href="/"><div><AiOutlineHome className='cursor-pointer' /></div></Link>
      <Link href="/explore"><div><FiCompass className='cursor-pointer' /></div></Link>
      <Link href="/upload"><div><CgAddR className='cursor-pointer' /></div></Link>
      <Link href="/activity"><div><AiOutlineHeart className='cursor-pointer' /></div></Link>
      <Link href="/profile"><div><Image quality={1} alt="" src={img} width={25} height={25} className='object-cover cursor-pointer rounded-full' /></div></Link>
    </div>
  )
}
export default BottomNav
