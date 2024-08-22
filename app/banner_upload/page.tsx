'use client'


import axios from "axios";
import Container from "../components/Container";
import { useEffect } from "react";

const Banner = () => {

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let profileImageFile = formData.get('banner_picture');
        let user_email = formData.get('admin_email');

        let formDataToSend = new FormData();
        formDataToSend.append('admin_email' , user_email ?? '');
        formDataToSend.append('banner_picture' , profileImageFile ?? '');


        axios.post('http://127.0.0.1:8000/api/dashboard/banner_picture_upload' , formDataToSend)
        .then((response) => {
            console.log('Success:', response.data);

            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error:', error);

            alert('Something Went Wrong');
        });

    }

    
    let user_email:any = "";

    useEffect(() => {
        user_email = typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : '';
    }, []);

    return ( 
        <Container>

            <div>

                <h1 className="text-3xl text-center p-8">Upload Banner</h1>

                <form onSubmit={formSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center gap-4">

                    <input type="file" name="banner_picture" className="border border-black p-8 rounded-lg"/>

                    <input type="hidden" name='admin_email' value={user_email ? user_email : ''} />

                    <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">Upload</button>

                </form>

            </div>

        </Container>
     );
}
 
export default Banner;