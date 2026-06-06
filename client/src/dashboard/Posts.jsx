import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Authcontext } from "../context/Authcontext";
import PostCard from "./PostCard";

export default function Posts() {
  const { user } = useContext(Authcontext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletePost, setDeletePost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const openDeleteModal = (post) => {
    setDeletePost(post);
  };

  const openEditModal = (post) => {
    setEditPost(post);

    setCategory(post.category);
    setTitle(post.title);
    setContent(post.content);
    setImage(post.image);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("post/");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`categories/`);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeletePost = async (id, event) => {
    try {
      await api.delete(`post/${id}/`);
      setPosts((prevPost) => prevPost.filter((n) => n.id !== id));

      if (event.key === "Escape") {
        setDeletePost(null);
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handleUpdateChange = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", editPost.title);
      formData.append("content", editPost.content);
      formData.append("category", editPost.category);

      if (editPost.image instanceof File) {
        formData.append("image", editPost.image);
      }

      const res = await api.put(`post/${editPost.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPosts((prev) =>
        prev.map((post) => (post.id === editPost.id ? res.data : post)),
      );
      setEditPost(null);
    } catch (error) {
      console.error("Failed to edit post", error);
    }
  };

  function openCreate() {
    navigate("/dashboard/create_post");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] *:bg-gray-50">
        <div className="max-w-md w-full text-center py-10 bg-sky-50 rounded-xl shadow-md">
          <p className="text-lg font-semibold mb-4">Loading your posts...</p>
          <div className="flex items-center justify-center gap-2">
            <span
              className="w-3 h-3 bg-sky-600 rounded-full animate-bounce"
              style={{ animationDuration: "0ms" }}
            ></span>
            <span
              className="w-3 h-3 bg-sky-600 rounded-full animate-bounce"
              style={{ animationDuration: "200ms" }}
            ></span>
            <span
              className="w-3 h-3 bg-sky-600 rounded-full animate-bounce"
              style={{ animationDuration: "400ms" }}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-xs text-red-500 ">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="my-15 h-52 bg-sky-50 shadow-md max-w-sm mx-auto rounded-xl text-center p-6">
          <h2 className="text-xl font-semibold">No post Yet</h2>
          <p className="text-gray-500 text-sm mt-2">
            Start Creating content for your audience
          </p>

          {(user?.role === "admin" || user?.role === "author") && (
            <div className="mt-8 flex items-center justify-center">
              <button
                onClick={openCreate}
                className="px-4 py-2 rounded-xl shadow-md transition-all duration-200 active:scale-105 hover:bg-sky-400 hover:text-white cursor-pointer"
              >
                Create Posts
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen my-7 px-7">
        <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 ">
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard
                post={post}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
              />
            </div>
          ))}
        </div>
      </div>

      {deletePost && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center animate-fade-in z-50 bg-black/50 ">
          <div className="max-w-sm w-full p-8 bg-white  rounded-xl  ">
            <div className="flex items-center justify-between ">
              <div>
                <h3 className="text-2xl font-bold ">Delete Post</h3>
              </div>

              <div onClick={() => setDeletePost(null)}>
                <X className="text-red-600  bg-red-50 rounded-md shadow cursor-pointer active:scale-115 duration-200 transition-all" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="tracking-wide">
                Are you sure you want to delete
                <span className="font-medium underline underline-offset-2 text-red-400 text-sm tracking-wider ">
                  {" "}
                  "{deletePost?.title}" ?{" "}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-7  mt-10">
              <button
                onClick={() => setDeletePost(null)}
                className="text-green-500 bg-green-50 hover:bg-green-200 rounded-lg shadow px-4 py-1  active:scale-110 duration-200 transition-all  cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeletePost(deletePost.id);
                  setDeletePost(null);
                }}
                className="text-red-500 bg-red-50 hover:bg-red-200 rounded-lg shadow px-4 py-1  active:scale-110 duration-200 transition-all  cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editPost && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm animate-fade-in flex justify-end">
          {/* Full Screen Height Sidebar Container */}
          <div className="w-full max-w-lg bg-white shadow-2xl h-screen flex flex-col p-8 justify-between animate-slide-in-right">
            {/* Top Header Section */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-gray-800">Edit Post</h3>
              <div onClick={() => setEditPost(null)}>
                <X className="text-red-400 bg-red-50 w-7 h-7 rounded-sm active:scale-110 duration-200 transition-all cursor-pointer" />
              </div>
            </div>

            <form
              onSubmit={handleUpdateChange}
              className="flex-1 overflow-y-auto my-6 pr-1 space-y-5"
            >
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1.5 text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                  className="py-2.5 px-3 rounded-xl focus:outline-0 focus:outline-sky-500 transition-all duration-300 focus:ring-0 border border-sky-400 required"
                />
              </div>
              <select
                value={editPost.category || ""}
                onChange={(e) =>
                  setEditPost({
                    ...editPost,
                    category: e.target.value,
                  })
                }
                className="py-2 border border-sky-400 rounded-sm w-full"
              >
                <option value="" disabled>
                  Select a category
                </option>

                {[...categories]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((cat) => (
                    <option className="h-40 overflow-scroll" key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <div className="flex flex-col border p-4 border-sky-300 rounded-xl bg-sky-50/20">
                <label className="text-sm font-bold mb-2 text-gray-700">
                  Update Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditPost({
                        ...editPost,
                        image: file,
                      });
                    }
                  }}
                />
              </div>

              {/* Fixed Label duplication from original layout to Body/Content */}
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1.5 text-gray-700">
                  Content:
                </label>
                <textarea
                  value={editPost.content}
                  onChange={(e) =>
                    setEditPost({ ...editPost, content: e.target.value })
                  }
                  className="py-2.5 px-3 rounded-xl flex-1 min-h-[250px] focus:outline-0 focus:outline-sky-500 transition-all duration-300 focus:ring-0 border border-sky-400 required resize-none"
                />
              </div>
                 <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 bg-white">
              <button
                type="button"
                onClick={() => setEditPost(null)}
                className="text-sky-500 bg-sky-50 hover:bg-sky-200 font-semibold rounded-xl shadow-sm px-4 py-3 active:scale-95 duration-200 transition-all cursor-pointer text-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="text-green-500 bg-green-50 hover:bg-green-200 font-semibold rounded-xl shadow-sm px-4 py-3 active:scale-95 duration-200 transition-all cursor-pointer text-center"
              >
                Save Changes
              </button>
            </div>
            </form>


         
          </div>
        </div>
      )}
    </>
  );
}
