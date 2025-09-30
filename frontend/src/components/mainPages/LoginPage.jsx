import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useStoredContext } from "../../contextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoredContext();
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

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      console.log(response.token);
      setToken(response.token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      toast.success("Login Successful!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center ">
      <div className="sm:w-[760px] w-[92%] grid sm:grid-cols-2 gap-6 items-stretch">
        {/* Left visual / branding panel */}
        <div className="hidden sm:flex flex-col justify-center px-10 py-12 rounded-l-2xl bg-gradient-to-br from-[#FFEDD5]/10 to-[#FFF7ED]/5 border border-neutral-700/40 shadow-custom">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-md bg-gradient-to-r from-orange-400 to-orange-700 flex items-center justify-center text-white font-bold">
              LF
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">LinkForge</h2>
              <p className="text-sm text-neutral-300">Shorten. Share. Track.</p>
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg mb-3">
            Welcome back!
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            Login to your account to manage your short links, see analytics. If you're new, creating an account is
            quick and free.
          </p>

          <div className="mt-6">
            <ul className="text-sm text-neutral-400 space-y-2">
              <li>• Create unlimited short links</li>
              <li>• View click analytics</li>
              <li>• Manage links</li>
            </ul>
          </div>
        </div>

        {/* Right form panel */}
        <form
          onSubmit={handleSubmit(loginHandler)}
          autoComplete="on"
          className="sm:rounded-r-2xl rounded-2xl bg-neutral-900/70 backdrop-blur p-8 sm:px-10 sm:py-12 shadow-custom border border-neutral-700/50"
        >
          {/* small style to force input text color white for our password wrapper only */}
          <style>{`.pw-wrapper input { color: #fff !important; }`}</style>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className=" font-bold lg:text-3xl text-2xl">
                Login Here
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                Enter your credentials to continue
              </p>
            </div>
          </div>

          <hr className="border-neutral-700 mb-6" />

          <div className="flex flex-col gap-4">
            <TextField
              label="Username"
              required
              id="username"
              type="text"
              message="*Username is required"
              placeholder="Type your username"
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
            {loader ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-sm text-neutral-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link className="font-semibold underline text-btnColor" to="/register">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
