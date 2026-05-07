import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Flame } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/clients", label: "Clients" },
  { to: "/hses", label: "HSES" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-soft">
            <Flame className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">
            AIPATECH <span className="text-emerald">Energy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="container-x flex flex-col py-3">
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
          </div>
        </div>
      )}
    </header>
  );
}
