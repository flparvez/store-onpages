"use client"; // Ensure this component is client-side only if needed

  import Pagination from './Pagination'  
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";




const ProductListByCategory = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

 // Calculate the current products
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
 


  return (
<div className="container mx-auto sm:px-4 px-2 py-8">
<div className="grid grid-cols-2 sm:grid-cols-3  gap-4 md:grid-cols-3 lg:grid-cols-4">
{currentProducts?.map((product) => (

<div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
  <Link href={`/product/${product.slug}`} className="block">
      <Image width={300} height={300} src={product.images} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-medium sm:text-xl  sm:font-semibold">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">৳{product.price}</span>
          <span className="text-gray-500 line-through">৳{product.price +220}</span>
        </div>
      </div>
      </Link>
    </div>

))}

     
</div>
<Pagination
       currentPage={currentPage}
       totalPages={Math.ceil(products?.length / productsPerPage)}
       onPageChange={paginate}
     />
</div>
  )
};

export default ProductListByCategory;
