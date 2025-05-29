import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  organisationName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/organisations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.organisationName,
          user: {
            name: data.userName,
            email: data.userEmail,
            password: data.userPassword,
          }
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.errors?.[0]?.message || "Signup failed");
      }

      localStorage.setItem("authToken", resData.token);
      localStorage.setItem("userData", JSON.stringify(resData.user));
      navigate("/account/projects");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="organisationName"
        {...register("organisationName", { required: true })}
        placeholder="Organisation Name"
        className="w-full border rounded-md py-2 px-3 my-2"
      />
      <input
        id="userName"
        {...register("userName", { required: true })}
        placeholder="Your Name"
        className="w-full border rounded-md py-2 px-3 my-2"
      />
      <input
        id="userEmail"
        type="email"
        {...register("userEmail", { required: true })}
        placeholder="Email"
        className="w-full border rounded-md py-2 px-3 my-2"
      />
      <input
        id="userPassword"
        type="password"
        {...register("userPassword", { required: true })}
        placeholder="Password"
        className="w-full border rounded-md py-2 px-3 my-2"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
