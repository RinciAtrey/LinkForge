import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextField from "../TextField";
import api from "../../api/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- added

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      navigate("/login");
      toast.success("Registeration Successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registeration Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="sm:w-[760px] w-[92%] grid sm:grid-cols-2 gap-6 items-stretch">
        {/* Left: Form panel (now on left) */}
        <form
          onSubmit={handleSubmit(registerHandler)}
          autoComplete="on"
          className="sm:rounded-l-2xl rounded-2xl bg-neutral-900/70 backdrop-blur p-8 sm:px-10 sm:py-12 shadow-custom border border-neutral-800/50"
        >
          {/* small style to force input text color white for our password wrapper only */}
          <style>{`.pw-wrapper input { color: #fff !important; }`}</style>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-bold lg:text-3xl text-2xl">
                Register Here
              </h1>
            </div>
          </div>

          <hr className="border-neutral-700 mb-6" />

          <div className="flex flex-col gap-4">
            <TextField
              label="UserName"
              required
              id="username"
              type="text"
              message="*Username is required"
              placeholder="Type your username"
              register={register}
              errors={errors}
              className="text-white"
            />

            <TextField
              label="Email"
              required
              id="email"
              type="email"
              message="*Email is required"
              placeholder="Type your email"
              register={register}
              errors={errors}
              className="text-white"
            />

<div className="relative">
  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Type your password"
      {...register("password", {
        required: "*Password is required",
        minLength: { value: 6, message: "Minimum 6 characters" },
      })}
      className="w-full rounded-md border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none"
      autoComplete="current-password"
    />

    <button
      type="button"
      onClick={() => setShowPassword((s) => !s)}
      className="absolute right-3 inset-y-0 flex items-center text-sm text-neutral-300 bg-transparent px-1 focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>

  {errors.password && (
    <p className="text-xs text-red-400 mt-2">
      {errors.password.message}
    </p>
  )}
</div>

          </div>

          <button
            disabled={loader}
            type="submit"
            className="mt-6 w-full py-3 rounded-md text-white font-semibold transition-all duration-150 transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 to-orange-800 shadow-md"
          >
            {loader ? "Loading..." : "Register"}
          </button>

          <p className="text-center text-sm text-neutral-400 mt-6">
            Already have an account?{" "}
            <Link className="font-semibold underline text-btnColor" to="/login">
              Login
            </Link>
          </p>
        </form>

        {/* Right: Branding / info panel (now on right) */}
        <div className="hidden sm:flex flex-col justify-center px-10 py-12 rounded-r-2xl bg-gradient-to-br from-[#FFEDD5]/10 to-[#FFF7ED]/5 border border-neutral-700/40 shadow-custom">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 flex items-center justify-center text-white font-bold">
              LF
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">LinkForge</h2>
              <p className="text-sm text-neutral-400">Shorten. Share. Track.</p>
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg mb-3">
            Create your free account
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Join LinkForge to create unlimited short links and view analytics — all in one place.
          </p>

          <div className="mt-2">
            <ul className="text-sm text-neutral-400 space-y-2">
              <li>• Unlimited short links</li>
              <li>• Basic click analytics</li>
              <li>• Lightweight, privacy friendly</li>
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-neutral-800/60 border border-neutral-700 text-sm text-neutral-200">
              Free
            </div>
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-sm text-white">
              Get Started
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
