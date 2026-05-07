import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Cog,
  Wrench,
  Droplets,
  Factory,
  Recycle,
  ChevronRight,
  Flame,
  Anchor,
  Gauge,
} from "lucide-react";
import rig from "@/assets/ng-offshore-rig.jpg";
import refinery from "@/assets/ng-refinery.jpg";
import engineers from "@/assets/ng-engineers.jpg";
import lng from "@/assets/ng-lng.jpg";
import fpso from "@/assets/ng-fpso.jpg";
import pipes from "@/assets/ng-pipes.jpg";

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
    <div className="relative overflow-hidden">
      {/* Ambient color blobs that bleed through every glass surface */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-emerald/30 blur-[140px] dark:bg-emerald/20" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-gold/30 blur-[160px] dark:bg-gold/15" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[160px] dark:bg-primary/25" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={rig}
            alt="Offshore oil rig in the Niger Delta at sunset"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/85 dark:from-background/55 dark:via-background/65 dark:to-background/90" />
        </div>

        <div className="container-x relative grid min-h-[92vh] items-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-strong max-w-3xl rounded-3xl p-8 shadow-card sm:p-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
              <span className="h-2 w-2 rounded-full bg-gold" /> Indigenous Nigerian Oil & Gas Excellence
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Engineering the future of{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">Africa's energy</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              AIPATECH Energy Limited delivers integrated engineering, manufacturing, integrity and waste management services to the Nigerian and West African oil & gas sector.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 font-semibold text-gold-foreground shadow-glow transition-transform hover:scale-105"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-foreground transition-colors hover:bg-foreground/5"
              >
                Request a Quote
              </Link>
            </div>

            {/* Floating mini-stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.l} className="glass rounded-2xl p-3 text-center">
                  <div className="text-xl font-extrabold text-gradient sm:text-2xl">{s.v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE MOSAIC + INTRO */}
      <section className="container-x py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[520px]">
            <div className="col-span-4 row-span-4 overflow-hidden rounded-3xl shadow-card">
              <img src={refinery} alt="Nigerian refinery flare stacks at dusk" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-card">
              <img src={pipes} alt="Crude oil pipeline valves" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-card">
              <img src={fpso} alt="FPSO vessel offshore Nigeria" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-4 row-span-2 overflow-hidden rounded-3xl shadow-card">
              <img src={lng} alt="LNG storage and pipelines" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="glass-strong absolute -bottom-6 -left-6 hidden rounded-2xl p-4 shadow-glow sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-emerald text-emerald-foreground">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Niger Delta</div>
                  <div className="text-sm font-semibold">Onshore & Offshore Operations</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald">Who we are</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Powering Nigeria's energy industry with indigenous capability.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the swamps of the Niger Delta to deepwater fields offshore Bonny, AEL provides the engineering muscle, equipment and field crews that keep production flowing — safely, sustainably, and on schedule.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Anchor, t: "Offshore-ready", d: "FPSO, platform & subsea support across West Africa." },
                { icon: Gauge, t: "Asset Integrity", d: "NDT, corrosion control & inspection programs." },
                { icon: Factory, t: "Local Fabrication", d: "OCTG, pressure vessels and process skids." },
                { icon: Shield, t: "HSE First", d: "Zero-harm culture aligned with NUPRC standards." },
              ].map((c) => (
                <div key={c.t} className="glass rounded-2xl p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{c.t}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES — glass cards */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <img src={engineers} alt="Nigerian oil & gas engineers" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-md dark:bg-background/85" />
        </div>
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-6">
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
                className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
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
        </div>
      </section>

      {/* CLIENTS */}
      <section className="container-x py-20">
        <div className="glass-strong rounded-3xl p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by industry leaders
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {CLIENTS.map((c) => (
              <div key={c} className="glass grid h-16 place-items-center rounded-xl font-display font-bold tracking-tight text-foreground/70 transition-colors hover:text-primary">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="relative overflow-hidden rounded-3xl shadow-card">
          <img src={fpso} alt="FPSO offshore Nigeria" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-emerald/60" />
          <div className="relative grid gap-6 p-10 text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-center sm:p-16">
            <div>
              <h3 className="text-3xl font-bold sm:text-4xl">Ready to power your next project?</h3>
              <p className="mt-3 max-w-2xl text-white/85">
                Talk to our engineers about equipment supply, integrity programs, fabrication and offshore field services.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground shadow-glow hover:scale-105"
            >
              Contact our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
