import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(){
    try{
        const response = NextResponse.json(
            {
                message: "Logout successfull",
                success: true,
            }
        )
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})

        return response;
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}