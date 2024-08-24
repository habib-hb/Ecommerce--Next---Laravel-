'use client'
import axios from "axios";
import { useEffect } from "react";


// Operation : Extraction the email information from Laravel regarding Github Account
const GithubLogin = () => {

    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    let laravel_id = params.get('laravel_id');

    const fetchGithubInfo = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/get_github_info', { laravel_id: laravel_id },
            { withCredentials: true });

            console.log('Success');

            let github_email_data = response.data;

            typeof window !== 'undefined' && window?.localStorage.setItem('loggedInEmail', github_email_data.email);

            console.log('github email >>>', github_email_data.email);

            window.location.href = '/';

        } catch (error) {

            console.error('Failed', error);

        }
    };


    // Calling the above function within the useEffect
    useEffect(() => {

        fetchGithubInfo();
        
    }, [laravel_id]);
    

    return ( 
        <div className="m-auto text-center mt-[20vh]">Redirecting... </div>
     );
}
 
export default GithubLogin;