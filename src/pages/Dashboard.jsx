import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import Card from "../components/Card";

export default function Dashboard() {
  const [articleCount, setArticleCount] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch("/api/magic-article");
        setArticleCount(data.count ?? data.articles.length);
      } catch (error) {
        console.error("Failed to load article count", error);
        setArticleCount(0);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Articles"
        value={articleCount === null ? "—" : articleCount}
      />

  
    </div>
  );
}
