import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
// import { products } from "@/utils/products";

interface IPrams {
    productId:string
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
                single_object.reviewer_name && theReviewsArrayOfObjects.push({
                    'reviewerName' : single_object.reviewer_name,
                    'review' : single_object.review
                });
            });



            // Setting Values to the Single Product Object
            theSingleProductObject['id'] = unique_product_id;

            theSingleProductObject['category'] = loopedProductCategory[0]; // Later You can customize this

            let unique_images_objects: any = new Set(theImagesArrayOfObjects);

            theSingleProductObject['images'] = [...unique_images_objects]; 

            let unique_reviews_objects: any = theReviewsArrayOfObjects ? new Set(theReviewsArrayOfObjects) : [];

            theSingleProductObject['reviews'] = [...unique_reviews_objects];

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
        products = theEntireAllProductArray;



    } catch(e){
    console.error('Catch Error :' , e);
    }

    // ========== The Whole Products Array Part End ==========


    
    const product = products.find((item: any)=> item.id == params.productId) // Not doing strict equality because the api response of the item.id is string

    // testing
    console.log(product)

    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>  
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
     );
}
 
export default Product;