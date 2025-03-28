import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [Inputs, setInputs] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:w-[40%] md:w-[60%] w-[80%] p-12 shadow-2xl rounded flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col lg:flex-row gap-2 text-center">
          <h1 className="font-bold">Welcome Again!</h1>
          <span>Login to Club Connect</span>
        </div>
        <form action="" className="flex flex-col w-[100%] mt-8">
          <div className="flex flex-col mb4">
            <label>Email</label>
            <input
              type="email"
              value={Inputs.email}
              name="email"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
              required
              onChange={change}
            />
          </div>
          <div className="flex flex-col mb4">
            <label>Password</label>
            <input
              type="password"
              value={Inputs.password}
              name="password"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
              required
              onChange={change}
            />
          </div>
          <div className="flex mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-[100%]">
              Login
            </button>
          </div>
        </form>

        <h4 className="mt-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Signup
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
