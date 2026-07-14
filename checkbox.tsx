import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export function SystemTestHarness() {
  const [auditResults, setAuditResults] = useState(null);
  const [running, setRunning] = useState(false);

  const executeSystemAudit = async () => {
    setRunning(true);
    setAuditResults(null);
    const results = [];

    try {
      // A. SESSION CHECK: Fetch supabase.auth.getSession(). Verify JWT validity.
      const sessionRes = await supabase.auth.getSession();
      results.push({
        step: "A. SESSION CHECK",
        data: sessionRes.data,
        error: sessionRes.error ? { message: sessionRes.error.message } : null,
      });

      const session = sessionRes.data?.session;

      // B. RPC EXECUTION: Call supabase.rpc('nearby_properties', { lat: -1.2921, lng: 36.8219, radius_km: 15 })
      const rpcRes = await supabase.rpc("nearby_properties", {
        lat: -1.2921,
        lng: 36.8219,
        radius_km: 15,
      });
      results.push({
        step: "B. RPC EXECUTION",
        data: rpcRes.data,
        error: rpcRes.error ? { message: rpcRes.error.message, code: rpcRes.error.code } : null,
      });

      // C. RLS SELECT AUDIT: Run a standard select: supabase.from('properties').select('*').limit(5)
      const rlsRes = await supabase.from("properties").select("*").limit(5);
      results.push({
        step: "C. RLS SELECT AUDIT",
        data: rlsRes.data,
        error: rlsRes.error ? { message: rlsRes.error.message, code: rlsRes.error.code } : null,
      });

      // D. PROFILE FETCH: supabase.from('profiles').select('*').eq('id', session.user.id)
      if (session?.user?.id) {
        const profileRes = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id);
        results.push({
          step: "D. PROFILE FETCH",
          data: profileRes.data,
          error: profileRes.error ? { message: profileRes.error.message, code: profileRes.error.code } : null,
        });
      } else {
        results.push({
          step: "D. PROFILE FETCH",
          skipped: true,
          reason: "No active session user id found.",
        });
      }
    } catch (err) {
      results.push({
        step: "UNCAUGHT_EXCEPTION",
        error: err.message || JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    } finally {
      setAuditResults(results);
      setRunning(false);
    }
  };

  return (
    <div className="mt-4 border-t border-red-200 pt-4">
      <button
        onClick={executeSystemAudit}
        disabled={running}
        className="w-full rounded bg-red-700 px-3 py-2 text-xs font-bold text-white hover:bg-red-800 disabled:bg-red-400 transition-colors uppercase tracking-wider"
      >
        {running ? "Auditing..." : "Execute System Audit"}
      </button>
      {auditResults && (
        <pre className="mt-2 max-h-60 overflow-auto rounded border border-gray-250 bg-white p-2 text-[10px] text-gray-800 font-mono">
          {JSON.stringify(auditResults, null, 2)}
        </pre>
      )}
    </div>
  );
}
