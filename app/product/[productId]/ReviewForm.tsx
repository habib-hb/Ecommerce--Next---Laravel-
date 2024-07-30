'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { WidthIcon } from "@radix-ui/react-icons";
// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { useSession } from 'next-auth/react';

interface ReviewFormProps {
    product:any;
    currentUser: any;
}



// Form Submit functionality
const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let formData = new FormData(e.currentTarget);
    let nameData = formData.get('user_name');
    let userIdData = formData.get('user_id');
    let productIdData = formData.get('product_id');
    let reviewTextData = formData.get('review_text');
    let selectedStarsData = formData.get('selected_stars')?.slice(0, 1);
    let reviewImageFile = formData.get('review_image');
  
    //This variable below is just for console log checking purpose
    let formDataObject = {
      name: nameData,
      user_id: userIdData,
      product_id: productIdData,
      review_text: reviewTextData,
      selected_stars: selectedStarsData?.slice(0, 1),
      review_image: reviewImageFile
    };
  
    console.log('formData: ', formDataObject);



   // Creating a new FormData object to send with the fetch request
   if(formDataObject.name && formDataObject.user_id && formDataObject.product_id && formDataObject.review_text && formDataObject.selected_stars) {
    let formDataToSend = new FormData();
    formDataToSend.append('name', nameData ?? '');
    formDataToSend.append('user_id', userIdData  ?? '');
    formDataToSend.append('product_id', productIdData ?? '');
    formDataToSend.append('review_text', reviewTextData ?? '');
    formDataToSend.append('selected_stars', selectedStarsData ?? '');
    formDataToSend.append('review_image', reviewImageFile ?? '');

    // Sending Ajax Post request
    fetch('http://127.0.0.1:8000/api/dashboard/review-upload', {
        method: 'POST',
        body: formDataToSend,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data)
        alert(`Form submitted successfully :)`);
    })
    .catch((error) =>{
        console.error('Error:', error)
        alert('Oh Noo!! Form submission error :(');
    });

    

        }

  };
  

const ReviewForm:React.FC<ReviewFormProps>  = ({product, currentUser}) => {

    // let currentUser = getCurrentUser();

    const ParsedcurrentUser = JSON.parse(currentUser.value);

    useEffect(() => {
        console.log( 'Product:  '  , product);
        console.log( 'CurrentUser: '  , ParsedcurrentUser);
        console.log( 'CurrentUser_name: '  , ParsedcurrentUser?.name);
        console.log( 'CurrentUser_id: '  , ParsedcurrentUser?.id);
    }, [product]);

    

    return ( 
        <div className="flex flex-col gap-4">

                 <Card className="w-full max-w-md">

                        <CardHeader>

                            <CardTitle>Leave a Review</CardTitle>

                            <CardDescription>Share your thoughts and experience with this product.</CardDescription>

                        </CardHeader>

                        <CardContent>

                            <form onSubmit={formSubmit} className="grid gap-6">

                                {/* Hidden Input fields */}
                                <input type="hidden" name="product_id" value={product.id} />

                                <input type="hidden" name="user_id" value={ParsedcurrentUser?.id} />

                                <input type="hidden" name="user_name" value={ParsedcurrentUser?.name} />


                                    <div className="grid gap-2">
                                        <Label htmlFor="review">Your Review</Label>
                                        <Textarea id="review" name='review_text' placeholder="Write your review here..." className="min-h-[120px]" />
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

                                        <div className="space-y-2">
                                        <Label htmlFor="review_image">Image</Label>
                                        <Input name="review_image" id="review_image" type="file" className="w-full"/>
                                        </div>
                                    </div>

                                    <CardFooter className="flex justify-end">

                                    <Button type="submit">Submit Review</Button>

                                    </CardFooter>

                            </form>
                        </CardContent>

                        </Card>

        </div>
     );
}
 
export default ReviewForm;