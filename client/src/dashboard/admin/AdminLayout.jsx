import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import api from "../../api/api"; // Make sure this path points to your API configuration file

export default function AdminLayout() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Wrap inside a useCallback hook so children can safely trigger it without infinite renders
  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, postsRes, catRes] = await Promise.all([
        api.get(`user/`),
        api.get(`post/`),
        api.get(`categories/`),
      ]);

      setUsers(usersRes.data);
      setPosts(postsRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.log("Failed to sync Admin data ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const deleteUser = async (id) => {
    try {
      await api.delete(`user/${id}/`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const updateUser = async (id, role) => {
    try {
      await api.patch(`user/${id}/`, { role });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-sky-50 text-gray-900 font-sans">
      <aside className="">
        <AdminSidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        
        <main className="flex-1 bg-sky-50 overflow-y-auto p-8">
          <Outlet context={{ users, posts, categories, loading, updateUser, deleteUser, refreshData: fetchAdminData }} />
        </main>
      </div>
    </div>
  );
}
