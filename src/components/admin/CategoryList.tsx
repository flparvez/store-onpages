import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";

import { useDeleteCategoryMutation } from "@/store/services/CategoryApi";

function CategoryList({
  product,user
//   handleGetProductDetails,
//   handleAddtoCart,
}:any) {

    const [deleteCategory] = useDeleteCategoryMutation(); 

  const userId =user?.id;
     
   
  if (userId) {
    const handleDelete = async (id:any) => {
      await deleteCategory({id, userId}).unwrap();
      };

   
 
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
    
        <div className="relative">
          <Image width={300} height={300}
            src={product?.image} 
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge variant={CardContent} className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge variant={CardContent} className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ৳{product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge variant={Button} className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {product?.titile}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {product?.description}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h2> <Link href={`/admin/category/edit/${product._id}`}>Edit Category</Link> </h2>
            <h2 className="bg-red-600"> <button onClick={() => handleDelete(product?._id)}>Delete</button> </h2>
          </div>
        </CardContent>
      </div>
     
    </Card>
  );
}
}
export default CategoryList;