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
                    {/* The user specific Data Based on Users */}
                    {orders.map((order : any) => {
                            let orderDataJson = JSON.parse(order.orders_data);

                            // Calculating the grand total
                            let grand_total = 0;
                            orderDataJson.map((data : any) => {
                                grand_total += parseInt(data.price) * parseInt(data.quantity);
                            })

                    return (
                        // The user specific Data
                        <div key={Math.random()} className="text-2xl bg-slate-50 text-black border-2 border-black rounded-lg p-8 mt-2 mb-16 cursor-pointer w-[90vw] md:w-[60vw] text-center shadow-xl mx-auto">

                                        <div className="my-4">

                                                <img src={order.customer_avatar ? order.customer_avatar : 'http://127.0.0.1:8000/storage/images/unknown_user.jpg'} alt="USER" className="h-[400px] mx-auto rounded-lg border border-black" />
                       

                                                <h1 className="text-lg">Customer: <span className="text-2xl font-bold">{order.name}</span></h1>

                                                <h1 className="text-lg">Email: <span className="text-2xl font-bold">{order.email}</span></h1>

                                        </div>

                            {/* The Products ordered by the specific user */}
                            { orderDataJson.map((data : any) => {

                                    // The products data
                                    return (
                                            <div>

                                            <div className="w-[90%] mx-auto bg-slate-200 p-8 rounded-lg my-8 flex flex-col justify-center items-center border border-black shadow-md">
                                                <img src={data.selectedImg.image} alt="" className="h-[200px] mx-auto mb-2" />
                                                <h1 className="text-lg">Product: <span className="text-2xl font-bold">{data.name}</span></h1>

                                                <h1 className="text-lg">Price : <span className="text-2xl font-bold">{data.price}</span></h1>

                                                <h1 className="text-lg">Quantity : <span className="text-2xl font-bold">{data.quantity}</span></h1>

                                                <button className="bg-blue-700 text-white w-[90%] md:w-[50%] my-4 py-2 rounded-lg hover:scale-110">Mark As Delivered</button>

                                                <button className="bg-red-700 text-white w-[90%] md:w-[50%] my-4 py-2 rounded-lg hover:scale-110">Reject Order</button>

                                            </div>

                                            </div>
                                      
                                    )
                                    
                            }) }

                        <div className="flex flex-col p-8 border border-black w-[90%] md:w-[30%] mx-auto rounded-lg justify-center items-center shadow-lg">

                                <h2 className="text-2xl font-bold">Grand Total</h2>
                                <h2><span className="text-4xl font-bold text-blue-700">{grand_total}</span>Tk.</h2>

                         </div>

                        </div>

                        )
                        
                        
                        
                    })}

                   
                    
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