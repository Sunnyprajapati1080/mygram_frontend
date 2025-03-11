import { BsArrowLeft } from 'react-icons/bs'
import Navbar from './Navbar'

const customNav = ({ title, img, goback }) => {
    const handleClick = () => {
        history.back()
    }
    return (
        <>
            <div className={`z-10 border-b sm:hidden h-12 fixed top-0 left-0 w-full bg-white ${goback ? "flex justify-between items-center" : ""}`}>
                {goback ? <BsArrowLeft onClick={handleClick} className='stroke-[0.5px] text-xl relative left-3 cursor-pointer' /> : null}
                <p className={`text-center relative ${goback ? null : "top-[12px]"} font-semibold text-lg`}>{title}</p>
                {goback ? <div></div> : null}
            </div>
            <Navbar classes="hidden sm:block" img={img} />
        </>
    )
}

export default customNav
