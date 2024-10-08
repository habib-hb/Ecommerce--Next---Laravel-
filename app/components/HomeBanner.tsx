'use client'



// import Image from "next/image";
import { useEffect, useState } from "react";

const HomeBanner = () => {

    const [imageData, setImageData] = useState('');


    const handleImageLoad = async() => {

        const response = await fetch('http://127.0.0.1:8000/api/dashboard/get_banner_picture');

        if(response.ok) {

            let json_response = await response.json();

            setImageData(json_response.banner_url);

        }else{

            console.error('Something went wrong with the banner image.');

        }

        
    }


        useEffect(() => {

           !imageData && handleImageLoad();

        }, [])


    
    if(imageData !== '') {
    return ( 
        // <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
        //     <div className="mx-auto px-8 py-12 flex flex-col md:flex-row gap-2 items-center justify-evenly">
        //         <div className="mb-8 md:mb-0 text-center">
        //             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Summer Sale</h1>
        //             <p className="text-lg md:text-xl text-white mb-2">Enjoy Discounts on selected items</p>
        //             <p className="text-2xl md:text-5xl text-yellow-400 font-bold">Get 50% OFF</p>
        //         </div>
                // <div className="w-1/3 relative aspect-video">
                
                    
                //     <Image 
                //     src="/banner-image.png"
                //     fill
                //     alt="Banner Image"
                //     className="object-contain"
                //     />
                    
                // </div>
        //     </div>
        // </div>

                            <div>
                                
                                <img 
                                src={imageData}
                                alt="Banner Image"
                                className="w-full p-4"
                                />

                            </div>    


     );

    }else{

        return(
            <div></div>
        )


    }

}
 
export default HomeBanner;