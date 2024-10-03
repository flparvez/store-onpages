import { connectDb } from "@/lib/dbConfig";
import Order from "@/models/orderSchema";

import {User} from "@/models/userSchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


// get all orders
export const GET =async ( request:Request) =>{


  try {

      await connectDb();

  
  
      const orders = await Order.find().sort({ createdAt: -1 });

      return new NextResponse(
        JSON.stringify({orders}),{status:200}
      )
  } catch (error:any) {
    return new NextResponse ("Error in fetching orders: " + error.message,{ status:400})
  }
}

// create order



export const POST = async (request: Request) => {
  try {
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    const body = await request.json();
    const {
      userci,
       items,
      name,
      email,
      phone,
      address,
      city,
      total,
      status,
      transaction,
      ordertrack,
      paymentType
    } = body;

    // Check userId and categoryId
    // if (!userId || !Types.ObjectId.isValid(userId!)) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Invalid or missing userId" }),
    //     { status: 400 }
    //   );
    // }

    await connectDb();

    // const user = await User.findById(userId);

    // if (!user) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "User not found" }),
    //     { status: 404 }
    //   );
    // }


    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      city,
      products: items,
      total,
      status,
      transaction,
      ordertrack,
      paymentType,
      user: userci,
    });

    await newOrder.save();

    return new NextResponse(
      JSON.stringify({
        message: "Order created successfully",
        order: newOrder,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify("Order Creation Errors: " + error.message),
      { status: 400 }
    );
  }
};

