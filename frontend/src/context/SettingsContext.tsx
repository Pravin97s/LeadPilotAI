"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type SettingsContextType = {
  darkMode: boolean;
  compactView: boolean;
  animations: boolean;
  autoRefresh: boolean;

  setDarkMode: (value: boolean) => void;
  setCompactView: (value: boolean) => void;
  setAnimations: (value: boolean) => void;
  setAutoRefresh: (value: boolean) => void;

  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

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

    setDarkMode(settings.darkMode ?? true);
    setCompactView(settings.compactView ?? false);
    setAnimations(settings.animations ?? true);
    setAutoRefresh(settings.autoRefresh ?? false);
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

    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
  }, [
    darkMode,
    compactView,
    animations,
    autoRefresh,
  ]);

  function resetSettings() {
    setDarkMode(true);
    setCompactView(false);
    setAnimations(true);
    setAutoRefresh(false);
  }

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        compactView,
        animations,
        autoRefresh,

        setDarkMode,
        setCompactView,
        setAnimations,
        setAutoRefresh,

        resetSettings,
      }}
    >
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