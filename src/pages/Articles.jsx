import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [scrapeUrl, setScrapeUrl] = useState("");
  const [creating, setCreating] = useState(false);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/magic-article");
      setArticles(data.articles || []);
    } catch (err) {
      toast.error(err.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!scrapeUrl) return;

    const toastId = toast.loading("Scraping article...");

    try {
      setCreating(true);
      await apiFetch("/api/magic-article/scrape", {
        method: "POST",
        body: JSON.stringify({ url: scrapeUrl }),
      });

      setScrapeUrl("");
      toast.success("Article added", { id: toastId });
      loadArticles();
    } catch (err) {
      toast.error(err.message || "Failed to create article", {
        id: toastId,
      });
    } finally {
      setCreating(false);
    }
  };

  // DELETE with toast confirmation
  const handleDelete = (id) => {
    toast((t) => (
      <span className="flex items-center gap-3">
        <span>Delete this article?</span>
        <button
          className="text-red-400 font-medium"
          onClick={async () => {
            toast.dismiss(t.id);
            const deleting = toast.loading("Deleting article...");

            try {
              await apiFetch(`/api/magic-article/${id}`, {
                method: "DELETE",
              });
              setArticles((prev) => prev.filter((a) => a.id !== id));
              toast.success("Article deleted", { id: deleting });
            } catch {
              toast.error("Failed to delete article", { id: deleting });
            }
          }}
        >
          Delete
        </button>
        <button
          className="text-gray-400"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </span>
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Articles</h1>

      {/* Create */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex gap-3"
      >
        <input
          type="url"
          placeholder="Paste article URL"
          value={scrapeUrl}
          onChange={(e) => setScrapeUrl(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <button
          disabled={creating}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
        >
          {creating ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-sm text-gray-500">No articles found.</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{a.Name}</td>
                  <td className="px-4 py-3">
                    {new Date(a.DateTime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={a.SourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Articles;
