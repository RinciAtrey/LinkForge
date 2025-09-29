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
            />

            <TextField
              label="Password"
              required
              id="password"
              type="password"
              message="*Password is required"
              placeholder="Type your password"
              register={register}
              min={6}
              errors={errors}
            />
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
