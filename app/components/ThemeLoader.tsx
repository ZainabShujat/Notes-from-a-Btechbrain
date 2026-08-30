"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const themeComponents: Record<string, any> = {
  winter: dynamic(() => import("../components/WinterTheme"), { ssr: false }),
  // ...existing code...
  eid: dynamic(() => import("../components/EidTheme"), { ssr: false }),
  birthday: dynamic(() => import("../components/BirthdayTheme"), { ssr: false }),
  engineersDay: dynamic(() => import("../components/EngineersDayTheme"), { ssr: false }),
  doctorsDay: dynamic(() => import("../components/DoctorsDayTheme"), { ssr: false }),
  mentalHealthDay: dynamic(() => import("../components/MentalHealthDayTheme"), { ssr: false }),
  teachersDay: dynamic(() => import("../components/TeachersDayTheme"), { ssr: false }),
  womensDay: dynamic(() => import("../components/WomensDayTheme"), { ssr: false }),
  mothersDay: dynamic(() => import("../components/MothersDayTheme"), { ssr: false }),
  fathersDay: dynamic(() => import("../components/FathersDayTheme"), { ssr: false }),
  siblingsDay: dynamic(() => import("../components/SiblingsDayTheme"), { ssr: false }),
  earthDay: dynamic(() => import("../components/EarthDayTheme"), { ssr: false }),
  friendshipDay: dynamic(() => import("../components/FriendshipDayTheme"), { ssr: false }),
  newYearsDay: dynamic(() => import("../components/NewYearsDayTheme"), { ssr: false }),
};

export default function ThemeLoader() {
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function fetchTheme() {
      const { data } = await supabase.from("settings").select("themes").single();
      if (data && data.themes) {
        const enabled = Object.entries(data.themes).find(([_, v]) => v);
        setTheme(enabled ? enabled[0] : null);
        if (enabled) {
          // eslint-disable-next-line no-console
          console.log("ThemeLoader: rendering theme:", enabled[0]);
        } else {
          // eslint-disable-next-line no-console
          console.log("ThemeLoader: no theme enabled");
        }
      }
    }
    fetchTheme();
    interval = setInterval(fetchTheme, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Stamp the active theme on <html> so theme stylesheets can target
  // :root[data-theme="winter"] — higher specificity than the :root block
  // Tailwind emits, so a theme's token overrides always win the cascade.
  useEffect(() => {
    const root = document.documentElement;

    if (theme) {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }

    return () => root.removeAttribute("data-theme");
  }, [theme]);
  if (!theme) return null;
  const Comp = themeComponents[theme];
  if (!Comp) {
    // eslint-disable-next-line no-console
    console.log("ThemeLoader: theme component not found for:", theme);
    return null;
  }
  return <Comp />;
}
