"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
    data:any
}
const ProductDeleteCard:React.FC<ProductCardProps> = ({data}) => {

    const [hideComponent, setHideComponent] = useState(false);

    const productRating= data.reviews.reduce((acc:number, item:any)=>{
        return acc + item.rating
    } , 0) / data.reviews.length;

        // Placeholder value
        // const productRating= 775;

        // const router = useRouter();
    // const router = useRouter();

    let deleteFunction = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/dashboard/product_delete/${data.id}`);

        if(response.ok){
            alert('Product Deleted');
            setHideComponent(true);
        }

    }


    return (
    <div 
    className={`
     col-span-1
     cursor-pointer
     border-[1.2px]
     border-slate-200
     bg-slate-50
     p-2
     rounded-sm
     transition
     hover:scale-105
     text-center
     text-sm
     ${hideComponent && 'hidden'}
    `}>
        <div className="
        flex
        flex-col
        w-full
        items-center
        gap-1
        ">
            <div className="aspect-square w-full relative overflow-hidden">
                <Image
                fill
                src={data.images[0].image}
                alt={data.name}
                className="w-full h-full object-contain"
                    />
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>

            {/* <a href={'http://127.0.0.1:8000/api/dashboard/product_delete/' + data.id}><button className="bg-red-600 text-white py-4 px-8 rounded-lg" onClick={deleteFunction}>Delete</button></a> */}

           <button className="bg-red-600 text-white py-4 px-8 rounded-lg" onClick={deleteFunction}>Delete</button>

        </div>
        
    </div> );
}
 
export default ProductDeleteCard;