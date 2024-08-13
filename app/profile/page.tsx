'use client'


import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";

const Profile = () => {

    // Retriving The user Data from backend database
    const [user , setUser] = useState<any>(null);

    const userAcc = localStorage.getItem('loggedInEmail');

    async function userDataExtraction() {
        await axios.post('http://127.0.0.1:8000/api/user_data_retrive' , {
            email : userAcc
        }).then((response) => {

            console.log('User Avatar from retrived data >>>' + response.data.avatar);

            // const userNameElement = document.getElementById('user_name');
            // userNameElement ? userNameElement.innerHTML = response.data.data.name : null;

            setUser(response.data.data);

            response.data.avatar && setUser((prev:any)=>({...prev, avatar : response.data.avatar}));

            setLoading(false);

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



    const [loading , setLoading] = useState(true);


    if(loading){ 

        return ( 
            <Container>
                <p className="p-8 text-3xl text-center">Loading...</p>
            </Container>
         );

    }
    else {   
        return ( 
            <Container>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl mt-8">Your Profile</h1>
                    <h2>Name: {user?.name}</h2>
                    <h2>Email: {user?.email}</h2>

                    {user?.avatar ? <img src={user?.avatar} alt="Avatar" height={200} width={200} /> : null}

                    {user?.avatar ? <a href='profile_picture'><h2 className="underline">Change Profile Picture</h2></a> : <a href='profile_picture'><h2 className="underline">Add Profile Picture</h2></a>}

                </div>
            </Container>
     );
}



}
 
export default Profile;