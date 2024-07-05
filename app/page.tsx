
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import {products} from "../utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import { useEffect } from "react";

export default async function Home() {

  // Value is inside the try block
  let theRealData

  // Doing another method
  try{
      let someApiData = await fetch('http://127.0.0.1:8000/api/products');

      if(!someApiData.ok){
        throw new Error('something went wrong regarding the network request.');
      }

      let someJsonData = await someApiData.json();

      theRealData = someJsonData[0].name;

  } catch(e){
    console.error('Catch Error :' , e);
  }

   

  return (
     <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>

        <div>{theRealData}</div>
        

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product:any)=>{
              return <ProductCard data={product}/>
          })}
        </div>
      </Container>
     </div>
  )
}
