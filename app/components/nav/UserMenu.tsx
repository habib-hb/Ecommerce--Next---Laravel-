"use client";

import { useCallback , useEffect, useState } from "react";

import Avatar from "../Avatar";

import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import axios from "axios";


interface UserMenuProps{
    currentUser: SafeUser  |  null
}


const UserMenu: React.FC<UserMenuProps> = ({currentUser})=> {

  
    // Retriving The user Data from backend database
    const [user , setUser] = useState<any>(null);

    const userAcc = typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : '';

    async function userDataExtraction() {
        await axios.post('http://127.0.0.1:8000/api/user_data_retrive' , {
            email : userAcc
        }).then((response) => {

            console.log('User Avatar from retrived data >>>' + response.data.avatar);

            // const userNameElement = document.getElementById('user_name');
            // userNameElement ? userNameElement.innerHTML = response.data.data.name : null;

            setUser(response.data.data);

            setUser((prev:any)=>({...prev, avatar : response.data.avatar}));

        }).catch((error) => {

            console.error('Something went wrong in the user data extraction >>>' + error);

        });
    }

    
        useEffect(() => {

            if(userAcc && user == null) {

                userDataExtraction();

             }

        }, []);
        
    

    // End Retriving



    const [isOpen , setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setIsOpen((prev) => !prev)
    }, [])



    // Logout Functionality
    async function logoutProcess() {
        await axios.post('http://127.0.0.1:8000/api/logout' , {email :  typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''})
        .then((response) => {
            alert('It was successfull and the data is >>>' + response.data.message);
        })
        .catch((error) => {
            alert('Something Went wrong')
            console.error(error);
        });

        typeof window !== 'undefined' ? window?.localStorage.removeItem('loggedInEmail') : '';
        typeof window !== 'undefined' ? window?.localStorage.removeItem('eShopCartItems') : '';
        window.location.href = '/';
    }

    return (
    <>
    <div className="relative z-30">
        <div onClick={toggleOpen}
         className="
            p-2
            border-[1px]
            border-slate-400
            flex
            flex-row
            items-center
            gap-1
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            text-slate-700
         "
        >
            {user?.avatar ? <Avatar src={user.avatar} /> : <Avatar />}
            <AiFillCaretDown/>
        </div>
        {isOpen && (
            <div className="
                absolute
                rounded-md
                shadow-md
                w-[170px]
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                flex
                flex-col
                cursor-pointer

            ">
                {/* {currentUser ?                ( <div> */}
                {user ?                ( <div>
                    <p id='user-name' className='p-4'>{user.name}</p><hr />

                    <Link href="/cart">
                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                    </Link>

                    <Link href="/profile">
                    <MenuItem onClick={toggleOpen}>Your Profile</MenuItem>
                    </Link>
                    
                    {/* Input into product database option */}
                    <Link href="/dashboard">
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                    </Link>
                    <hr/>
                    <MenuItem onClick={()=>{
                        toggleOpen();
                        // signOut();

                        // Logout Procedure
                        logoutProcess();
                        }}>Logout</MenuItem>
               
                </div>) :  ( <div>
                <Link href="/login">
                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                    </Link>

                    <Link href="/register">
                    <MenuItem onClick={toggleOpen}>Register</MenuItem>
                    </Link>
                </div>)}
            </div>
        )}
    </div>
    {isOpen ? <BackDrop onClick={toggleOpen}/> : null }
    </>
    );
};

export default UserMenu;


