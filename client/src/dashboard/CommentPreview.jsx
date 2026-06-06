import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { Authcontext } from "../context/Authcontext";

export default function CommentPreview({ postId }) {
  const { user } = useContext(Authcontext);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`comments/?post=${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("comments/", {
        post: postId,
        content: text,
      });

      setComments((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    try {
      await api.delete(`comments/${id}/`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="mt-3p border-t border-gray-300  pt-3 space-y-3">

      {/* INPUT */}
      {user && (
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border p-2 rounded-lg text-sm"
          />

          <button
            onClick={addComment}
            disabled={loading}
            className="px-3 bg-sky-500 text-white rounded-lg text-sm"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      )}

      {/* COMMENTS */}
      <div className="space-y-2">
        {comments.slice(0,2).map((c) => (
          <div
            key={c.id}
            className="flex justify-between text-xs bg-gray-50 p-2 rounded-lg"
          >
            <p>
              <span className="font-semibold capitalize">{c.user_name}</span>: {c.content}
            </p>

            {(user?.role === "admin" || user?.id === c.user) && (
              <button
                onClick={() => deleteComment(c.id)}
                className="text-red-500 cursor-pointer"
              >
                delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}