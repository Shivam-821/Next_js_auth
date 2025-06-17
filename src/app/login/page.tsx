/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toggle, setToggle] = React.useState(true);

  const onLogin = async () => {
    try {
      if (!buttonDisabled) {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log(response);
        toast.success("Login success");
        setLoading(false);
        await new Promise((r) => setTimeout(r, 1000));
        router.push("/profile");
      } else {
        toast.error("Enter the required field");
      }
    } catch (error: any) {
      setLoading(false);
      setUser({ email: "", password: "" });
      console.log("Login failed", error.message);
      toast.error(error.response.data.error);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl">{loading ? "processing..." : "Login"}</h1>
      <hr />
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
      <div>
        <input
          className="rounded p-2 m-2 ml-5 outline-none focus:border-gray-600 border-2"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          type={toggle ? "password" : "text"}
          id="password"
          placeholder="password"
          onKeyDown={handleKeyDown}
        />
        <span
          className="font-bold text-xl cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          T
        </span>
      </div>
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-900"
      >
        {buttonDisabled ? "Fill the input" : "Login here"}
      </button>
      <Link className="hover:text-blue-300" href="/signup">
        Visit Signup page
      </Link>
      <Link className="underline hover:text-blue-300" href="/resetpassword">
        Reset Password
      </Link>
    </div>
  );
}
