import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentPreview from "./CommentPreview";

export default function PostCard({ post, openDeleteModal, openEditModal }) {
  const { user } = useContext(AuthContext);

  const createDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className=" bg-white shadow-lg rounded-xl  h-auto cursor-pointer  hover:shadow-[0_4px_10px_rgba(0,2,0,0.5)] relative duration-300 transition-all ">
        <NavLink to={`/dashboard/post/${post.slug}`}>
          <div className="rounded-t-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-40 md:h-52 w-full object-cover hover:scale-110 transition-all duration-200"
            />
          </div>
        </NavLink>

        <div className="space-y-3 p-4  ">
          <span className="text-xs text-sky-600 absolute left-2 top-2  bg-black/70 font-medium px-4 py-1.5 rounded-xl ">
            {post.category_name}
          </span>

          <h3 className="font-semibold tracking-wide line-clamp-2 ">
            {post.title}
          </h3>
          <p className="text-sm tracking-wider line-clamp-3 text-gray-700">
            {post.content}
          </p>

          <div className="flex sm:flex-row items-center sm:justify-between mt-3 flex-col text-xs text-gray-500  ">
            <div className="flex items-center gap-2 ">
              <p className="font-semibold">{createDate}</p>
              <span className="text-black font-medium text-xs capitalize ">
                {" "}
                | {post.author_name} |{" "}
              </span>
            </div>
            <Link
              className="hover:underline hover:underline-offset-2 inline-block m-3 text-blue-600 font-semibold "
              to={`/dashboard/post/${post.slug}`}
            >
              Read More
            </Link>
          </div>

          {(user?.role === "admin" ||
            user.role === "author" ||
            user?.id === user?.author.id) && (
            <div>
              <div className="flex sm:flex-row flex-col sm:justify-between border-t border-gray-200 text-xs text-gray-600 pt-3">
                <button
                  onClick={() => openEditModal(post)}
                  className="cursor-pointer px-4 py-1 bg-sky-50 text-sky-500 rounded-lg shadow active:scale-110 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(post)}
                  className="cursor-pointer px-4 py-1 text-red-600 bg-red-50 rounded-lg shadow active:scale-110 transition-all duration-200 "
                >
                  Delete
                </button>
              </div>
              <CommentPreview postId={post.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
