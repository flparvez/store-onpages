import { connectDb } from "@/lib/dbConfig";

import Product from "@/models/productSchema";
import {User} from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//  get single product By Slug
export const GET = async (request:Request,context: { params:any}) =>{
    const productSlug = context.params.slug;
    console.log(productSlug)
    try {
    
  
        if (!productSlug ) {
            return new NextResponse(
                JSON.stringify({message:"Inavlid or missing slug"}),
                {status:400}
            )
        }
    
        await connectDb();
     
      const product = await Product.findOne({
        slug:productSlug, })
    
      if (!product) {
    
        return new NextResponse (
            JSON.stringify({message:"Product not found or does not exist"}),
            {status:404});
    
      }
    
      return new NextResponse(
        JSON.stringify({message:"Product fetched successfully",product}),{status:200}
      )
    } catch (error:any) {
        return new NextResponse("Product Fetched Error: " + error.message,{status:400})
    }
    }
    
    
    // Update Product By Slug

    export const PATCH = async (request: Request, context: { params: any }) => {
        const productSlug = context.params.slug;
      
        try {
          const body = await request.json();
          const {
            name,
            description,
            category,
            price,
            images,
            stock,
            sold,
            video,
            tags,
          } = body;
      
          const { searchParams } = new URL(request.url);
          const userId = searchParams.get("userId");
      
          // Check for valid userId and productSlug
          if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
              JSON.stringify({ message: "Invalid or missing userId" }),
              { status: 400 }
            );
          }
      
          if (!productSlug) {
            return new NextResponse(
              JSON.stringify({ message: "Missing product slug" }),
              { status: 400 }
            );
          }
      
          await connectDb();
      
         
          // Find the product by slug 
          const product = await Product.findOne({ slug: productSlug});
          if (!product) {
            return new NextResponse(
              JSON.stringify({ message: "Product not found" }),
              { status: 404 }
            );
          }
      
          // Update the product using findOneAndUpdate
          const updatedProduct = await Product.findOneAndUpdate(
            { slug: productSlug },
            {
              name,
              description,
              category,
              price,
              images,
              stock,
              sold,
              video,
              tags,
            },
            { new: true } // Return the updated document
          );
      
          if (!updatedProduct) {
            return new NextResponse(
              JSON.stringify({ message: "Failed to update product" }),
              { status: 500 }
            );
          }
      
          return new NextResponse(
            JSON.stringify({ message: "Product updated successfully", product: updatedProduct }),
            { status: 200 }
          );
        } catch (error) {
          console.error("Error updating product:", error);
          return new NextResponse(
            JSON.stringify({ message: "An error occurred", error }),
            { status: 500 }
          );
        }
      };



//  DELETE PRODUCT

export const DELETE = async (request: Request, context: { params: any }) => {
  const productSlug = context.params.slug;

  try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");

      // Check userId and slug
      if (!userId || !Types.ObjectId.isValid(userId)) {
          return new NextResponse(
              JSON.stringify({ message: "Invalid or missing userId" }),
              { status: 400 }
          );
      }

      if (!productSlug) {
          return new NextResponse(
              JSON.stringify({ message: "Invalid or missing slug" }),
              { status: 400 }
          );
      }

      await connectDb();

      const user = await User.findById(userId);

      if (!user) {
          return new NextResponse(
              JSON.stringify({ message: "User not found" }),
              { status: 404 }
          );
      }

      const result = await Product.findOneAndDelete({ slug: productSlug });

      if (!result) {
          return new NextResponse(
              JSON.stringify({ message: "Product not found or already deleted" }),
              { status: 404 }
          );
      }

      return new NextResponse(
          JSON.stringify({ message: "Product deleted successfully" }),
          { status: 200 }
      );

  } catch (error: any) {
      return new NextResponse(
          JSON.stringify({ message: "Product delete failed", error: error.message }),
          { status: 400 }
      );
  }
};