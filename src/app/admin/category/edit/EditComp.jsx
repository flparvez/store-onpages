"use client";
import { useGetCategoryByIdQuery } from "@/store/services/CategoryApi";
import EditCategory from "@/components/admin/EditCategory"
export default function EditCategorys({id,userId}) {

    const {data} =useGetCategoryByIdQuery(id)


  return (
    
<div>
  <h2>Edit Category</h2>
  <EditCategory userId={userId?.id}  cdata ={data} categoryId={id}/>
</div>


  );
}
