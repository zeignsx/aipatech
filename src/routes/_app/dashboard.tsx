import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, DollarSign, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ count: 0, total: 0, paid: 0, pending: 0, customers: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const [{ data: invs }, { count: cust }] = await Promise.all([
        supabase.from("invoices").select("*").order("created_at", { ascending: false }),
        supabase.from("customers").select("*", { count: "exact", head: true }),
      ]);
      const list = invs ?? [];
      setStats({
        count: list.length,
        total: list.reduce((s, i) => s + Number(i.total), 0),
        paid: list.filter(i=>i.status==="paid").reduce((s,i)=>s+Number(i.total),0),
        pending: list.filter(i=>i.status==="sent"||i.status==="overdue").reduce((s,i)=>s+Number(i.total),0),
        customers: cust ?? 0,
      });
      setRecent(list.slice(0, 5));
    })();
  }, []);
  const fmt = (n:number)=>n.toLocaleString(undefined,{style:"currency",currency:"USD"});
  const cards = [
    { l:"Invoices", v: stats.count, icon: FileText, c:"bg-gradient-hero" },
    { l:"Total billed", v: fmt(stats.total), icon: DollarSign, c:"bg-gradient-emerald" },
    { l:"Paid", v: fmt(stats.paid), icon: DollarSign, c:"bg-gradient-gold" },
    { l:"Outstanding", v: fmt(stats.pending), icon: Clock, c:"bg-gradient-hero" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your invoicing activity.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c)=>(
          <div key={c.l} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</span>
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${c.c} text-primary-foreground`}><c.icon className="h-4 w-4" /></span>
            </div>
            <div className="mt-3 text-2xl font-bold">{c.v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent invoices</h2>
          <Link to="/invoices" className="text-sm font-semibold text-primary hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No invoices yet. <Link to="/invoices/new" className="font-semibold text-primary hover:underline">Create your first invoice</Link>.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-2">Number</th><th>Issued</th><th>Status</th><th className="text-right">Total</th></tr></thead>
              <tbody>
                {recent.map((i)=>(
                  <tr key={i.id} className="border-t border-border">
                    <td className="py-3"><Link to="/invoices/$id" params={{id:i.id}} className="font-semibold text-primary hover:underline">{i.invoice_number}</Link></td>
                    <td>{i.issue_date}</td>
                    <td><StatusBadge s={i.status} /></td>
                    <td className="text-right font-semibold">{Number(i.total).toLocaleString(undefined,{style:"currency",currency:i.currency||"USD"})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string,string> = {
    paid: "bg-emerald text-emerald-foreground",
    sent: "bg-gold text-gold-foreground",
    draft: "bg-muted text-muted-foreground",
    overdue: "bg-destructive text-destructive-foreground",
    cancelled: "bg-secondary text-secondary-foreground",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[s] ?? "bg-muted"}`}>{s}</span>;
}
