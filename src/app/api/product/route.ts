import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import Product from "@/models/productSchema";
import {User} from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify"; // Add this import at the top



export const GET =async ( request:Request) =>{


  try {

      await connectDb();

  
      const products = await Product.find().sort({ createdAt: -1 });
   

      return new NextResponse(
        JSON.stringify({products}),{status:200}
      )
  } catch (error:any) {
    return new NextResponse ("Error in fetching products: " + error.message,{ status:400})
  }
}

// create product



export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

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

    // Check userId and categoryId
    if (!userId || !Types.ObjectId.isValid(userId!)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
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

 
    // Manually generate the slug
    const slug = slugify(name, { lower: true, strict: true });
    

    const newProduct = new Product({
      name,
      slug, // Set the slug manually here
      description,
      category,
      price,
      images,
      stock,
      sold,
      video,
      tags,
      user: new Types.ObjectId(user),
    });

    await newProduct.save();

    return new NextResponse(
      JSON.stringify({
        message: "Product created successfully",
        product: newProduct,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify("Product Creation Errors: " + error.message),
      { status: 400 }
    );
  }
};

