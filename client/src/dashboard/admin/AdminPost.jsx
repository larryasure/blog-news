import { Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/api";
import useDebounce from "../../hook/useDebounce.js";

export default function AdminPost() {
  const [localPosts, setLocalPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(null);

  const { posts, loading } = useOutletContext();
  const [editingPost, setEditingPost] = useState(null);

  const handleEditPost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", editingPost.title);
      formData.append("content", editingPost.content);
      formData.append("category", editingPost.category);

      if (editingPost.imageFile) {
        formData.append("image", editingPost.imageFile);
      }

      const res = await api.put(`post/${editingPost.id}/`, formData);

      setLocalPosts((prev) =>
        prev.map((post) => (post.id === editingPost.id ? res.data : post)),
      );
      setEditingPost(null);

    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  useEffect(() => {
    if (posts) {
      setLocalPosts(posts);
    }
  }, [posts]);

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`post/${postId}`);
      setLocalPosts((prev) => prev.filter((post) => post.id !== postId));
      setIsModalOpen(null);
    } catch (error) {
      console.error("Failed to delete Post", error);
    }
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const search = debouncedSearchQuery?.toLowerCase() || "";

    const results = localPosts.filter((post) => {
      return (
        post.title?.toLowerCase().includes(search) ||
        post.content?.toLowerCase().includes(search) ||
        post.author_name?.toLowerCase().includes(search)
      );
    });

    setFilteredPosts(results);

  }, [debouncedSearchQuery, localPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] ">
        <div className="flex items-center gap-2 font-medium text-[#1a61b1] ">
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
      <div className="space-y-6">
        <div className="p-6 flex items-center justify-between md:flex-row md:item-center border-b border-gray-300 ">
          <div>
            <span className="bg-sky-100 px-3 py-1.5 rounded-lg uppercase font-semibold text-xs text-[#1a61b1]">
              Post Management{" "}
            </span>

            <p className="text-gray-500 mt-1">
              Review, manage and remove published stories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold text-gray-700">Search: </label>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 rounded-xl border border-gray-300 focus:outline-0 focus:ring-2 focus:ring-sky-200 py-2 px-4"
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl bg-white duration-300 transition-all overflow-hidden shadow-md hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full object-cover h-52 active:scale-110"
                  />
                  <span className="text-xs top-2 left-2  absolute rounded-2xl text-white px-4 py-1.5 bg-[#1a61b1]">
                    {post.category_name}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <h3 className="text-lg font-semibold line-clamp-2 text-gray-800">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3  ">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-300 pt-3 text-gray-500 text-xs  ">
                    <span className="capitalize tracking-wide">
                      {post.author_name}
                    </span>
                    <span className="">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 ">
                    <div className="flex items-center gap-1.5 ">
                      <span className="font-medium animate-pulse duration-300 w-2 h-2 rounded-full bg-green-600 transition-all"></span>
                      <span className="animate-none">Published</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                      <button
                        onClick={() => setIsModalOpen(post.id)}
                        className="bg-red-50 px-4 py-1.5 rounded-lg hover:bg-red-100 text-red-500 font-medium shadow text-xs  cursor-pointer active:scale-105 duration-200 transition-all "
                      >
                        Delete{" "}
                      </button>

                      <button
                        onClick={() => setEditingPost(post)}
                        className="text-sky-500 bg-sky-50 hover:bg-sky-100 rounded-lg shadow px-4 py-1.5  active:scale-105 duration-200 transition-all cursor-pointer "
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 mt-20 bg-white text-center shadow-md rounded-2xl ">
            <h3 className="text-xl font-bold ">No post found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed backdrop-blur-sm p-6 flex items-center justify-center bg-black/40 z-50 inset-0  ">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-lg max-h-86 ">
            <div className=" flex flex-col gap-3 ">
              <div className="flex items-center justify-between ">
                <h3 className="text-xl font-bold flex items-center gap-2  ">
                  <span className="bg-red-100 w-10 h-10 rounded-full  flex items-center justify-center">
                    <Trash className="text-red-500 " />
                  </span>
                  Delete Post
                </h3>

                <X
                  onClick={() => setIsModalOpen(null)}
                  className="bg-red-50 text-red-600 text-2xl cursor-pointer w-7 h-7 rounded-lg  "
                />
              </div>

              <p className="text-gray-500 mt-3 ">
                This action cannot be undone. The Post will be removed
                permanently
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12 ">
              <button
                onClick={() => setIsModalOpen(null)}
                className="px-4 py-1.5 rounded-xl active:scale-110 duration-200 transition-all bg-sky-100 hover:bg-sky-200 text-sky-500 cursor-pointer "
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePost(isModalOpen)}
                className="px-4 py-1.5 rounded-xl active:scale-110 duration-200 transition-all bg-red-100 hover:bg-red-200 text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingPost && (
        <div className="fixed bg-black/40 backdrop-blur-sm p-6  flex items-center justify-center inset-0 z-50">
          <div className="max-w-md rounded-xl p-8 shadow-md w-full bg-white">
            <div className="flex items-center justify-between ">
              <h3 className="text-xl font-bold mb-5  ">Edit Post</h3>

              <X
                onClick={() => setEditingPost(null)}
                className="bg-red-50 text-red-600 text-2xl cursor-pointer w-7 h-7 rounded-lg "
              />
            </div>

            <form onSubmit={handleEditPost} className="space-y-4">
              <div className="w-full flex flex-col gap-2 items-start  ">
                <label className="text-sm font-bold ">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  className="w-full rounded-lg shadow border border-gray-200 focus:outline-sky-500 py-3 px-4  "
                />
              </div>

              <div className="w-full flex flex-col gap-2 items-start   ">
                <label className="text-sm font-bold ">Content</label>
                <textarea
                  type="text"
                  placeholder="Title"
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  className="w-full rounded-lg h-44 shadow border border-gray-200 focus:outline-sky-500 py-3 px-4  required: "
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-9">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer active:scale-110 duration-200 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium cursor-pointer active:scale-110 duration-200 transition-all"
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
