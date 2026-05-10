"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { THEME_CONFIG } from "../components/theme-config";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import AdminCommunity from "../components/admin/AdminCommunity";
import AdminSettings from "../components/admin/AdminSettings";
import BackButton from "../components/BackButton";


// --- Helper functions ---
function categoryIcon(name: string) {
  const icons: { [key: string]: string } = {
    "Friday Insights": "🧠",
    "World Watch": "🌍",
    "Tech Pulse": "⚡",
    "July Crisis": "📅",
    "Tech Demystified": "💡",
  };
  return icons[name] || "📁";
}

function iconColor(i: number) {
  const colors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-orange-100 text-orange-700",
    "bg-green-100 text-green-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
  ];
  return colors[i % colors.length];
}

function categorySubtitle(name: string) {
  const subtitles: { [key: string]: string } = {
    "Friday Insights": "Personal episodes and reflections",
    "World Watch": "Weekly geopolitical summaries",
    "Tech Pulse": "Latest technology trends",
    "July Crisis": "4-week series on student struggles",
    "Tech Demystified": "Simplifying complex tech topics",
  };
  return subtitles[name] || "Category";
}

// --- Theme labels ---
const themeLabels: Record<string, string> = {
  winter: "Winter Theme",
  // ...existing code...
  birthday: "Birthday Theme",
  engineersDay: "Engineers Day",
  doctorsDay: "Doctors Day",
  mentalHealthDay: "Mental Health Day",
  teachersDay: "Teachers Day",
  womensDay: "Women's Day",
  mothersDay: "Mother's Day",
  fathersDay: "Father's Day",
  siblingsDay: "Siblings Day",
  earthDay: "Earth Day",
  friendshipDay: "Friendship Day",
  newYearsDay: "New Year's Day",
};

const ADMIN_EMAILS = [
  "zainabshujatali@gmail.com",
  "zainabshujat826@gmail.com",
];


type Tab = "dashboard" | "analytics" | "community" | "settings";


export default function AdminDashboard() {
  const tabMeta = [
    { key: "analytics", label: "Analytics", icon: "📊", desc: "View site stats and trends" },
    { key: "community", label: "Community", icon: "💬", desc: "Moderate comments & threads" },
    { key: "settings", label: "Settings", icon: "⚙️", desc: "Site-wide settings" },
    {key: "new-post", label: "New Article", icon: "✍️",desc: "Write and publish new articles",
},
  ];
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [themeState, setThemeState] = useState<Record<string, boolean>>({ ...THEME_CONFIG });
  const [pendingThemeState, setPendingThemeState] = useState<Record<string, boolean>>({ ...THEME_CONFIG });
  const [tab, setTab] = useState<Tab>("dashboard");
  const [articleStats, setArticleStats] = useState<any[]>([]);
  const [communityEnabled, setCommunityEnabled] = useState(false);
  const [pendingCommunityEnabled, setPendingCommunityEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getUserAndData = async () => {
      // Bypass auth on localhost for testing
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        setUser({ email: ADMIN_EMAILS[0] } as User);
      } else {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setError("Error fetching user");
          setLoading(false);
          return;
        }
        setUser(data.user);
      }
      // Fetch settings from Supabase
      const { data: settingsData } = await supabase
        .from("settings")
        .select("themes,community_enabled")
        .single();
      if (settingsData) {
        setThemeState(settingsData.themes || { ...THEME_CONFIG });
        setPendingThemeState(settingsData.themes || { ...THEME_CONFIG });
        setCommunityEnabled(!!settingsData.community_enabled);
        setPendingCommunityEnabled(!!settingsData.community_enabled);
      }
      // Categories fetch removed
      // Fetch article stats for analytics
      const { data: statsData } = await supabase
        .from("article_stats")
        .select("slug,views,likes");
      if (statsData) {
        setArticleStats(statsData);
      }
      setLoading(false);
    };
    getUserAndData();
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError("Login failed");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Only allow one theme to be enabled at a time
  // Only allow one theme to be enabled at a time (pending changes)
  const handleThemeToggle = (theme: string) => {
    const newState: Record<string, boolean> = {};
    Object.keys(pendingThemeState).forEach((key) => {
      newState[key] = key === theme ? !pendingThemeState[key] : false;
    });
    setPendingThemeState(newState);
  };

  const handleCommunityToggle = () => {
    setPendingCommunityEnabled((prev) => !prev);
  };

  // Save settings (apply theme and community changes)
  const handleSaveSettings = async () => {
    setSaving(true);
    setThemeState({ ...pendingThemeState });
    setCommunityEnabled(pendingCommunityEnabled);
    // Debug: log what will be sent
    console.log("Saving settings to Supabase:", {
      id: 1,
      themes: pendingThemeState,
      community_enabled: pendingCommunityEnabled,
    });
    const { error, data } = await supabase.from("settings").upsert({ id: 1, themes: pendingThemeState, community_enabled: pendingCommunityEnabled });
    if (error) {
      console.error("Supabase upsert error:", error);
    } else {
      console.log("Supabase upsert success:", data);
    }
    setSaving(false);
  };

  // Category handlers removed

  if (loading) {
    return <div className="py-8 px-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <main className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Admin Login</h1>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 w-full"
          >
            Login with Google
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </main>
    );
  }

  if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <main className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Access Denied</h1>
          <p className="text-gray-500 dark:text-slate-300 mb-4">You are not authorized to view this page.</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 w-full"
          >
            Logout
          </button>
        </div>
      </main>
    );
  }

  // Dashboard landing grid (no sidebar)
  if (tab === "dashboard") {
    return (
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center">
        <BackButton />
        <h1 className="text-4xl font-extrabold mb-10 mt-12 text-center text-slate-800 dark:text-white">Admin Dashboard</h1>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl">
            {tabMeta.map((t) => ( 
              <button
                key={t.key}
                onClick={() => {
  if (t.key === "new-post") {
    window.location.href = "/admin/new-post";
  } else {
    setTab(t.key as Tab);
  }
}}
                className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 hover:shadow-amber-200 transition border-2 border-transparent hover:border-amber-400 focus:outline-none"
              >
                <span className="text-4xl mb-2">{t.icon}</span>
                <span className="text-lg font-semibold mb-1 text-slate-800 dark:text-slate-100">{t.label}</span>
                <span className="text-slate-500 dark:text-slate-300 text-sm text-center">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // All other tabs: show sidebar and content
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <AdminSidebar tab={tab} setTab={(t) => setTab(t as Tab)} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto">
          {tab === "analytics" && ( 
          <AdminAnalytics articleStats={articleStats} />
        )}
        {/* Categories tab fully removed */}
        {tab === "community" && (
          <AdminCommunity
            pendingCommunityEnabled={pendingCommunityEnabled}
            handleCommunityToggle={handleCommunityToggle} 
            onSave={handleSaveSettings}
            saving={saving}
          />
        )}
        {tab === "settings" && (
          <AdminSettings
            themeState={themeState}
            pendingThemeState={pendingThemeState} 
            setPendingThemeState={setPendingThemeState}
            themeLabels={themeLabels}
            onSaveTheme={handleSaveSettings}
            saving={saving}
          />
        )}
      </main>
    </div>
  );
}
