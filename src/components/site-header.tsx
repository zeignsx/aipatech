import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/clients", label: "Clients" },
  { to: "/hses", label: "HSES" },
  { to: "/rentals", label: "Rentals" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-soft">
            <Flame className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight sm:text-lg">
            AIPATECH <span className="text-emerald">Energy</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <ThemeToggle />
          <Link
            to="/portal"
            className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Portal
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-gradient-hero px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 xl:hidden">
          <Link
            to="/contact"
            className="hidden items-center rounded-full bg-gradient-hero px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft sm:inline-flex"
          >
            Get a Quote
          </Link>
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="rounded-md border border-border p-2 hover:bg-muted"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background xl:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
              <Link
                to="/portal"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Portal
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
