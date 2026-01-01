import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import Card from "../components/Card";

export default function Dashboard() {
  const [stats, setStats] = useState({
    articles: null,
    forms: null,
    submissions: null,
    pendingForms: null,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch("/api/dashboard/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        setStats({
          articles: 0,
          forms: 0,
          submissions: 0,
          pendingForms: 0,
        });
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card title="Articles" value={stats.articles ?? "—"} />
      <Card title="Forms Created" value={stats.forms ?? "—"} />
      <Card title="Submissions" value={stats.submissions ?? "—"} />
      <Card title="Pending Forms" value={stats.pendingForms ?? "—"} />
    </div>
  );
}
