/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody)

        //check if user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "user does not exist"}, {status: 404})
        }

        //compare the password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid credential"}, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login sucessful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch(error: any){
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}