import { LogOut, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../api/api";
import logo from "../assets/Vector.png";
import { AuthContext } from "../context/AuthContext";

export default function DashNavbar() {
  const { user, logout } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  const isAdmin = user?.role === "admin";
  const isAuthor = user?.role === "author";

  // Initials
  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user?.username?.[0]?.toUpperCase();

  const displayInitials = initials || "U";

  // Loading state
  // if (!user) {
  //   return (
  //     <nav className="h-16 border-b border-gray-200 bg-white flex items-center px-6">
  //       <p className="text-sm text-gray-500">Loading...</p>
  //     </nav>
  //   );
  // }

  return (
    <>
      <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <NavLink to="/dashboard">
                <div className="flex items-center gap-1">
                  <img src={logo} className="w-10" alt="logo" />

                  <h3 className="font-bold tracking-widest text-lg">News</h3>
                </div>
              </NavLink>

              <div className="hidden sm:flex items-center gap-8">
                <NavLink
                  to="/dashboard/posts"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-sky-500"
                        : "text-gray-700 hover:text-sky-400"
                    }`
                  }
                >
                  Posts
                </NavLink>

                <div className="relative group">
                  <button className="font-medium text-gray-700 hover:text-sky-400 transition-colors cursor-pointer duration-500 ">
                    Categories ▾
                  </button>

                  <div className="absolute w-80 left-0 pt-3 z-50 pointer-events-none opacity-0 translate-y-2 invisible group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 ease-out">
                    <div className="bg-gray-100 backdrop-blur-xl border border-gray-400 rounded-2xl p-4 shadow-2xl relative overflow-hidden max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-transparent">
                      <div className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase  pt-2 border-b border-gray-300 pb-2 font-mono">
                        Select category
                      </div>

                      {categories.length > 0 ? (
                        <div className="grid grid-cols-2 gap-1.5">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/category/${cat.id}`}
                              className="block px-2 py-1.5 text-xs  hover:text-black hover:bg-slate-800/50 rounded-xl duration-300 transition-all font-medium tracking-wide truncate border border-transparent hover:border-slate-800"
                            >
                              <span className="text-sky-400 mr-1.5 font-serif group-hover:text-gray-400">
                                #
                              </span>
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="px-3 py-4 text-xs italic text-slate-500 text-center font-serif">
                          No Category{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {(isAdmin || isAuthor) && (
                  <Link
                    to="/dashboard/create_post"
                    className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-all text-sm font-medium shadow-sm"
                  >
                    Create Post
                  </Link>
                )}
              </div>

              {isAdmin && (
                <Link
                  className="text-gray-800 font-medium "
                  to="/admin/dashboard"
                >
                  AdminPanel
                </Link>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* USER PROFILE */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-200 flex items-center justify-center font-bold text-black">
                  {displayInitials}
                </div>

                <div className="hidden sm:flex flex-col leading-tight capitalize">
                  {(user?.role === "author" || user?.role === "admin") && (
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.username}
                    </span>
                  )}

                  <span className="text-xs text-gray-500 capitalize">
                    {(user?.role === "admin" || user?.role === "author") && (
                      <span className="capitalize">{user.role}</span>
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium transition-all cursor-pointer"
              >
                Logout
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden text-gray-700"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="sm:hidden flex flex-col gap-4 mt-6 border-t pt-5">
              <NavLink
                to="/dashboard/posts"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-sky-500"
              >
                Posts
              </NavLink>

              {(isAdmin || isAuthor) && (
                <Link
                  to="/dashboard/create_post"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-sky-500"
                >
                  Write Post
                </Link>
              )}

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Categories</p>

                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="text-sm text-gray-600 hover:text-sky-500"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* LOGOUT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xs  rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ICON */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>

              <h3 className="text-lg font-semibold">Leaving so soon?</h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Are you sure you want to log out of your account?
              </p>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsModalOpen(false);
                }}
                className="py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
