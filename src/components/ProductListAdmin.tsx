"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

function AdminProductTile({
  product,
  
  // setOpenCreateProductsDialog,

  handleDelete,
}:any) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
        <Image width={200} height={200}
            src={product.images}
            alt="text" 
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ৳{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.price}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href={`/admin/product/edit/${product?.slug}`}>Edit</Link>
         
       
          <Button onClick={() => handleDelete(product?.slug)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;