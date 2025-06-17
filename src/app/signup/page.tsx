/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      if (!buttonDisabled) {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        setUser({ email: "", password: "", username: "" });
        console.log("signup success: ", response.data);
        toast.success("Signup successfull");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        if (
          (!user.email.includes("@") || !user.email.includes(".")) &&
          user.username.length > 0 &&
          user.email.length > 0 &&
          user.password.length > 0
        ) {
          setUser({ ...user, email: "" });
          toast.error("Enter valid email");
        } else {
          toast.error("Fill the required field");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onSignup();
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.email.includes("@") &&
      user.email.includes(".")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-2xl">{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-900"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link className="hover:text-blue-300" href="/login">
        Visit login page
      </Link>
    </div>
  );
}
