"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [data, setData] = useState('nothing')
  const [hidden, setHidden] = useState(false)
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data.email)
    setHidden(true)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-2 rounded bg-orange-700">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={onLogout}
        className="bg-blue-500 hover:bg-blue=700 text-white font-bold mt-4 py-2 px-4 rounded cursor-pointer"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className={`bg-green-500 hover:bg-green-600 text-white font-bold mt-4 py-2 px-4 rounded cursor-pointer ${
          hidden ? "hidden" : ""
        }`}
      >
        Get User Details
      </button>
    </div>
  );
}
