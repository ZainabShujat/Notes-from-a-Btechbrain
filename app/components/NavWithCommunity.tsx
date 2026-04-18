"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { supabase } from "../lib/supabase";

export default function NavWithCommunity() {
  const [communityEnabled, setCommunityEnabled] = useState(false);

  useEffect(() => {
    async function fetchCommunityEnabled() {
      const { data } = await supabase.from("settings").select("community_enabled").single();
      setCommunityEnabled(!!data?.community_enabled);
    }
    fetchCommunityEnabled();
    // Listen for admin save event to update immediately
    const handler = () => fetchCommunityEnabled();
    window.addEventListener("community-setting-updated", handler);
    return () => window.removeEventListener("community-setting-updated", handler);
  }, []);

  return <Nav communityEnabled={communityEnabled} />;
}