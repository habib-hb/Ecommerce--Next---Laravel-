'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { useSession } from 'next-auth/react';

interface ReviewFormProps {
    product:any;
    currentUser: any;
}

const ReviewForm:React.FC<ReviewFormProps>  = ({product, currentUser}) => {

    // let currentUser = getCurrentUser();

    const ParsedcurrentUser = JSON.parse(currentUser.value);

    useEffect(() => {
        console.log( 'Product:  '  , product);
        console.log( 'CurrentUser: '  , ParsedcurrentUser);
    }, [product]);

    

    return ( 
        <div className="flex flex-col gap-4">

                 <Card className="w-full max-w-md">

                        <CardHeader>

                            <CardTitle>Leave a Review</CardTitle>

                            <CardDescription>Share your thoughts and experience with this product.</CardDescription>

                        </CardHeader>

                        <CardContent>

                            <form className="grid gap-6">

                                {/* Hidden Input fields */}
                                <input type="hidden" name="productId" value={product.id} />

                                <input type="hidden" name="username" value='placeholder' />

                            <div className="grid gap-2">
                                <Label htmlFor="review">Your Review</Label>
                                <Textarea id="review" name='review' placeholder="Write your review here..." className="min-h-[120px]" />
                            </div>

                            <div>
                                <Label htmlFor="rating">Rating</Label>

                                <Select name='selected_stars' defaultValue="3">

                                <SelectTrigger>

                                    <SelectValue placeholder="Select a rating" />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="1">1 star</SelectItem>
                                    <SelectItem value="2">2 stars</SelectItem>
                                    <SelectItem value="3">3 stars</SelectItem>
                                    <SelectItem value="4">4 stars</SelectItem>
                                    <SelectItem value="5">5 stars</SelectItem>

                                </SelectContent>

                                </Select>
                            </div>

                            </form>
                        </CardContent>

                        <CardFooter className="flex justify-end">

                            <Button type="submit">Submit Review</Button>

                        </CardFooter>

                        </Card>

        </div>
     );
}
 
export default ReviewForm;