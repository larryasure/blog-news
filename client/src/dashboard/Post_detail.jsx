import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import CommentPreview from "./CommentPreview";

export default function Post_detail({postId}) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`post/${slug}/`);
        setPost(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to load Post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    <div className="text-center flex items-center justify-center my-15">
      <div className="Please Wait while your post Loads">
        <span
          className="w-2 h-2 rounded-full shadow bg-sky-600 "
          style={{ animationDuration: "0ms" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full shadow bg-sky-600 "
          style={{ animationDuration: "200ms" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full shadow bg-sky-600 "
          style={{ animationDuration: "400ms" }}
        ></span>
      </div>
    </div>;
  }

  if (!post) {
    return (
      <div className="text-center flex item-center justify-center my-15 max-w-xs mx-auto bg-gray-50 p-10 rounded-xl shadow  ">
        <p className="text-3xl font-semibold text-red-600 animate-pulse capitalize  hover:animate-none cursor-grab duration-200">
          Oops! The post you are Looking for is not available
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl bg-gray-50 shadow min-h-screen w-full mx-auto py-6 my-8 px-5  border-gray-100 rounded-xl   ">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => navigate("/dashboard/posts")}
            className="group flex items-center cursor-pointer gap-2 pt-4 text-sm text-sky-500 hover:text-sky-400 transition-colors mb-8"
          >
            <div>
              <span className="transform group-hover:-translate-x-1 transition-transform cursor-pointer">
                ←{" "}
              </span>{" "}
              Return to Posts
            </div>
          </button>

          <div>
            <span className=" font-medium bg-sky-100 text-sky-600   px-4 py-1 mt-1 rounded-xl shadow ">
              {post.category_name}
            </span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl leading-tight tracking-tight font-serif mb-12 ">
          {post.title} -{" "}
          <span className="text-2xl tracking-wider font-medium capitalize ">
            {post.author_name}
          </span>
        </h1>

        <div className="relative rounded-2xl overflow-hidden mb-10 border border-slate-800/80 group max-h-[500px] w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-sky-950/50 to-transparent" />
        </div>

        <div className="first-letter:text-5xl first-letter:font-black first-letter:text-sky-500 first-letter:mr-1 prose-invert max-w-none text-gray-600 text-lg leading-relaxed tracking-wide whitespace-pre-wrap font-sans">
          {post.content}
        </div>

        <div className="mt-6 ">
          <CommentPreview postId={postId}/>
        </div>

        <footer className="mt-12 pt-8  border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <p></p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-red-400 hover:underline hover:text-red-300 transition-colors underline-offset-1 cursor-pointer"
          >
            Back to top ↑
          </button>
        </footer>
      </div>
    </>
  );
}
