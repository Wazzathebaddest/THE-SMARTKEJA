import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { useTheme } from "../lib/theme-context";
import { Home, Search, Heart, MessageSquare, User, LogOut, Moon, Sun, Map } from "lucide-react";

export function Navigation() {
  const { session, role, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Only render navigation if there is an active session
  if (!session) return null;

  // Determine the correct home route based on user role
  const homeRoute = role === "landlord" ? "/landlord" : "/student-dashboard";

  const navItems = [
    { label: "Home", to: homeRoute, icon: Home },
    { label: "Search", to: "/search", icon: Search },
    { label: "Saved", to: "/saved", icon: Heart },
    { label: "Messages", to: "/messages", icon: MessageSquare },
    { label: "Profile", to: "/profile", icon: User },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 shadow-lg md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-[#0600ba] dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Desktop Sticky Top Navigation */}
      <header className="sticky top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 shadow-sm md:flex transition-colors">
        <div className="flex items-center gap-8">
          <NavLink to={homeRoute} className="flex items-center text-xl font-bold tracking-tight">
            <span className="text-[#4f6df5]">SMART</span>
            <span className="text-[#34b56f]">KEJA</span>
          </NavLink>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#0600ba] dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>
    </>
  );
}
