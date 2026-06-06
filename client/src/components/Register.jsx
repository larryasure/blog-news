import { Loader2, LockKeyhole, Mail, Phone, User, Users } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { success, register, error, setError, loading } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !e.target.first_name.value ||
      !e.target.last_name.value ||
      !e.target.phone_number.value ||
      !e.target.username.value
    ) {
      setError("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const formData = {
      email: email,
      password: password,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone_number: e.target.phone_number.value,
      username: e.target.username.value,
    };

    const isSuccess = await register(formData);

    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleChange = () => {
    if (error) setError("");
  };

  return (
    <div className="min-h-screen px-8 bg-gray-50/50 flex items-center justify-center">
      <div className="w-full max-w-sm mt-10  bg-white/85 shadow-xl border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center flex-col text-center">
          <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
            Let's Get Started!
          </h3>
          <p className="font-normal text-sm text-gray-500 mt-1">
            Create an Account with{" "}
            <span className="tracking-widest font-bold text-gray-900">
              MicroNews
            </span>
          </p>
        </div>

        <form
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[13px] font-semibold mb-3  ">
                First Name
              </span>

              <div className="relative w-full">
                <User className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  name="first_name"
                  placeholder="John"
                  className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            <div className="">
              <span className="text-[13px] font-semibold mb-3  ">
                Last Name
              </span>

              <div className="relative w-full">
                <Users className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="">
            <span className="text-[13px] font-semibold mb-3  ">
              Phone Number
            </span>
            <div className="relative w-full">
              <Phone className="absolute size-4 transform -translate-y-1/2 top-1/2 left-4 text-gray-400  " />
              <input
                type="text"
                name="phone_number"
                placeholder="phone_number"
                className="w-full  border border-gray-200 h-10 pr-4 pl-12 placeholder:text-[13px] placeholder:font-medium focus:border-blue-400 transition-colors rounded-xl  "
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <span className="text-[13px] font-semibold mb-3  ">Email</span>

            <div className="relative w-full">
              <Mail className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
              <input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Username Input */}
          <div>
            <span className="text-[13px] font-semibold mb-3  ">Username</span>

            <div className="relative w-full">
              <User className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <span className="text-[13px] font-semibold mb-3  ">Password</span>

            <div className="w-full relative">
              <LockKeyhole className="size-4 absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <span className="text-[13px] font-semibold mb-3  ">
              Confirm Password
            </span>

            <div className="w-full relative">
              <LockKeyhole className="size-4 absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>
          {error && (
            <div className="text-xs text-center px-4 py-1 font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="text-xs text-center px-4 py-1 font-medium bg-green-50 text-green-600 rounded-xl border border-green-200 ">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 font-semibold bg-sky-500 hover:bg-sky-600 active:scale-[0.99] text-white h-10 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:pointer-events-none shadow-md shadow-sky-100 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin opacity-50" />
                <span>Creating Account...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
