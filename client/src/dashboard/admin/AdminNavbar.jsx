import { Bell, Search } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminNavbar() {
  const { user } = useContext(AuthContext);

  const initials = (user?.first_name?.[0] || "") + (user?.last_name?.[0] || "");

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4 ">
        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        <Link to="/dashboard" className="font-medium ">
          User Dashboard
        </Link>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
        <Search className="w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
            2
          </span>
        </button>

        <div className="w-9 h-9 capitalize rounded-full bg-sky-500 flex items-center justify-center font-bold text-black">
          {initials || "A"}
        </div>
      </div>
    </header>
  );
}
