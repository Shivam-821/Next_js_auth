import {connect} from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel';
import {sendEmail} from '@/helpers/mailer'


connect()

export async function POST(request: NextRequest){
    const reqBody = await request.json()
    const {email} = reqBody

    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error: "User not found with this email"}, {status: 404})
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
        message: "Token Generated check you email",
        success: true
    })
}