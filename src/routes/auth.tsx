import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Lock, Mail, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign in — AIPATECH Energy" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@ael.com");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav({ to: "/dashboard" }); });
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      nav({ to: "/dashboard" });
    } catch (e: any) { setErr(e.message ?? "Authentication failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-emerald/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-border/60 bg-card/70 p-8 shadow-card backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-soft"><Flame className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold">AEL Admin Portal</span>
        </Link>
        <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
          <ShieldCheck className="h-3.5 w-3.5" /> Restricted access
        </div>
        <h1 className="mt-3 text-2xl font-bold">Sign in to manage AEL</h1>
        <p className="mt-1 text-sm text-muted-foreground">Authorised personnel only. Bookings, invoices, customers.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
            <div className="mt-1 flex items-center rounded-xl border border-input bg-background pl-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</span>
            <div className="mt-1 flex items-center rounded-xl border border-input bg-background pl-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input required type="password" minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
            </div>
          </label>
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full rounded-full bg-gradient-hero px-5 py-3 font-semibold text-primary-foreground shadow-soft hover:scale-[1.01] disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in to dashboard"}
          </button>
        </form>

        <Link to="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-foreground">← Back to website</Link>
      </div>
    </div>
  );
}
