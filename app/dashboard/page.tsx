import Container from "../components/Container";

const Dashboard = () => {
    return ( 
        <Container>
            <h1 className="text-3xl text-center p-4">Dashboard</h1>

            <div className="flex flex-col items-center justify-center">

                <a href="/dashboard/product-upload" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Product Upload</a>
                <a href="/product_edit" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Product Edit</a>
                <a href="" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Product Delete</a>
                <a href="" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Comments</a>
                <a href="" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Customers</a>
                <a href="" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Admins</a>
                <a href="" className="text-2xl bg-slate-600 text-white rounded-lg p-8 m-2 cursor-pointer hover:scale-125 w-[90vw] md:w-[60vw] text-center shadow-xl">Orders</a>
               
                
            </div>
        </Container>
     );
}
 
export default Dashboard;