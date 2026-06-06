import {
  LayoutGridIcon,
  LogOut,
  Menu,
  Shapes,
  SquareStack,
  Users,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Vector.png";
import logoutImage from "../../assets/logout2.jpg";
import { AuthContext } from "../../context/AuthContext";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const navClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all duration-150
   ${isOpen ? "justify-start" : "justify-center"}
   ${
     isActive
       ? "bg-sky-500 text-black"
       : "bg-white text-gray-700 hover:text-gray-800"
   }`;

  return (
    <>
      <div
        className={`relative flex flex-col shrink-0 bg-[#1a61b1] min-h-screen shadow-md border-r border-gray-200 transition-all duration-300 ${isOpen ? "w-48" : "w-20"}`}
      >
        <div className="flex w-full items-center justify-between px-4 py-3 border-b border-gray-400">
          {isOpen && (
            <div className="flex items-center gap-1">
              <img src={logo} alt="Logo Image" className="w-10" />
              <h3 className="tracking-widest font-medium text-white">News</h3>
            </div>
          )}

          <button
            className={`p-1.5 hover:text-[#4695ef] rounded-md transition-colors duration-200 cursor-pointer bg-gray-200 ${!isOpen && "mx-auto"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="overflow-y-auto mt-8 space-y-4 flex-1 py-2 px-4 ">
          <NavLink
            to="/admin/dashboard"
            end
            title="Dashboard"
            className={navClass}
          >
            <LayoutGridIcon className="w-5 h-5 shrink-0" />

            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink to={"/admin/users"} end title="Users" className={navClass}>
            <Users className="w-5 h-5 shrink-0" />

            {isOpen && <span>Users</span>}
          </NavLink>

          <NavLink to="/admin/posts" end title="Posts" className={navClass}>
            <SquareStack className="w-5 h-5 shrink-0" />

            {isOpen && <span>Posts</span>}
          </NavLink>

          <NavLink
            to="/admin/categories"
            end
            title="Categories"
            className={navClass}
          >
            <Shapes className="w-5 h-5 shrink-0" />

            {isOpen && <span>Categories</span>}
          </NavLink>
        </nav>

        <div className="border-t border-gray-400 px-4 py-4 space-y-4">
          <NavLink
            onClick={() => setIsModalOpen(true)}
            title="Logout"
            className={navClass}
          >
            <LogOut className="w-5 h-5 shrink-0 " />

            {isOpen && <span>Log Out</span>}
          </NavLink>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs inset-0 ">
          <div className="bg-white max-w-xs p-7 w-full rounded-xl shadow flex items-center  flex-col">
            <div className="flex items-center justify-center w-full ">
              <img
                src={logoutImage}
                alt="Logout Image"
                className="object-cover h-28  "
              />
            </div>

            <div className="mt-4  flex items-center text-center   flex-col">
              <h3 className="text-xl font-semibold  text-gray-800 ">
                Are you sure you want to Logout ?
              </h3>
              <p className="text-gray-500 text-sm  font-medium mt-2">
                Abeg NAH😕{" "}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-3 ">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-1 text-sky-500 hover:bg-sky-100 bg-sky-50 rounded-lg cursor-pointer  shadow  active:scale-110 duration-300 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-5 py-1 text-red-500 hover:bg-red-100 bg-red-50 rounded-lg cursor-pointer  shadow  active:scale-110 duration-300 transition-all"
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
