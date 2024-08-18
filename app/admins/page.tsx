'use client'

import Container from "../components/Container";
import axios from "axios";
import { useEffect, useState } from "react";

const Admins = () => {


    const [admins , setAdmins] = useState<any>([]);

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

    const [targetedAdmin, setTargetedAdmin] = useState<any>('');

    const [hideTargetedAdmins, setHideTargetedAdmins] = useState<any>([]);

    const [checked_unauthorized, setChecked_unauthorized] = useState(false);


    //Extracting the Admins data from laravel backend
    async function fetchAdmins() {
        await axios.get('http://127.0.0.1:8000/api/admins?email='+localStorage.getItem('loggedInEmail'))
         .then((response) => {
 
             console.log(response.data);
 
             setAdmins(response.data);
 
         })
         .catch((error) => {
             console.error(error);
 
             alert(error.response.data.message);
 
             if(error.response.data.message == 'Admin not found. Thus the request for the data has been denied.'){
                 setChecked_unauthorized(true);
             }
 
         });
     }



     // Calling the above function within the useEffect
    useEffect(() => {
        fetchAdmins();
    }, [])



    async function deleteAdmin(admin_id : any) {
        const response = await fetch(`http://127.0.0.1:8000/api/dashboard/admin_delete/${admin_id}?email=${localStorage.getItem('loggedInEmail')}`);
        if(response.ok){
            alert('Admin Deleted');
            setDialogBoxOpen(false);
            setHideTargetedAdmins([...hideTargetedAdmins, admin_id]);
        }else{
            alert('Something went wrong');
        }
    }


    if(admins.length > 0){

    return ( 
        <Container>

           <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Admins</h1>

           {admins.map((admin:any)=>{
                return (
                    <div className={`flex flex-col justify-center items-center p-8 border border-black rounded-lg mb-4 shadow-lg ${dialogBoxOpen ? 'opacity-50' : ''} ${hideTargetedAdmins.includes(admin.user_id) ? 'hidden' : ''}`}>
                        
                        <img src={admin.customer_avatar} alt={admin.customer_name} className="w-64 h-64 rounded-full mb-4" />
                        <h1 className="text-2xl font-bold">{admin.customer_name}</h1>
                        <p>{admin.admin_email}</p>
                        <button className="bg-red-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={() => {setDialogBoxOpen(true); setTargetedAdmin(admin.user_id)}}>Delete</button>


                    </div>
                )
            })}


        </Container>
     );

    }else{

            if(checked_unauthorized){
                return (
                    <Container>
                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Admins</h1>
                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Unauthorized</h1>
                    </Container>
                )
            }else{
                return (
                    <Container>
                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Admins</h1>
                        <h1 className="text-3xl text-center p-4  max-w-[400px] mx-auto my-8">Loading...</h1>
                    </Container>
                )
            }

    }
}
 
export default Admins;