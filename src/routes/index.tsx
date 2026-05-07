import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Cog, Wrench, Droplets, Factory, Recycle, ChevronRight } from "lucide-react";
import hero from "@/assets/hero-rig.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIPATECH Energy Limited — Premier Oil & Gas Engineering" },
      { name: "description", content: "Engineering services, equipment manufacturing, integrity & waste management for the Nigerian oil & gas sector." },
    ],
  }),
  component: Home,
});

const STATS = [
  { v: "50+", l: "Projects Delivered" },
  { v: "20+", l: "Industry Clients" },
  { v: "2019", l: "Established" },
  { v: "100%", l: "HSE Commitment" },
];

const FEATURED = [
  { icon: Cog, title: "Equipment Design", desc: "Custom oil & gas equipment engineered for harsh field conditions." },
  { icon: Factory, title: "Manufacturing", desc: "In-house fabrication of OCTG, pressure vessels and skids." },
  { icon: Shield, title: "Integrity Management", desc: "Asset inspection, NDT and corrosion control programs." },
  { icon: Wrench, title: "Maintenance", desc: "Onshore & offshore maintenance with 24/7 field support." },
  { icon: Droplets, title: "Waste Management", desc: "Compliant treatment and disposal of drilling residues." },
  { icon: Recycle, title: "Rehabilitation", desc: "Refurbishment of pipelines, vessels and rotating equipment." },
];

const CLIENTS = ["Shell", "ExxonMobil", "Chevron", "NNPC", "Total", "NLNG", "Halliburton", "Dangote"];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Offshore platform" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-emerald/70" />
        </div>
        <div className="container-x relative grid min-h-[88vh] items-center py-20 text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold" /> Indigenous Nigerian Oil & Gas Excellence
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Engineering the future of <span className="bg-gradient-gold bg-clip-text text-transparent">Africa's energy</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              AIPATECH Energy Limited delivers integrated engineering, manufacturing, integrity and waste management services to the Nigerian and West African oil & gas sector.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground shadow-glow transition-transform hover:scale-105">
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-background">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-3xl font-extrabold text-gradient md:text-4xl">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION/VISION */}
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { tag: "Our Mission", title: "Create lasting value through excellence and innovation.", body: "We deliver safe, sustainable solutions for our partners while championing environmental responsibility and the growth of the Nigerian energy industry." , g: "bg-gradient-hero"},
            { tag: "Our Vision", title: "The premier indigenous oil & gas service provider.", body: "Driven by excellence and innovation, we aim to set the benchmark for indigenous engineering capability across West Africa." , g: "bg-gradient-emerald"},
          ].map((m) => (
            <div key={m.tag} className={`relative overflow-hidden rounded-3xl p-10 text-primary-foreground ${m.g} shadow-card`}>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/80">{m.tag}</div>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{m.title}</h3>
              <p className="mt-4 text-white/85">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="container-x py-10 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald">What we do</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Integrated energy services</h2>
          </div>
          <Link to="/services" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-emerald/40 hover:shadow-card"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-emerald text-emerald-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLIENTS STRIP */}
      <section className="bg-secondary/40 py-14">
        <div className="container-x">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trusted by industry leaders</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {CLIENTS.map((c) => (
              <div key={c} className="grid h-16 place-items-center rounded-xl border border-border bg-card font-display font-bold tracking-tight text-muted-foreground transition-colors hover:text-primary">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground shadow-card sm:p-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald/30 blur-3xl" />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h3 className="text-3xl font-bold sm:text-4xl">Ready to power your next project?</h3>
              <p className="mt-3 max-w-2xl text-white/85">Talk to our engineers about equipment supply, integrity programs, fabrication and offshore field services.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground shadow-glow hover:scale-105">
              Contact our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
