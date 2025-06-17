import {connect} from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({
          verifyToken: token,
          verfiyTokenExpiry: { $gt: Date.now() }
        });

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 404})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verfiyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}