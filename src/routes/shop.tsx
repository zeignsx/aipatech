import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Industrial Equipment | AIPATECH Energy" },
      { name: "description", content: "Browse compressors, generators, pumps, OCTG and gas filtration units for sale and rental." },
    ],
  }),
  component: Shop,
});

const PRODUCTS = [
  { n: "Industrial Air Compressor", c: "Compressors", p: 18500 },
  { n: "Diesel Generator 500kVA", c: "Generators", p: 42000 },
  { n: "Refrigerated Air Dryer", c: "Air Dryers", p: 7800 },
  { n: 'API 5L Line Pipe – 12"', c: "Pipes", p: 240 },
  { n: "Premium Casing – 9 5/8\"", c: "Casing", p: 180 },
  { n: "Production Tubing – 4 1/2\"", c: "Tubing", p: 95 },
  { n: "Centrifugal Process Pump", c: "Pumps", p: 12600 },
  { n: "Gas Filtration Unit", c: "Filtration", p: 22300 },
];

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.c)))];
  const filtered = PRODUCTS.filter((p) => (cat === "All" || p.c === cat) && p.n.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHero eyebrow="Equipment Shop" title="Industrial equipment for sale & rental." sub="Compressors, generators, OCTG, pumps and gas processing — sourced and serviced by AEL." />
      <section className="container-x py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search equipment..."
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${cat === c ? "bg-gradient-hero text-primary-foreground shadow-soft" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.n} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-40 bg-gradient-emerald">
                <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white, transparent 60%)" }} />
                <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">{p.c}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold leading-tight">{p.n}</h3>
                <div className="mt-1 text-xs text-muted-foreground">SKU AEL-{Math.abs(p.n.length * 137) % 9999}</div>
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${p.p.toLocaleString()}</span>
                    <button className="inline-flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-semibold text-gold-foreground shadow-soft transition-transform hover:scale-105">
                      <ShoppingCart className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
          Need checkout, orders, invoices and an admin dashboard? Enable <Link to="/contact" className="font-semibold text-primary hover:underline">Lovable Cloud</Link> to power the full e-commerce backend.
        </div>
      </section>
    </>
  );
}
