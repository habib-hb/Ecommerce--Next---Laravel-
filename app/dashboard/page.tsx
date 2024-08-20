import Container from "../components/Container";

const Dashboard = () => {
    return ( 
        <Container>
            <h1 className="text-3xl text-center p-4">Dashboard</h1>

            <div className="flex flex-col items-center justify-center">

                <a href="/dashboard/product-upload" className="text-2xl text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_upload.png" className="h-14 w-14"/>

                        <p>Product Upload</p>
                
                </div>
                </a>

                <a href="/product_edit" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_edit.png" className="h-14 w-14"/>

                        <p>Product Edit</p>
                
                </div>
                </a>

                <a href="/product_delete" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_delete.png" className="h-14 w-14"/>

                        <p>Product Delete</p>
                
                </div>
                </a>

                <a href="/comments" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_comments.png" className="h-14 w-14"/>

                        <p>Comments</p>
                
                </div>
                </a>

                <a href="/customers" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_customers.png" className="h-14 w-14"/>

                        <p>Customers</p>
                
                </div>
                </a>

                <a href="/admins" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_admins.png" className="h-14 w-14"/>

                        <p>Admins</p>
                
                </div>
                </a>

                <a href="/orders" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_orders.png" className="h-14 w-14"/>

                        <p>Orders</p>
                
                </div>
                </a>

                <a href="/orders" className="text-2xl  text-white rounded-lg  cursor-pointer  w-[90vw] md:w-[60vw] text-center ">
                <div className="flex flex-col bg-slate-600 justify-center items-center my-4 p-2  shadow-lg hover:scale-125 rounded-lg">

                        <img src="/images_icons/product_banner.png" className="h-14 w-14"/>

                        <p>Banner Upload</p>

                </div>
                </a>
                
            </div>
        </Container>
     );
}
 
export default Dashboard;