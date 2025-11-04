import React, { useState } from "react";
import api from "../services/api";
import TreeView from "../components/TreeView";
import Loader from "../components/Loader";

export default function Home() {
  const [url, setUrl] = useState("");
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setTree(null);
    if (!url) return setError("Please enter a GitHub URL.");
    setLoading(true);
    try {
      const res = await api.post("/tree", { url });
      setTree(res.data.tree);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          🌐 GitHub File Tree
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-4"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </form>

        {error && <div className="text-red-400 text-center mb-3">{error}</div>}

        {loading && <Loader />}

        {tree && (
          <div className="bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
            <TreeView node={tree} />
          </div>
        )}
      </div>
    </div>
  );
}
