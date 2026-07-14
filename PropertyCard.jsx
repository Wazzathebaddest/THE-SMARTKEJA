import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { SystemTestHarness } from "./SystemTestHarness";

export function DebugPanel() {
  const [output, setOutput] = useState("");

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const handleTestRpc = async () => {
    setOutput("Calling nearby_properties RPC...");
    try {
      const { data, error } = await supabase.rpc("nearby_properties", {
        lat: -1.2921,
        lng: 36.8219,
        radius_km: 5,
      });

      if (error) throw error;
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setOutput(`Error calling RPC: ${err.message || JSON.stringify(err)}`);
    }
  };

  const handleGetSession = async () => {
    setOutput("Fetching session state...");
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setOutput(`Error fetching session: ${err.message || JSON.stringify(err)}`);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-lg rounded-xl border border-red-200 bg-red-50 p-4 shadow-xl md:bottom-4">
      <h3 className="mb-2 text-xs font-bold text-red-800 uppercase tracking-wider">
        SmartKeja Developer Debug Panel
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={handleTestRpc}
          className="rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
        >
          Test nearby_properties RPC
        </button>
        <button
          onClick={handleGetSession}
          className="rounded bg-gray-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-900 transition-colors"
        >
          Print Auth Session
        </button>
        <button
          onClick={() => setOutput("")}
          className="rounded bg-gray-300 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-400 transition-colors"
        >
          Clear
        </button>
      </div>
      {output && (
        <pre className="max-h-60 overflow-auto rounded border border-gray-200 bg-white p-2 text-[10px] text-gray-800 font-mono">
          {output}
        </pre>
      )}
      <SystemTestHarness />
    </div>
  );
}
