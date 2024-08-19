'use client'


import Container from "@/app/components/Container";
import { useEffect, useState } from "react";

const Order_placement = () => {
    const [order_placed , setOrder_placed] = useState(false);

    // Get Items from LocalStorage as a string
    let ordered_products = localStorage.getItem('eShopCartItems') as string;

    let orderer_email = localStorage.getItem('loggedInEmail');

    let order_details = {
        ordered_products : ordered_products,
        orderer_email : orderer_email
    }

    async function placeOrder() {
        let response = await fetch('http://127.0.0.1:8000/api/dashboard/order_placement' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(order_details)
        })

        if(response.ok) {

            alert('Order Placed')

            setOrder_placed(true)

        }else {

            alert('Something went wrong')

        }
    }


    useEffect(() => {

        placeOrder()
        
    }, [])


    if(order_placed) {

                return (
                    <Container>

                        <h1 className="text-3xl text-center p-4">Order Placed</h1>

                    </Container>
                )

    }else{

                return ( 

                    <Container>

                        <h1 className="text-3xl text-center p-4">Order Processing...</h1>

                    </Container>

                );

    }
}
 
export default Order_placement;