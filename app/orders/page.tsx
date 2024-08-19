'use client'


import { useEffect, useState } from "react";
import Container from "../components/Container";

const Orders = () => {
    const [orders , setOrders] = useState<any>([]);

    async function fetchAllOrdersData() {

        const response = await fetch('http://127.0.0.1:8000/api/dashboard/all_orders_data');

        if(response.ok) {

            let json_response = await response.json();

            setOrders(json_response);

                    // alert('Data Retrived for ' + json_response[0].user_id);

        }else{

            let json_response = await response.json();

            alert(json_response.message);

        }

    }


    useEffect(() => {

        orders.length == 0 && fetchAllOrdersData();
        
    }, [])


    if(orders?.length > 0) {

        // [{"id":1,"name":"iphone 14","description":"Short description","category":"Phone","brand":"apple","selectedImg":{"image":"https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg","color":"White","colorCode":"#FFFFFF"},"quantity":2,"price":"2999.00"},{"id":26,"name":"really!","description":"fdsf","category":"trt","brand":"dsfd","selectedImg":{"image":"http://127.0.0.1:8000/storage/images/rokia afzal.jpeg","color":"rokia afzal","colorCode":"#ff2245"},"quantity":2,"price":"454.00"}]

        return ( 

                <Container>

                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8 rounded-lg">All Orders</h1>

                    {orders.map((order : any) => {
                            let orderDataJson = JSON.parse(order.orders_data);

                    return (
                        // The user specific Data
                        <div key={Math.random()} className="text-2xl bg-slate-50 text-black border-2 border-black rounded-lg p-8 mt-2 mb-16 cursor-pointer w-[90vw] md:w-[60vw] text-center shadow-xl mx-auto">

                                        <div className="my-4">
                                                <img src={order.customer_avatar} alt="USER" className="h-[400px] mx-auto rounded-lg border border-black" />

                                               

                                                <h1 className="text-2xl font-bold">Name: <span className="text-lg font-semibold">{order.name}</span></h1>

                                                <h1 className="text-2xl font-bold">Email: <span className="text-lg font-semibold">{order.email}</span></h1>
                                            </div>


                            { orderDataJson.map((data : any) => {

                                    // The products data
                                    return (
                                            <div>

                                            <div className="w-[90%] mx-auto bg-slate-200 p-8 rounded-lg my-8">
                                                <img src={data.selectedImg.image} alt="" className="h-[200px] mx-auto" />
                                                <h1>User id : {order.user_id}</h1>
                                            </div>

                                            </div>
                                      
                                    )
                                    
                            }) }

                        </div>

                        )
                        
                        
                        
                    })}

                    <h1 className="text-3xl text-center p-4">Loaded!! Orderer id is {orders[0].user_id}</h1>
                    
                </Container>

        );

    }else{

        return (

            <Container>

            <h1 className="text-3xl text-center p-4">Loading...</h1>
            
            </Container>

        );

    }
}
 
export default Orders;