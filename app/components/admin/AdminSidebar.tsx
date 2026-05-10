import React from "react";

import { Dispatch, SetStateAction } from "react";

type Tab = "dashboard" | "analytics" | "community" | "settings" | "drafts";
type Props = {
  tab: Tab;
  setTab: Dispatch<SetStateAction<Tab>>;
  onLogout: () => void;
};

export default function AdminSidebar({ tab, setTab, onLogout }: Props) {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6 hidden md:block">
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Admin Menu</h2>
        <ul className="space-y-2">
          <li><button className={`text-left w-full ${tab === "analytics" ? "text-amber-700 font-semibold" : "text-slate-700 dark:text-slate-200"}`} onClick={() => setTab("analytics")}>Analytics</button></li>
          <li><button className={`text-left w-full ${tab === "community" ? "text-amber-700 font-semibold" : "text-slate-700 dark:text-slate-200"}`} onClick={() => setTab("community")}>Community</button></li>
          <li><button className={`text-left w-full ${tab === "settings" ? "text-amber-700 font-semibold" : "text-slate-700 dark:text-slate-200"}`} onClick={() => setTab("settings")}>Settings</button></li>
          <li><button className={`text-left w-full ${tab === "drafts" ? "text-amber-700 font-semibold" : "text-slate-700 dark:text-slate-200"}`} onClick={() => setTab("drafts")}>Drafts</button></li>
          <li><button className="text-left w-full text-slate-700 dark:text-slate-200 mt-6" onClick={() => setTab("dashboard")}>← Back to Dashboard</button></li>
        </ul>
      </div>
      <button
        onClick={onLogout}
        className="w-full px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
      >
        Logout
      </button>
    </aside>
  );
}
