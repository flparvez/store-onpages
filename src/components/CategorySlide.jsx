"use client"

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useGetCategoriesQuery } from '@/store/services/CategoryApi';
import Image from 'next/image';
import Link from 'next/link';


const CategorySlides = () => {
  const {data} = useGetCategoriesQuery()

  return (
    <div>
  <Swiper
        // spaceBetween={30}
        centeredSlides={true}
        parallax={true}
        autoplay={{
          delay: 1200,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 40 },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

<div className="container mx-auto px-4 ">
<div className="flex overflow-x-scroll scrollbar-hide">
         {data?.map((category) => (
       
             
             <SwiperSlide key={category._id}>
         <div className="flex-shrink-0 w-48 h-48  bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/products/${category?.slug?.toLowerCase()}`}>
      <Image width={300} height={128} src={category.image} alt={category.title} className="w-full h-32 object-cover rounded" />
      <div className="p-2">
        <h3 className="text-lg font-semibold text-center">{category.title}</h3>
      </div>
      </Link>
    </div>

        </SwiperSlide>
         ))}
         </div>
         </div>
       </Swiper>

       
      </div>
  )
}

export default CategorySlides
