import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/api";

export default function AdminCategories() {
  const { loading, categories } = useOutletContext();
  const [localCategories, setLocalCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [slugName, setSlugName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteCat, setDeleteCat] = useState(null);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const openDeleteModal = (cat) => {
    setDeleteCat(cat);
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`categories/${id}/`);
      setLocalCategories((prev) => prev.filter((cat) => cat.id !== id));
      setDeleteCat(null);
    } catch (error) {
      console.error("Failed to delete Category", error);
    }
  };

  // const addCategory = async (e) => {
  //   e.preventDefault();

  //   setError("");
  //   setSuccess("");

  //   if (!categoryName.trim() || !slugName.trim()) {
  //     setError("All fields are required");
  //     return;
  //   }
  //   try {
  //     const res = await api.post(`categories/`, {
  //       name: categoryName.trim(),
  //       slug: slugName.trim(),
  //     });

  //     console.log("Category created", res.data);
  //     setSuccess("Category created successfully");

  //     setCategoryName("");
  //     setSlugName("");
  //   } catch (error) {
  //     console.error("Failed to add Category", error);
  //   }
  // };

  const addCategory = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!categoryName.trim() || !slugName.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post(`categories/`, {
        name: categoryName.trim(),
        slug: slugName.trim(),
      });

      console.log("Category created", res.data);

      setLocalCategories((prev) => [...prev, res.data]);

      setSuccess("Category created successfully");

      setCategoryName("");
      setSlugName("");
    } catch (error) {
      console.error("Failed to add Category", error);
      setError(error.response?.data?.detail || "Failed to create category");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]  ">
        <div className="flex gap-2 text-center items-center bg-white  rounded-xl shadow-md  p-8 max-w-md w-full text-[#1a61b1] ">
          Loading
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"
            style={{ animationDelay: "400ms" }}
          ></span>
        </div>
      </div>
    );
  }
  return (
    <>
      {localCategories.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]  ">
          <div className="flex gap-2 text-center items-center bg-white  rounded-xl shadow-md  p-8 max-w-md w-full text-[#1a61b1] ">
            No categories found.
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {localCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between  gap-3  hover:bg-sky-50 transition-all duration-200 cursor-pointer "
            >
              <h3 className="font-semibold text-lg ">{cat.name}</h3>

              <div onClick={() => openDeleteModal(cat)}>
                <Trash className="size-4  text-red-400 active:scale-110 duration-300 transition-all " />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="min-h-[50vh] mt-16 max-w-sm w-full bg-gray-50  p-6 rounded-xl shadow mb-10  ">
        <h3 className="text-2xl font-bold ">Add Category</h3>

        <form onSubmit={addCategory} className="space-y-4">
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm font-semibold ">Name</label>
            <input
              type="text"
              name="name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setError("");
              }}
              placeholder="category name"
              className="w-full border border-sky-300 py-2 px-4 rounded-xl focus:ring-0 outline-1 outline-sky-300 capitalize"
            />
          </div>

          <div className="flex flex-col mt-3.5 ">
            <label className="text-sm font-semibold mb-2">Slug</label>
            <input
              value={slugName}
              onChange={(e) => {
                setSlugName(e.target.value);
                setError("");
              }}
              type="text"
              name="slug"
              placeholder="slug"
              className="w-full border border-sky-300 py-2 px-4 rounded-xl focus:ring-0 outline-1 outline-sky-300  "
            />
          </div>

          {error && (
            <div className="text-xs text-red-500 bg-red-50 text-center p-1 rounded-lg border border-red-200 mt-2">
              {error}
            </div>
          )}

          {success && (
            <div className="text-xs text-green-500 bg-green-50 p-1 rounded border border-green-200 mt-2">
              {success}
            </div>
          )}

          <div className="mt-4 flex items-center  justify-center">
            <button
              className="px-4 py-1.5 rounded-lg shadow cursor-pointer w-full    text-sky-600 bg-sky-50 hover:bg-sky-100 "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {deleteCat && (
        <div className="fixed bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 inset-0 ">
          <div className="bg-white max-w-sm shadow-md rounded-xl p-8 w-full flex flex-col ">
            <h3 className="text-2xl font-bold ">Delete Category </h3>

            <div className="mt-4">
              <p className="font-semibold text-gray-800">
                Are you sure you want to delete
                <span className="text-red-500 font-bold">
                  {" "}
                  {deleteCat.name}
                </span>
                ?
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-7 ">
              <button
                onClick={() => setDeleteCat(null)}
                className="font-semibold bg-green-50 hover:bg-green-100 cursor-pointer py-1 px-4 text-green-600 shadow active:scale-110 transition-all duration-200 "
              >
                Cancel
              </button>

              <button
                onClick={() => deleteCategory(deleteCat.id)}
                className="font-semibold bg-red-50 hover:bg-red-100 cursor-pointer py-1 px-4 text-red-600 shadow active:scale-110 transition-all duration-200 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
