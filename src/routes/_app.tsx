import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flame, LayoutDashboard, FileText, Users, LogOut, Plus, Inbox } from "lucide-react";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string>("");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) nav({ to: "/auth" });
      else { setEmail(session.user.email ?? ""); setReady(true); }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav({ to: "/auth" });
      else { setEmail(data.session.user.email ?? ""); setReady(true); }
    });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  if (!ready) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;

  const NAV = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/bookings", label: "Bookings", icon: Inbox },
    { to: "/invoices", label: "Invoices", icon: FileText },
    { to: "/customers", label: "Customers", icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container-x grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-4 shadow-soft lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)]">
          <Link to="/" className="flex items-center gap-2 px-2 py-1 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-hero text-primary-foreground"><Flame className="h-4 w-4" /></span>
            AEL Portal
          </Link>
          <nav className="mt-6 space-y-1">
            {NAV.map((n) => {
              const active = path.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${active ? "bg-gradient-hero text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <Link to="/invoices/new" className="mt-6 flex items-center justify-center gap-1 rounded-full bg-gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-soft hover:scale-[1.02]">
            <Plus className="h-4 w-4" /> New invoice
          </Link>
          <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
            <div className="truncate">{email}</div>
            <button onClick={async()=>{ await supabase.auth.signOut(); nav({to:"/auth"}); }} className="mt-2 flex items-center gap-1 text-muted-foreground hover:text-destructive">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </aside>
        <main><Outlet /></main>
      </div>
    </div>
  );
}
