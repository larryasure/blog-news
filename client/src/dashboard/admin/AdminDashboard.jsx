import { useOutletContext } from "react-router-dom";

export default function AdminDashboard() {
  const {users, loading, posts, categories} = useOutletContext()
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mt-8 ">
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-gray-500  text-sm">Users</h3>
            <p className="text-3xl  font-bold mt-2 ">{ users?.length}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-gray-500  text-sm">Posts</h3>
            <p className="text-3xl  font-bold mt-2 ">{ posts?.length}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-gray-500  text-sm">Categories</h3>
            <p className="text-3xl  font-bold mt-2 ">{ categories?.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
