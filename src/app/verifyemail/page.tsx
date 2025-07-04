/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error);
        console.log(error.response?.data);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-3 m-2 bg-orange-500 text-black text-xl">
        {token ? token : "Nothing"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl text-green-500">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500">Error</h2>
        </div>
      )}
    </div>
  );
}
