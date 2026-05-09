import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Lock, Mail, ShieldCheck, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — AIPATECH Energy" }] }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("admin@ael.com");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav({ to: "/dashboard" }); });
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        nav({ to: "/dashboard" });
      } else if (mode === "signup") {
        if (password !== confirm) throw new Error("Passwords do not match");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created — check your email to confirm.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent");
        setMode("signin");
      }
    } catch (e: any) { setErr(e.message ?? "Authentication failed"); }
    finally { setLoading(false); }
  };

  const titles: Record<Mode, { h: string; sub: string; cta: string }> = {
    signin: { h: "Sign in to AEL", sub: "Welcome back. Manage bookings, invoices, customers.", cta: "Sign in" },
    signup: { h: "Create your AEL account", sub: "Self-service signup. Admin features unlocked once granted.", cta: "Create account" },
    forgot: { h: "Reset your password", sub: "We'll email you a secure link to set a new password.", cta: "Send reset link" },
  };
  const t = titles[mode];

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-emerald/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl border border-border/60 bg-card/70 p-8 shadow-card backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-soft"><Flame className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold">AEL Portal</span>
        </Link>

        <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
          <ShieldCheck className="h-3.5 w-3.5" /> Secured by encryption
        </div>
        <h1 className="mt-3 text-2xl font-bold">{t.h}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.sub}</p>

        {/* tabs */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-border bg-secondary/40 p-1 text-xs font-semibold">
          <button type="button" onClick={() => setMode("signin")} className={`rounded-full py-2 transition ${mode!=="signup" ? "bg-gradient-hero text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Sign in</button>
          <button type="button" onClick={() => setMode("signup")} className={`rounded-full py-2 transition ${mode==="signup" ? "bg-gradient-hero text-primary-foreground shadow-soft" : "text-muted-foreground"}`}>Sign up</button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <Field icon={User} label="Full name">
              <input required value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
            </Field>
          )}
          <Field icon={Mail} label="Email">
            <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
          </Field>
          {mode !== "forgot" && (
            <Field icon={Lock} label="Password">
              <input required type="password" minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
            </Field>
          )}
          {mode === "signup" && (
            <Field icon={Lock} label="Confirm password">
              <input required type="password" minLength={6} value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
            </Field>
          )}

          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}

          <button disabled={loading} className="w-full rounded-full bg-gradient-hero px-5 py-3 font-semibold text-primary-foreground shadow-soft hover:scale-[1.01] disabled:opacity-60">
            {loading ? "Please wait…" : t.cta}
          </button>

          <div className="flex items-center justify-between text-xs">
            {mode === "signin" ? (
              <button type="button" onClick={()=>setMode("forgot")} className="text-muted-foreground hover:text-primary">Forgot password?</button>
            ) : (
              <button type="button" onClick={()=>setMode("signin")} className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"><ArrowLeft className="h-3 w-3" /> Back to sign in</button>
            )}
            <Link to="/" className="text-muted-foreground hover:text-foreground">← Website</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-input bg-background pl-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
