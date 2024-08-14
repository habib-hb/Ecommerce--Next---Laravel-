"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data:any
}
const ProductCommentsCard:React.FC<ProductCardProps> = ({data}) => {

    const productRating= data.reviews.reduce((acc:number, item:any)=>{
        return acc + item.rating
    } , 0) / data.reviews.length;

    // Placeholder value
    // const productRating= 775;

    const router = useRouter();

    return (
    <div 
    onClick={()=> router.push(`/product_edit/${data.id}`)}
    className="
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
    ">
        <div className="
        flex
        flex-col
        w-full
        items-center
        gap-1
        ">
            <div className="aspect-square w-full relative overflow-hidden">
                {/* <Image
                fill
                src={data.images[0].image}
                alt={data.name}
                className="w-full h-full object-contain"
                    /> */}
                    <img src={data.images[0].image} width={50} height={50}/>
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>
            <h2>Product Reviews</h2>
            {data.reviews.map((review:any)=>(
                <div className="flex flex-col gap-4" key={review.id}>
                    <div className="flex gap-2">
                        <div>
                            {/* <Image
                            fill
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            className="w-10 h-10 rounded-full"
                            sizes="(50px, 50px)"
                            /> */}
                            <img src={review.reviewerAvatar} width={50} height={50} />
                        </div>
                        <div>
                            <h3>{review.reviewerName}</h3>
                            <Rating value={review.rating} readOnly/>
                        </div>
                    </div>
                    <div>{review.review}</div>
                </div>
            ))}
        </div>
        
    </div> );
}
 
export default ProductCommentsCard;