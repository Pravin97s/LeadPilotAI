"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface SettingsContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  compactView: boolean;
  setCompactView: (value: boolean) => void;

  animations: boolean;
  setAnimations: (value: boolean) => void;

  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;

  resetSettings: () => void;
}

const SettingsContext =
  createContext<SettingsContextType | null>(null);

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard-settings");

    if (!saved) return;

    const settings = JSON.parse(saved);

    setDarkMode(settings.darkMode);
    setCompactView(settings.compactView);
    setAnimations(settings.animations);
    setAutoRefresh(settings.autoRefresh);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dashboard-settings",
      JSON.stringify({
        darkMode,
        compactView,
        animations,
        autoRefresh,
      })
    );
  }, [
    darkMode,
    compactView,
    animations,
    autoRefresh,
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-white");
      document.body.classList.add("bg-slate-950");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-slate-950");
      document.body.classList.add("bg-white");
    }
  }, [darkMode]);

  useEffect(() => {
    if (compactView) {
      document.body.classList.add("compact-view");
    } else {
      document.body.classList.remove("compact-view");
    }
  }, [compactView]);

  useEffect(() => {
    if (animations) {
      document.body.classList.remove("no-animation");
    } else {
      document.body.classList.add("no-animation");
    }
  }, [animations]);

  useEffect(() => {
    if (!autoRefresh) return;

    const id = setInterval(() => {
      window.location.reload();
    }, 60000);

    return () => clearInterval(id);
  }, [autoRefresh]);

  function resetSettings() {
    setDarkMode(true);
    setCompactView(false);
    setAnimations(true);
    setAutoRefresh(false);
  }

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,

      compactView,
      setCompactView,

      animations,
      setAnimations,

      autoRefresh,
      setAutoRefresh,

      resetSettings,
    }),
    [
      darkMode,
      compactView,
      animations,
      autoRefresh,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}