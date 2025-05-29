import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      const resData = await response.json();

      localStorage.setItem("authToken", resData.token);
      localStorage.setItem("userData", JSON.stringify(resData.user));

      navigate("/account/projects");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        className={`w-full border rounded-md py-2 px-3 my-2 ${
          errors.password ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
