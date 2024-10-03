"use client"
import CategorySlides from '@/components/CategorySlide'
import Footer from '@/components/Footer'
import SwiperSlides from '@/components/SwiperSlide'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import Loading from '@/components/Loading'
import ProductList from '@/components/ProductList'
import CustomProductList from '@/components/CustomProductList'

import React from 'react'


const Home = () => {
  
  const {data} = useGetProductsQuery()
  const products = data?.products;
  const productsSlider = data?.products?.slice(0, 10);

if (!products) return <Loading />
  return (
    <div>
  
      <div className='p-2'>
      <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
 
 {/* Featured Products And Category With Link */}
   <div className="">
  {
  productsSlider && productsSlider.length > 0
            ? 
                <SwiperSlides
                
                  products= {productsSlider}
                  
                />
              
            : null
            }
            </div>
           
              </div>
              {/* Category Slider With Link */}
              <div className=''>
              <div className='flex justify-center mb-8'>
              <button className='py-3 px-6 mt-14 text-white bg-black  rounded-md'> Category</button>
  
    </div>
             

          <CategorySlides  />
    </div>

    {/* Product List Product Category Button */}
 
      <div className='flex justify-center'>
        <button className='py-3 px-6 mt-14 text-white bg-black rounded-md'>All Products</button>
  
    </div>
  

    {/* Product List Responsive Design */}
 
        <div >
          
        
          
        <ProductList  products={products} />
      
        </div>
  <h2 className='sm:text-3xl text-xl font-bold text-center'>Special Products</h2>
         <div >
          
        
          
        <CustomProductList  cproducts={products} />
      
        </div>
  
      

    
    <Footer/>
    </div>
  )
}

export default Home
