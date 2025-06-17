/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function GenerateNewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const [click, setClick] = useState(false);
  const [strength, setStrength] = useState("");
  const [token, setToken] = useState("");

  const resetPassword = async () => {
    try {
      if (click) {
        await axios.post("/api/users/newpassword", { token, password });
        setPassword("");
        toast.success("Password reset successful");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error("Enter valid password");
      }
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url || "");
  }, []);

  useEffect(() => {
    if (password.length > 0) {
      if (password.length < 4 || !/[0-9]/.test(password)) {
        setStrength("weak");
      } else if (
        password.length < 6 ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)
      ) {
        setStrength("medium");
      } else {
        setStrength("strong");
      }
    }

    if (password.length > 0) {
      setClick(true);
    } else {
      setClick(false);
      setStrength("");
    }
  }, [password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <label htmlFor="password">Enter New Password</label>
      <div>
        <input
          className="bg-amber-50 rounded p-2 m-2 focus:bg-amber-100 outline-none text-black focus:border-blue-400 border-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={toggle ? "password" : "text"}
          id="password"
          placeholder="password"
        />
        <span
          className="font-bold text-xl cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          T
        </span>
      </div>

      <h1
        className={`${
          strength === "weak"
            ? "text-red-500"
            : strength === "medium"
            ? "text-orange-400"
            : "text-green-500"
        }`}
      >
        {strength}
      </h1>
      <button
        className="bg-blue-600 p-2 m-2 hover:bg-blue-700"
        onClick={resetPassword}
      >
        {click ? "Reset Password" : "Enter Password"}
      </button>
    </div>
  );
}
