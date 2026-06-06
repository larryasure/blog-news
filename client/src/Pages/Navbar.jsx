import { NavLink } from "react-router-dom";
import logo from "../assets/Vector.png";

export default function Navbar() {


  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between fixed w-full top-0 z-10  ">
        <NavLink to="/">
          <div className="flex items-center gap-0.5">
            <img src={logo} className="w-10 " alt="logo image" />

            <h3 className="font-semibold tracking-widest">News</h3>
          </div>
        </NavLink>

        <div className=" flex items-center gap-4 ">
          <NavLink to="/register">
            <button className="font-medium px-3 py-1 duration-200 transition-all hover:bg-[#89D1F1] rounded-xl cursor-pointer">
              Register
            </button>
          </NavLink>

          <NavLink to="/login">
            <button className="font-medium px-3 py-1 duration-200 transition-all hover:bg-[#89D1F1] rounded-xl cursor-pointer">
              Login
            </button>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
