"use client"
/** @format */
import {  useDeleteProductMutation, useGetProductsQuery } from "@/store/services/prodcutApi";

import React, { useState } from "react";



import { cn } from "@/lib/utils";
import AdminProductTile from "@/components/ProductListAdmin";
import SideNavbar from "@/components/sideNavbar";
import { useRouter } from "next/navigation";





export default function Home({user}) {
  const router = useRouter()

const admin = user?.role === "admin"

if (!admin) {
  router.push('/test/not-admin')
}
  return (
    
       
        
        <div
        className={cn(
          "rounded-md flex  bg-gray-100 dark:bg-neutral-800 h-full  w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      
        )}
      >
        <SideNavbar />
       
        
        <Dashboard />
 
        
      </div>

    
  
  );
}

// Dummy dashboard component with content
const Dashboard = () => {

  const {data,isLoading} = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation();

const handleDelete = async (productSlug) => {
    await deleteProduct(productSlug);
  };
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
        <div  className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
              <h2>Total Products</h2>
            </div>
      <div  className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            >
              <h2>Total Order</h2>
            </div>
 
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data && data.products.length > 0
          ? data?.products.map((productItem)=> (
              // eslint-disable-next-line react/jsx-key
              <div key={productItem._id}> 
              <AdminProductTile 
             
                // setOpenCreateProductsDialog={setOpenCreateProductsDialog}
               
                product= {productItem }
                handleDelete={handleDelete}
              />
              </div>
            ))
          : null}
      </div>
      </div>
    </div>
  );
};