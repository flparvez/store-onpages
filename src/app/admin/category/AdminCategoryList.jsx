"use client"
import CategoryList from "@/components/admin/CategoryList";

import { useGetCategoriesQuery } from "@/store/services/CategoryApi";
import Link from "next/link";




export default function CategorytList({user}) {
const {data,isLoading} = useGetCategoriesQuery()

  const categories =data;



  return (
<div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <h2> <Link href='/admin/category/add'> Add New Category</Link></h2>
          {categories?.map((productItem) => (
              <div key={productItem._id}>
                  <CategoryList 
                  user={user}
                  product= {productItem}
               
                />
              </div>
              
              
              ))
            }
        </div>
</div>
  )
}



