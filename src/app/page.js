"use client";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email format is not valid")
    .required("email id is required"),
  password: yup.string().trim().required("password is required").min(6).max(8),
});

function Page() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="h-screen bg-cyan-200 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-black mt-4">
        React Hook Form
      </h1>
      <h1 className="text-xl font-semibold text-black mt-3">Sign In</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value, onBlur, name, ref } }) => (
              <input
                onChange={onChange}
                value={value}
                type="text"
                placeholder="enter email"
                className="p-3 rounded-lg bg-black"
              />
            )}
          />
          {<p style={{ color: "red" }}>{errors.email?.message}</p>}
        </div>
        <div className="p-4">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, onBlur, name, ref } }) => (
              <input
                onChange={onChange}
                value={value}
                type="password"
                placeholder="enter password"
                className="p-3 rounded-lg bg-black border-2  border-white "
              />
            )}
          />
          {<p style={{ color: "red" }}>{errors.password?.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 p-1 rounded-md ml-4">
          Submit
        </button>
      </form>

      <div className="text-center mt-10">
        <Link href="/multipleform" className="text-green-600">
          Go to Multiple Form Page
        </Link>
      </div>
    </main>
  );
}

export default Page;
