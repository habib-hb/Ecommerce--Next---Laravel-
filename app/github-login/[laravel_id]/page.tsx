'use client'
import axios from "axios";
import { useEffect } from "react";


// Operation : Extraction the email information from Laravel regarding Github Account
const GithubLogin =({params}: any) => {



    const fetchGithubInfo = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/get_github_info', { laravel_id: params.laravel_id });

            console.log('Success');

            let github_email_data = response.data;

            localStorage.setItem('loggedInEmail', github_email_data.email);

            console.log('github email >>>', github_email_data.email);

            window.location.href = '/';

        } catch (error) {

            console.error('Failed', error);

        }
    };


    // Calling the above function within the useEffect
    useEffect(() => {

        fetchGithubInfo();
        
    }, [params.laravel_id]);
    

    return ( 
        <div className="m-auto text-center mt-[20vh]">Redirecting... </div>
     );
}
 
export default GithubLogin;