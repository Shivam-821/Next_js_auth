/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'

export default function ResetPassword(){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [fill, setFill] = useState(false)
    const [warning, setWarning] = useState('')

    const submitEmail = async () => {
        try {
            if(warning === ''){
                await axios.post('/api/users/resetpassword', {email})
                setEmail("")
                toast.success("Check Email")
                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            }else {
                toast.error("Enter valid Email")
            }
            
        } catch (error: any) {
            setEmail('')
            console.log(error.response.data.error)
            toast.error(error.response.data.error)
        }
    }

    const verifyEmail = (email: string) => {
        if (!email.includes("@") || !email.includes(".")) {
          setWarning("Invalid Email");
        } else {
          setWarning("");
        }
    }

    const handleKeyDown = (e: any) => {
        if(e.key === 'Enter'){
            submitEmail()
        }
    }

   useEffect(() => {
    if(email.length > 0){
        setFill(true)
    } else {
        setFill(false)
        setWarning("")
    }
   }, [email])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Toaster />
        <h1>Enter Email</h1>
        <hr />
        <input
          className="p-2 text-black focus:bg-blue-100 outline-none bg-amber-50 rounded"
          onChange={(e) => {
            setEmail(e.target.value);
            verifyEmail(e.target.value);
          }}
          placeholder="email"
          value={email}
          onKeyDown={handleKeyDown}
          type="text"
        />
        {warning && <h2 className="text-red-600">{warning}</h2>}
        <button
          className="m-2 p-2 bg-green-400 rounded-lg text-gray-800 hover:bg-green-500 inline"
          onClick={submitEmail}
        >
          {fill ? "Submit" : "Enter Email"}
        </button>
        <button className="mt-2 p-2 bg-amber-400 text-blue-800 rounded-xl inline">
          <Link href="/login">Back to Login</Link>
        </button>
      </div>
    );
}