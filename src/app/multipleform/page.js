"use client";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  values: yup.array().of(
    yup.object().shape({
      email: yup
        .string()
        .email("email format is not valid")
        .required("email id is required"),
      password: yup
        .string()
        .trim()
        .required("password is required")
        .min(6)
        .max(8),
      name: yup.string().trim().required("name is required"),
      skill: yup.string().trim().required("skill is required"),
    })
  ),
});

const generateValues = () => {
  return {
    name: "",
    email: "",
    password: "",
    skill: "",
  };
};

function Page() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      values: [generateValues()],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({ control, name: "values" });
  console.log(errors);

  //? importent to set yup validation properly like array values
  return (
    <div className="bg-cyan-200 h-screen overflow-auto flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-black mt-4">
        React Hook Form - useFieldArray
      </h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div>
              <Controller
                name={`values.${index}.name`}
                control={control}
                render={({ field: { onChange, value, onBlur, name, ref } }) => (
                  <input
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="enter name"
                    className="p-3 rounded-lg bg-black w-full border-2 border-white m-2"
                  />
                )}
              />
              {
                <p style={{ color: "red" }}>
                  {errors.values?.[index]?.name?.message}
                </p>
              }
            </div>

            <div>
              <Controller
                name={`values.${index}.email`}
                control={control}
                render={({ field: { onChange, value, onBlur, name, ref } }) => (
                  <input
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="enter email"
                    className="p-3 rounded-lg bg-black w-full border-2 border-white m-2"
                  />
                )}
              />
              {
                <p style={{ color: "red" }}>
                  {errors.values?.[index]?.email?.message}
                </p>
              }
            </div>

            <div>
              <Controller
                name={`values.${index}.password`}
                control={control}
                render={({ field: { onChange, value, onBlur, name, ref } }) => (
                  <input
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="enter password"
                    className="p-3 rounded-lg bg-black w-full border-2 border-white m-2"
                  />
                )}
              />
              {
                <p style={{ color: "red" }}>
                  {errors.values?.[index]?.password?.message}
                </p>
              }
            </div>

            <div>
              <Controller
                name={`values.${index}.skill`}
                control={control}
                render={({ field: { onChange, value, onBlur, name, ref } }) => (
                  <input
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="enter skill"
                    className="p-3 rounded-lg bg-black w-full border-2 border-white m-2"
                  />
                )}
              />
              {
                <p style={{ color: "red" }}>
                  {errors.values?.[index]?.skill?.message}
                </p>
              }
            </div>

            <button
              onClick={() => remove(index)}
              className="p-1 bg-red-500 rounded-lg text-sm ml-3"
            >
              Remove
            </button>
          </div>
        ))}

        <div>
          <button type="submit" className="w-full bg-blue-500 py-2 mt-4">
            Submit
          </button>
        </div>
      </form>

      <div>
        <button
          onClick={() => append(generateValues())}
          className="mt-4 text-green-500"
        >
          Add More+
        </button>
      </div>
    </div>
  );
}

export default Page;
