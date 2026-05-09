import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — AIPATECH Energy" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase puts the recovery token in the URL hash and exchanges it for a session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (password !== confirm) { setErr("Passwords do not match"); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You're signed in.");
      nav({ to: "/dashboard" });
    } catch (e: any) { setErr(e.message ?? "Could not update password"); }
    finally { setLoading(false); }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/70 p-8 shadow-card backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero text-primary-foreground"><Flame className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold">AEL Portal</span>
        </Link>
        <h1 className="mt-5 text-2xl font-bold">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">{ready ? "Enter and confirm your new password." : "Verifying your reset link…"}</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="New password"><input required type="password" minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} disabled={!ready} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" /></Field>
          <Field label="Confirm password"><input required type="password" minLength={6} value={confirm} onChange={(e)=>setConfirm(e.target.value)} disabled={!ready} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" /></Field>
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
          <button disabled={loading || !ready} className="w-full rounded-full bg-gradient-hero px-5 py-3 font-semibold text-primary-foreground shadow-soft disabled:opacity-60">{loading ? "Updating…" : "Update password"}</button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-input bg-background pl-3"><Lock className="h-4 w-4 text-muted-foreground" />{children}</div>
    </label>
  );
}