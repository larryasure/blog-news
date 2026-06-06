import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function AdminUsers() {
  const { users, loading, updateUser, deleteUser } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex item-center justify-center my-10 ">
        <div className="flex items-center gap-2 ">
          Loading
          <span
            style={{ animationDuration: "0ms" }}
            className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"
          ></span>
          <span
            style={{ animationDuration: "200ms" }}
            className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"
          ></span>
          <span
            style={{ animationDuration: "400ms" }}
            className="w-2 h-2 bg-sky-600 rounded-full animate-bounce"
          ></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-3 ">
        <h1 className="text-xl font-semibold my- ">Users</h1>

        <div className="overflow-x-auto shadow-md bg-white rounded-xl ">
          <table className="w-full text-sm ">
            <thead className="bg-gray-50 border-b ">
              <tr>
                <th className="text-left p-3 ">Name</th>
                <th className="text-left p-3 ">Email</th>
                <th className="text-left p-3 ">Role</th>
                <th className="text-left p-3 ">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300">
              {users.map((user) => (
                <tr key={user.id} className="p-6">
                  <td className="p-3 capitalize ">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-3 text-gray-600 ">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 flex items-center gap-5">
                    <select
                      value={user.role}
                      onChange={(e) => updateUser(user.id, e.target.value)}
                      className="p-1 rounded border"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="author">Author</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => setIsModalOpen(user.id)}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 active:scale-105 duration-200 transition-all "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center animate-fade-in">
          <div className="max-w-lg bg-sky-100  p-6 shadow-[0_2px_50px_-12px_rgba(0,0,0,0.8)]   relative flex items-center rounded-lg   border border-gray-300 flex-col gap-2 ">
            <h3 className="text-2xl text-gray-900">Delete User </h3>
            <p className="text-gray-600 ">
              Are you sure you want to delete this user ?{" "}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-7 ">
              <button
                className="text-sky-600 px-4 py-2 bg-sky-100 rounded-lg shadow cursor-pointer active:scale-105 duration-200 transition-all  "
                onClick={() => setIsModalOpen(null)}
              >
                Cancel
              </button>

              <button
                className="text-red-600 bg-red-100 shadow cursor-pointer active:scale-105 px-4 py-2 duration-200 transition-all rounded-lg "
                onClick={() => {
                  deleteUser(isModalOpen);
                  setIsModalOpen(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
