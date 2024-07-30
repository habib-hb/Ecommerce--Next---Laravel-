'use client';

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import { useContext, useEffect } from "react";
import { ReviewsContext } from './ReviewsContext';

interface ListRatingProps {
    product:any;
}
const ListRating:React.FC<ListRatingProps> = ({product}) => {

        // Testing Use Context
        const { currentReviews, setCurrentReviews } = useContext(ReviewsContext);

        useEffect(() => {
            console.log('Review Section >>>'  , product)
        }, [product]);

    return ( 
        <div>
            <Heading title="Product Review"/>
            <div className="text-sm mt-2">
                {product.reviews && product.reviews.map((review:any)=>{
                    return <div key={Math.random()} className="max-w-[300px]">
                        <div className="flex items-center gap-2">
                           <Avatar src={review.reviewerAvatar}/> 
                            <div className="font-semibold">{review.reviewerName}</div>
                            <div className="font-light">{new Date().toLocaleString()}</div>
                        </div>
                        <div className="mt-2">
                                {/* <Rating value={Math.floor(Math.random() * 6)} size="small" precision={0.5} readOnly /> */}
                        <Rating value={review.rating} size="small" precision={0.5} readOnly />
                        <div className="ml-2">{
                            review.review
                        }</div>
                        <hr className="mt-4 mb-4" />
                        </div>
                    </div>
                })}
            </div>
            <p>{currentReviews ? currentReviews[0] : 'not-clicked'}</p>
        </div>
     );
}
 
export default ListRating;