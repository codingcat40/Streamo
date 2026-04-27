import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import User from "@/models/User";


export async function POST( request : NextRequest){
    try{
        const {email, password} = await request.json()
        if(!email || !password){
            return NextResponse.json({
                error: "Email and password needed!"
            },
        {status: 400}
        )
        }

        await connectDB()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({
                error: "User already registered"
            }, {status: 400})
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json({
                message: "User has been created!"
            }, {status: 200})
        

    }catch(error){
        console.error("registration error!", error)

         return NextResponse.json({
                error: "Failed to create user!"
            }, {status: 400})
        
    }
}