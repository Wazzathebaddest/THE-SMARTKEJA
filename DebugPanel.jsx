import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/auth-context";
import { WelcomePage } from "./screens/WelcomePage";
import { LoginPage } from "./screens/LoginPage";
import { StudentDashboard } from "./screens/StudentDashboard";
import { LandlordDashboard } from "./screens/LandlordDashboard";
import { SearchPage } from "./screens/SearchPage";
import { MapPage } from "./screens/MapPage";
import { SavedPage } from "./screens/SavedPage";
import { MessagesPage } from "./screens/MessagesPage";
import { ProfilePage } from "./screens/ProfilePage";
import { NotFoundPage } from "./screens/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Navigation } from "./components/Navigation";

import { isSupabaseConfigured } from "./lib/supabase";

export default function App() {
  const { loading } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 dark:bg-red-950 p-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-xl text-center">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Configuration Required</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            SmartKeja requires Supabase credentials to run. Please configure <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-red-600 font-mono text-xs font-semibold">VITE_SUPABASE_URL</code> and <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-red-600 font-mono text-xs font-semibold">VITE_SUPABASE_ANON_KEY</code> in your environment variables.
          </p>
          <div className="text-[11px] text-gray-400 font-medium">
            Hosted on Vercel? Add these variables in your Project Settings under Environment Variables.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0600ba] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">Loading SmartKeja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col pb-16 md:pb-0 transition-colors">
      <Navigation />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute role="student">
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute role="student">
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute role="student">
                <SavedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute role="student">
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="student">
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Landlord Routes */}
          <Route
            path="/landlord"
            element={
              <ProtectedRoute role="landlord">
                <LandlordDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-All — renders NotFoundPage, does NOT redirect */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
