import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Create_post() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error, "Failed to load categories");
      }
    };

    getCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);
    setError("");

    if (!title.trim() || !content.trim() || !image || !category) {
      setLoading(false);
      setError("All fields are required!");

      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);

      const res = await api.post("post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setSuccess("Post create successfully");

        setTitle("");
        setContent("");
        setCategory("");
        setImage(null);

        setTimeout(() => {
          navigate("/dashboard/posts");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-300 text-gray-900 flex items-center justify-center py-15 ">
        <div className="relative overflow-hidden md:p-12 p-8 max-w-3xl shadow-2xl rounded-2xl backdrop-blur-md border border-gray-200  w-full bg-sky-500  ">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-300 rounded-full  blur-3xl pointer-events-none " />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/50 rounded-full  blur-3xl  pointer-events-none" />
          <div className="md:text-left text-center  mb-10 ">
            <span className="text-xs font-semibold tracking-widest px-3 uppercase py-1.5 rounded-full bg-sky-100 ">
              Editor's Studio
            </span>
            <h1 className="text-3xl md:text-4xl tracking-tight mt-3 text-gray-900 font-thin ">
              Create Your <span className="italic text-gray-600"></span>Post
            </h1>
            <p className="text-sm mt-2 text-black ">
              Create your post here, the World hear you!
            </p>
          </div>

          <form onSubmit={createPost} className="space-y-6 ">
            <div className="relative group">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                placeholder=" "
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 text-lg peer"
              />
              <label
                htmlFor="title"
                className="absolute left-5 top-4 text-slate-500  pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-400 bg-slate-900 px-2 rounded-md  text-xs"
              >
                Post Title
              </label>
            </div>

            <div className="relative group ">
              <select
                name="category"
                id="category"
                value={category}
                className="w-full bg-slate-950/50   border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gray-700 transition-all duration-300 appearance-none cursor-pointer hover:text-sky-500 "
                onChange={(e) => {
                  setCategory(e.target.value);
                  setError("");
                }}
              >
                <option disabled value="" className="bg-gray-500 text-black  ">
                  Select a category...
                </option>
                {categories.map((cat) => (
                  <option
                    value={cat.id}
                    key={cat.id}
                    className="bg-gray-50  text-black cursor-pointer  "
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-3.5  pointer-events-none group-focus-within:text-slate-700 transition-all font-semibold text-3xl ">
                ↓
              </div>
            </div>
            <div className="relative border-2 border-dashed hover:border-gray-500 group p-6 transition-all duration-300 rounded-2xl border-gray-700 hover:rounded-xl  ">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute  inset-0  opacity-0  z-10 cursor-pointer"
              />

              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden max-h-64 group-hover:opacity-90 transition-opacity ">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-xl object-cover"
                  />
                  <div className="inset-0 absolute bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium text-white px-4 py-2 bg-black/40 rounded-full ">
                      Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm font-medium text-gray-500 hover:text-gray-700">
                    Upload Your Image
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <textarea
                id="content"
                rows="8"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError("");
                }}
                placeholder=" "
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 resize-none leading-relaxed peer"
              />
              <label
                htmlFor="content"
                className="absolute left-5 top-4 text-slate-500  pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-400 bg-slate-900 px-2 rounded-md -top-3 text-xs"
              >
                Your Content...
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => navigate("/dashboard/posts")}
                className="w-full sm:w-auto cursor-pointer text-gray-700 hover:text-white text-sm font-medium tracking-wide transition-colors py-2"
              >
                Discard Draft
              </button>

              {error && (
                <div className="bg-red-50 animate-fade-in tracking-wide flex items-center mt-2 text-red-500  border border-rose-50 mb-2  px-3 py-1.5 text-sm rounded-xl  font-medium">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500 p-1.5 mb-2 tracking-wide flex items-center animate-fade-in rounded-xl border-emerald-50 border text-sm gap-2 ">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-sky-600 via-sky-300 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 tracking-wide text-sm uppercase cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-1.5 justify-center  ">
                    Publishing post
                    <span
                      className="w-2 h-2 rounded-full animate-bounce bg-sky-500 "
                      style={{ animationDuration: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full animate-bounce bg-sky-500 "
                      style={{ animationDuration: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full animate-bounce bg-sky-500 "
                      style={{ animationDuration: "300ms" }}
                    ></span>
                  </div>
                ) : (
                  <span>Publish Post</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
