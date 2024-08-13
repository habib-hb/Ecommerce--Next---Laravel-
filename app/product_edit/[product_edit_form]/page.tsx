import Container from "@/app/components/Container";
// import ProductDetails from "./ProductDetails";
// import ListRating from "./ListRating";
// import ReviewForm from "./ReviewForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
// import { products } from "@/utils/products";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
// import { ReviewsProvider } from "./ReviewsContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { useState } from "react";

interface IPrams {
    product_edit_form:string
}

const Product = async ({params}:{params:IPrams}) => {
    console.log("params" , params)

   // ************ The Whole Products Array Part ************

    // Extracting Array value from the laravel backend data
    let products: any = [] // This and the variable below are same

    let theEntireAllProductArray: any = []

    let UniqueProductsId: any = []

    let productCategories: any = []

    let productColors: any = []

    let productReviews: any = []

    // Doing another method
    try{
        let someApiData = await fetch('http://127.0.0.1:8000/api/products');

        if(!someApiData.ok){
        throw new Error('something went wrong regarding the network request.');
        }

        let someJsonData: any = await someApiData.json();

        someJsonData.forEach((element : any) => {
            UniqueProductsId.push(element.product_id);
        });

        UniqueProductsId = new Set(UniqueProductsId);

        console.log(UniqueProductsId);

        UniqueProductsId.forEach((unique_product_id: any) => {
            // The Single Product Object Initialization
            let theSingleProductObject: any = {};

            let loopedProductCategory: any = [];

            let theImagesArrayOfObjects: any = [];

            let theReviewsArrayOfObjects: any = [];

            let theSingleProductSpecificObjects: any =someJsonData.filter((item: any) => item.product_id == unique_product_id);

            theSingleProductSpecificObjects.forEach((single_object: any) => {

                // Product Category Mapping
                loopedProductCategory.push(single_object.category);

                // Product color and Image Mapping
                theImagesArrayOfObjects.push({
                    'image' : single_object.image,
                    'color' : single_object.color_name,
                    'colorCode' : single_object.color_code
                })

                // Product review Mapping
                single_object.customer_name && theReviewsArrayOfObjects.push({
                            // 'reviewerName' : single_object.reviewer_name,
                    'reviewerName' : single_object.customer_name,
                    'review' : single_object.review,
                    'reviewerAvatar' : single_object.customer_avatar,
                    'rating': single_object.rating
                });
            });



            // Setting Values to the Single Product Object
            theSingleProductObject['id'] = unique_product_id;

            theSingleProductObject['category'] = loopedProductCategory[0]; // Later You can customize this

                    // let unique_images_objects: any = new Set(theImagesArrayOfObjects);

                    // theSingleProductObject['images'] = [...unique_images_objects]; 

            let unique_images_objects_in_string_set_objects_format: any = new Set(theImagesArrayOfObjects.map((item:any) => JSON.stringify(item)));

            let unique_images_objects_in_string_array_format = [...unique_images_objects_in_string_set_objects_format]

            let unique_images_objects_in_actual_array_format = unique_images_objects_in_string_array_format.map(item => JSON.parse(item));

            theSingleProductObject['images'] = [...unique_images_objects_in_actual_array_format];

                    // let unique_reviews_objects: any = theReviewsArrayOfObjects ? new Set(theReviewsArrayOfObjects) : [];

                    // theSingleProductObject['reviews'] = [...unique_reviews_objects];

            let unique_reviews_objects_in_string_set_objects_format: any = theReviewsArrayOfObjects ? new Set(theReviewsArrayOfObjects.map((item:any) => JSON.stringify(item))) : [];

            let unique_reviews_objects_in_string_array_format = [...unique_reviews_objects_in_string_set_objects_format];

            let unique_reviews_objects_in_actual_array_format = unique_reviews_objects_in_string_array_format.map(item => JSON.parse(item));

            theSingleProductObject['reviews'] = [...unique_reviews_objects_in_actual_array_format];

            theSingleProductObject['name'] = theSingleProductSpecificObjects[0].name; 

            theSingleProductObject['description'] = theSingleProductSpecificObjects[0].description;

            theSingleProductObject['price'] = theSingleProductSpecificObjects[0].price;

            theSingleProductObject['brand'] = theSingleProductSpecificObjects[0].brand;

            theSingleProductObject['inStock'] = theSingleProductSpecificObjects[0].stock_amount > 0 ? true : false;

            theSingleProductObject['inStock_amount'] = theSingleProductSpecificObjects[0].stock_amount;



            // Pushing the Single Product Object to the Array
            theEntireAllProductArray.push(theSingleProductObject);

        });



        console.log(theEntireAllProductArray);

        // Setting the products Array for later pass down as card data
        products = theEntireAllProductArray;



    } catch(e){
    console.error('Catch Error :' , e);
    }

    // ========== The Whole Products Array Part End ==========


    
    const product = products.find((item: any)=> item.id == params.product_edit_form) // Not doing strict equality because the api response of the item.id is string

    // testing
    console.log(product)

  

    // From Functionality*** 
    let formData = {
        product_name: '',
        description: '',
        brand : '',
        price : '',
        instock_amount : '',
        category : '',
        images: [],
      };



      const handleChange = (e: any) => {
         if (e.target.name === 'images[]') {
                // Convert FileList to array for easier handling
                const filesArray:any = Array.from(e.target.files);
            
                formData = {
                  ...formData,
                  images: filesArray, // Update images with array of File objects
                };
        } else {
          formData = {
            ...formData,
            [e.target.name]: e.target.value,
          };
        }
      };



      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('product_name', formData.product_name);
        data.append('description', formData.description);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('instock_amount', formData.instock_amount);
        data.append('category', formData.category);
    
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images[]', formData.images[i]);
        }
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/dashboard/product-upload', {
            method: 'POST',
            body: data,
          });
    
          if (response.ok) {
            // Handle successful form submission
            alert('Form submitted successfully');
          } else {
            // Handle errors
            alert('Form submission error - else block');
          }
        } catch (error) {
          console.error('Form submission error', error);
          alert(' Form submission error - catch block');
        }
      };





    return ( 
        <div className="p-8">
            <Container>

                <div className="flex flex-col mt-20 gap-4">
                <Card className="w-full max-w-md mx-auto mt-4">

                <CardHeader>

                    <CardTitle>Product Edit Panel</CardTitle>

                </CardHeader>

                <CardContent className="grid gap-4">

                    <form method="POST" action="http://127.0.0.1:8000/api/dashboard/product_edit" encType="multipart/form-data">

                    <input type="hidden" name="product_id" value={product?.id} />

                    <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input name="product_name" id="name" placeholder="" className="w-full"  value={product?.name}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" id="description" placeholder="" className="w-full" value={product?.description} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input name="brand" id="brand" placeholder="" className="w-full"  value={product?.brand}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input name="price" id="price" placeholder="" type="number" className="w-full" value={product?.price} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="message">Instock Amount</Label>
                    <Input name="instock_amount" id="message" placeholder="" type="number" className="w-full"  value={product?.inStock_amount}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input name="category" id="category" placeholder="" className="w-full"  value={product.category}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input name="images[]" id="images" type="file" multiple className="w-full"  />
                    </div>

                    <CardFooter className="flex justify-end mt-4">
                    <Button className="mx-auto w-[200px]">Submit</Button>
                    </CardFooter>

                    </form>
                </CardContent>

                </Card>

                </div>
            </Container>

        </div>
     );
}
 
export default Product;