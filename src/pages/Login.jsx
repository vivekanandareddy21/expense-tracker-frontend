import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );

      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920')"
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">

          <div className="text-7xl mb-6">
            💰
          </div>

          <h1 className="text-6xl font-bold mb-6">
            Expense Tracker
          </h1>

          <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
            Track your expenses, manage monthly budgets,
            analyze spending patterns, and gain complete
            control over your finances with real-time insights.
          </p>

          <div className="mt-8 space-y-3 text-lg">

            <div>
              ✅ Expense Management
            </div>

            <div>
              ✅ Budget Tracking
            </div>

            <div>
              ✅ Analytics Dashboard
            </div>

            <div>
              ✅ Financial Reports
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">

        <div
          className="
          bg-white
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
          "
        >

          <h2 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleLogin}>

            <div className="mb-5">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
                required
              />

            </div>

            <div className="mb-6">

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
                required
              />

            </div>

            <button
              type="submit"
              className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4
              rounded-xl
              font-semibold
              text-lg
              transition
              "
            >
              Sign In
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;