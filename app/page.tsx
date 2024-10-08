'use client'


import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
// import {products} from "../utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import { useEffect, useState } from "react";

export default  function Home() {

  const [productLoaded, setProductLoaded] = useState(false);

  const [products, setProducts] = useState<any>([]);

  // Testing Banner Pic 
  const [imageData, setImageData] = useState('');
  // End Testing Banner Pic

  //Testing Async

      // let products: any = []
  async function fetchProducts() {

  // ************ The Whole Products Array Part ************

    // Extracting Array value from the laravel backend data
    // let products: any = [] // This and the variable below are same

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
                });

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



            // Pushing the Single Product Object to the Array
            theEntireAllProductArray.push(theSingleProductObject);

        });



        console.log(theEntireAllProductArray);

        // Setting the products Array for later pass down as card data
        // setProducts(theEntireAllProductArray);

        // setProductLoaded(true);




          // Testing The Banner Picture Load 

          // const handleImageLoad = async() => {

            const response = await fetch('http://127.0.0.1:8000/api/dashboard/get_banner_picture');
    
            if(response.ok) {
    
                let json_response = await response.json();
    
                setImageData(json_response.banner_url);
    
            }else{
    
                console.error('Something went wrong with the banner image.');
    
            }
    
            
        // }


            // handleImageLoad();


          // End Testing The Banner Picture Load

          setProducts(theEntireAllProductArray);

          setProductLoaded(true);





    } catch(e){
    console.error('Catch Error :' , e);
    }

    // ========== The Whole Products Array Part End ==========

  }

  useEffect(() => {
   !productLoaded && fetchProducts();
  }, []);

  //  testing order card
  useEffect(() => {
  console.log('This is the cart items >>> ' , typeof window !== 'undefined' ? window?.localStorage.getItem('eShopCartItems') : '' );
  }, []);


           // console.log('Product REview Check >>>' , products[2]);

    

      if(productLoaded){  
              
      return (
        <div className="">
          <Container>


            <div>


              {/* <HomeBanner/> */}

              {imageData !== '' && (
                      <div>
                                    
                      <img 
                      src={imageData}
                      alt="Banner Image"
                      className="w-full p-4"
                      />

                  </div>
              )}


            </div>
            

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-4">
              {products.map((product:any)=>{
                  return <ProductCard data={product} key={Math.random()}/>
              })}
            </div>
          </Container>
        </div>
      )

    }else{

        return (
            <div className="p-8">
                <Container>
                <h1 className="text-3xl text-center p-4">Loading...</h1>
                </Container>
            </div>
        )
    }
}
