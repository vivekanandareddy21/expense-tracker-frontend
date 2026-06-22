import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/users",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center px-16">

        <div>

          <div className="text-7xl mb-6">
            💰
          </div>

          <h1 className="text-6xl font-bold mb-6">
            Expense Tracker
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed">
            Create your account and start managing
            expenses, budgets, and reports with ease.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div
          className="
            bg-white
            p-10
            rounded-3xl
            shadow-xl
            hover:shadow-2xl
            transition
            duration-300
            w-full
            max-w-md
          "
        >

          <h2 className="text-4xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Register to get started
          </p>

          <form onSubmit={handleRegister}>

            <div className="mb-4">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
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
                  focus:border-transparent
                "
                required
              />

            </div>

            <div className="mb-4">

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
                  focus:border-transparent
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
                  focus:border-transparent
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
              Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;