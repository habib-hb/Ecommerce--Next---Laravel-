'use client'


// import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar:React.FC<AvatarProps>= ({src}) => {
    if(src){
       return (<img 
        src={src}
        alt="Avatar"
        className="rounded-full h-[30px] w-[30px]"
        />)
    }
    return <FaUserCircle size={24}/>;
}
 
export default Avatar;