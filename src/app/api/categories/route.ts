import { connectDb } from "@/lib/dbConfig";
import Category from "@/models/categorySchema";
import {User} from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";


export const GET = async (request: Request)=>{
    try {
connectDb()
        const categories = await Category.find();
     

        return new NextResponse(JSON.stringify(categories),{status:200})
    } catch (error:any) {
        return new NextResponse("Error In Fetching Categories",{status:500});
    }
}


export const POST = async (request:Request) =>{
    try {
        // get user
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const {title,description,image } = await request.json();

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message:"Invalid or missing userId"}),{status:400})
        }
        await connectDb();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({message:"User not found"}),{status:404})
        }

        const newCategory = new Category({
            title,
            slug:slugify(title),
            description,
            image,
            user: new Types.ObjectId(userId)
        
        });
        await newCategory.save();

         return new NextResponse(JSON.stringify({message:"Category created successfully",newCategory}),{status:200})
    } catch (error:any) {
        // error in creating category
        return new NextResponse("Error In Creating Category",{status:500});
    }
}

