import { Loader2, LockKeyhole, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/AuthContext";

export default function Login() {
  const { login, loading, error, setError, success, setSuccess } =
    useContext(Authcontext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (setError) {
      setError("");
    }
    if (setSuccess) {
      setSuccess("");
    }

    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setError("All fields must be filled");
      return;
    }

    const isLoggedIn = await login(username, password);
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen px-8 bg-gray-50/50 flex items-center justify-center">
        <div className="w-full max-w-sm bg-white/85 shadow-xl border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center flex-col text-center">
            <h3 className="text-xl font-semibold  ">Welcome Back!</h3>
            <p className="mt-2">
              Log in to existing
              <span className="font-bold tracking-wider text-blue-400">
                {" "}
                MicroNews{" "}
              </span>
              account{" "}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="items-start flex flex-col gap-7 mt-10"
          >
            <div className="flex items-start gap-3 flex-col w-full">
              <div className="w-full ">
                <span className="text-[13px] font-semibold mb-3  ">
                  Username
                </span>

                <div className="relative w-full">
                  <User className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="johndoe"
                    className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div className="w-full ">
                <span className="text-[13px] font-semibold mb-3  ">
                  Password
                </span>

                <div className="relative w-full">
                  <LockKeyhole className="text-gray-400 size-4 absolute -translate-y-1/2 left-4 top-1/2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="current-password"
                    className="w-full border border-gray-200 rounded-xl h-10 outline-none pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center ">
                <p className="text-xs  py-0.5 px-4 bg-red-50 text-red-600 rounded-xl border border-red-200 ">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="flex items-center ">
                <p className="text-xs py-0.5 px-4 bg-green-50 text-green-600 border rounded-xl border-green-200">
                  {success}
                </p>
              </div>
            )}

            <button className="w-full  font-semibold bg-sky-500 hover:bg-sky-600 active:scale-[0.99] text-white h-10 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:pointer-events-none shadow-md shadow-sky-100 cursor-pointer">
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="size-4 animate-spin opacity-55" />
                  <span>Logging in....</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
