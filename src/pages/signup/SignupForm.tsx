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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
          },
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
        {...register("organisationName", { required: "Organisation name is required" })}
        placeholder="Organisation Name"
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.organisationName ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.organisationName && (
        <span className="text-red-500 text-sm">{errors.organisationName.message}</span>
      )}

      <input
        id="userName"
        {...register("userName", { required: "Your name is required" })}
        placeholder="Your Name"
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.userName ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.userName && (
        <span className="text-red-500 text-sm">{errors.userName.message}</span>
      )}

      <input
        id="userEmail"
        type="email"
        {...register("userEmail", { required: "Email is required" })}
        placeholder="Email"
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.userEmail ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.userEmail && (
        <span className="text-red-500 text-sm">{errors.userEmail.message}</span>
      )}

      <input
        id="userPassword"
        type="password"
        {...register("userPassword", { required: "Password is required" })}
        placeholder="Password"
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.userPassword ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.userPassword && (
        <span className="text-red-500 text-sm">{errors.userPassword.message}</span>
      )}

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
