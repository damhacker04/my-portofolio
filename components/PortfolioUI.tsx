"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  FaArrowUpRightFromSquare,
  FaBars,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaRegCopy,
  FaSun,
  FaXmark,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa6";

import { projects, socialMedia, workExperience } from "@/data";

/* ─── constants ─── */
const CV_PATH = "/Kaesar_Adam_Rafano_CV_Updated.pdf";
const CONTACT_EMAIL = "adamemier16@gmail.com";
const LOCATION = "Jakarta, Indonesia";

const HERO_STATS = [
  { value: 7, suffix: "", label: "Projects shipped" },
  { value: 3, suffix: "", label: "AI APIs in production" },
  { value: 5, suffix: "+", label: "Work experiences" },
];

const HERO_STATUS = [
  {
    category: "BUILDING",
    title: "UKM Web Platform",
    desc: "100+ members · Supabase + PostgreSQL",
  },
  {
    category: "BOOTCAMP",
    title: "Maxy Academy",
    desc: "Back-End Engineering Trainee",
  },
  {
    category: "LAST SHIPPED",
    title: "Tripaw",
    desc: "Laravel 13 + Claude Sonnet AI planner",
  },
  {
    category: "STUDYING",
    title: "System Design",
    desc: "Production-grade architecture patterns",
  },
];

const TICKER_SKILLS = [
  "PHP", "Laravel", "Livewire", "JavaScript", "TypeScript", "React",
  "Next.js", "Node.js", "REST APIs", "Flutter", "Kotlin", "Dart",
  "Supabase", "PostgreSQL", "Firebase", "Docker", "GitHub Actions",
  "Prometheus", "Grafana", "Claude Sonnet", "Gemini", "Groq API",
  "Midtrans", "Three.js", "HTML", "CSS", "Tailwind CSS", "Git",
];

const TOOLKIT = [
  { label: "Backend", skills: ["PHP", "Laravel", "Livewire", "Node.js", "REST APIs"] },
  { label: "Frontend", skills: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Mobile", skills: ["Flutter", "Dart", "Kotlin", "Jetpack Compose"] },
  { label: "Database & Cloud", skills: ["PostgreSQL", "Supabase", "Firebase", "Firestore"] },
  { label: "DevOps & Monitoring", skills: ["Docker", "GitHub Actions", "Prometheus", "Grafana", "Nginx"] },
  { label: "AI & Integrations", skills: ["Claude Sonnet", "Gemini 2.5 Flash", "Groq API", "Midtrans", "Three.js"] },
];

const TIMELINE = [
  {
    year: "2024",
    event: "Joined GDG on Campus Brawijaya, authored first PRD, started shipping web apps",
    current: false,
  },
  {
    year: "2025",
    event: "First paid client (Saritama), competed at SEVENT 9.0, shipped Trajectoria & RumahAman",
    current: false,
  },
  {
    year: "2026",
    event: "Maxy Academy back-end bootcamp, deployed multi-AI cascade systems, leading 3-person dev team",
    current: true,
  },
];

const navLinks = [
  { num: "00", label: "Intro", href: "#home" },
  { num: "01", label: "Background", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Projects", href: "#work" },
  { num: "04", label: "Contact", href: "#contact" },
];

const iconLabelMap: Record<string, string> = {
  "/next.svg": "Next.js", "/javascript.svg": "JavaScript", "/kotlin.svg": "Kotlin",
  "/flutter.svg": "Flutter", "/dart.svg": "Dart", "/html.svg": "HTML",
  "/css.svg": "CSS", "/three.svg": "Three.js", "/laravel.svg": "Laravel",
  "/php.svg": "PHP", "/tail.svg": "Tailwind CSS", "/re.svg": "React",
  "/ts.svg": "TypeScript", "/git.svg": "Git", "/dockerName.svg": "Docker",
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/* ─── helpers ─── */
const toReadableLabel = (value: string) => {
  const cleaned = value.split("/").pop()?.replace(/\.(svg|png|jpg|jpeg)$/i, "") ?? value;
  return cleaned.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const isUrl = (value: string) => /^https?:\/\//i.test(value.trim());

const formatDateRange = (item: {
  startMonth?: string; startYear?: number;
  endMonth?: string; endYear?: number;
}) => {
  const start = [item.startMonth, item.startYear].filter(Boolean).join(" ");
  const isPresent = item.endMonth === "Now" || item.endMonth === "Present";
  const end = isPresent ? "Present" : [item.endMonth, item.endYear].filter(Boolean).join(" ");
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

const renderSocialIcon = (id: number) => {
  if (id === 1) return <FaGithub className="h-4 w-4" />;
  if (id === 2) return <FaInstagram className="h-4 w-4" />;
  return <FaLinkedin className="h-4 w-4" />;
};

/* ─── count-up hook ─── */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count };
}

/* ─── stat number sub-component ─── */
function StatNumber({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(value, 1000);
  return (
    <div className="flex flex-col gap-1">
      <span ref={ref} className="font-archivo font-black leading-none text-white"
        style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
        {count}{suffix}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  );
}

/* ─── scroll reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const revealClasses = ["reveal", "reveal-left", "reveal-right", "reveal-scale"];
    const selector = revealClasses.map((c) => `.${c}`).join(",");

    const revealEl = (target: Element) => {
      target.classList.add("revealed");
      target.querySelectorAll(selector).forEach((c) => c.classList.add("revealed"));
    };

    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) revealEl(e.target); },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const targets = Array.from(el.querySelectorAll(selector));
    if (revealClasses.some((cls) => el.classList.contains(cls))) targets.push(el);

    targets.forEach((child) => {
      const rect = child.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) revealEl(child);
      else observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── style constants ─── */
const iconBtnClass =
  "group inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-white/10 active:bg-white/20";

const iconBtnLightClass =
  "group inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] active:bg-[rgb(var(--pf-gray-200)/1)]";

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function PortfolioUI() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const aboutRef = useReveal();
  const expRef = useReveal();
  const workRef = useReveal();
  const contactRef = useReveal();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["contact", "work", "experience", "about", "home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = mounted && (theme === "dark" || (theme === "system" && resolvedTheme === "dark"));
  const usesDarkNav = !mounted || activeSection === "home" || isDark;
  const navIconBtnClass = usesDarkNav
    ? "group inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-white/10 active:bg-white/20"
    : "group inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] active:bg-[rgb(var(--pf-gray-200)/1)]";
  const handleThemeToggle = () => setTheme(isDark ? "light" : "dark");

  const handleCopy = useCallback(async (key: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch { setCopiedKey(null); }
  }, []);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-[rgb(var(--pf-gray-default)/1)] text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-500 font-archivo">

      {/* ═══ NAVBAR (floating center-pill) ═══ */}
      <header className="fixed top-4 z-50 w-full px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <a href="#home"
            className={`font-mono text-xs font-bold uppercase tracking-[0.25em] drop-shadow-sm transition-all duration-300 hover:opacity-60 ${
              usesDarkNav ? "text-white" : "text-[rgb(var(--pf-gray-800)/1)]"
            }`}>
            KAR
          </a>

          {/* Desktop center pill */}
          <nav className={`hidden md:flex items-center gap-7 rounded-full border px-7 py-3 backdrop-blur-xl transition-all duration-300 ${
            usesDarkNav
              ? scrolled
                ? "border-white/20 bg-[rgb(10,9,7)]/88 shadow-lg"
                : "border-white/10 bg-[rgb(10,9,7)]/55"
              : scrolled
                ? "border-[rgb(var(--pf-gray-200)/1)] bg-white/55 shadow-sm"
                : "border-[rgb(var(--pf-gray-100)/0.8)] bg-white/35"
          }`}>
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a key={item.href} href={item.href}
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                    usesDarkNav
                      ? isActive ? "text-white" : "text-white/40 hover:text-white/80"
                      : isActive ? "text-[rgb(var(--pf-gray-900)/1)]" : "text-[rgb(var(--pf-gray-400)/1)] hover:text-[rgb(var(--pf-gray-800)/1)]"
                  }`}>
                  <span className="font-mono text-[rgb(var(--pf-accent)/0.8)]">{item.num}</span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button onClick={handleThemeToggle} type="button" aria-label="Toggle theme" className={navIconBtnClass}>
              <span key={isDark ? "sun" : "moon"} className="theme-icon-enter">
                {isDark
                  ? <FaSun className={`h-4 w-4 ${usesDarkNav ? "text-white/60" : "text-[rgb(var(--pf-gray-500)/1)]"}`} />
                  : <FaMoon className={`h-4 w-4 ${usesDarkNav ? "text-white/60" : "text-[rgb(var(--pf-gray-500)/1)]"}`} />}
              </span>
            </button>
            <a href={CV_PATH} download
              className={`hidden rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 md:inline-flex ${
                usesDarkNav
                  ? "border-white/25 text-white/80 hover:border-white/60 hover:text-white"
                  : "border-[rgb(var(--pf-gray-300)/1)] text-[rgb(var(--pf-gray-600)/1)] hover:border-[rgb(var(--pf-gray-700)/1)] hover:text-[rgb(var(--pf-gray-900)/1)]"
              }`}>
              Resume
            </a>
            <button onClick={() => setMenuOpen((p) => !p)} type="button" aria-label="Toggle menu"
              className={`${navIconBtnClass} md:hidden`}>
              <span key={menuOpen ? "x" : "bars"} className="theme-icon-enter">
                {menuOpen
                  ? <FaXmark className={`h-5 w-5 ${usesDarkNav ? "text-white/80" : "text-[rgb(var(--pf-gray-700)/1)]"}`} />
                  : <FaBars className={`h-5 w-5 ${usesDarkNav ? "text-white/80" : "text-[rgb(var(--pf-gray-700)/1)]"}`} />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu-enter mt-2 rounded-2xl border border-white/10 bg-[rgb(10,9,7)]/95 px-6 py-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMobileMenu}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white">
                  <span className="font-mono text-[rgb(var(--pf-accent)/0.8)]">{item.num}</span>
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <button onClick={handleThemeToggle} type="button" className={iconBtnClass}>
                  {isDark ? <FaSun className="h-4 w-4 text-white/60" /> : <FaMoon className="h-4 w-4 text-white/60" />}
                </button>
                <a href={CV_PATH} download className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Resume ↓
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex min-h-screen w-full flex-col">

        {/* ═══ 00 HERO / INTRO ═══ */}
        <section id="home" className="relative min-h-screen overflow-hidden">
          {/* Background photo */}
          <div className="absolute inset-0">
            <img
              src="/Foto_Background3.jpeg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[65%_center]"
            />
            <div className="hero-gradient absolute inset-0" />
            <div className="absolute inset-0 bg-[rgb(10,9,7)]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-28 pb-20 md:px-12">

            {/* Name + role */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                Kaesar Adam Rafano
              </span>
              <span className="hidden sm:inline text-white/25">·</span>
              <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                PHP &amp; JavaScript Developer
              </span>
            </div>

            {/* Main hero content */}
            <div className="flex flex-col gap-10">
              <div className="hidden sm:flex items-center gap-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Selected Proof</span>
                <div className="h-px w-24 bg-white/15" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Production Scale</span>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12 md:gap-20">
                {HERO_STATS.map((stat, i) => (
                  <StatNumber key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>

              <div className="h-px w-full max-w-2xl bg-white/10" />

              {/* Description + CTA */}
              <div className="flex max-w-2xl flex-col gap-6">
                <p className="font-newsreader text-lg leading-8 text-white/75 md:text-xl">
                  I build production Laravel and Next.js systems, integrate AI APIs into real
                  products, and ship web applications that solve actual problems — from backend
                  architecture to polished frontend. Open to remote &amp; international roles.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#contact"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10">
                    Get in touch <FaArrowRight className="h-3 w-3" />
                  </a>
                  <div className="flex gap-1">
                    {socialMedia.map((item) => (
                      <a key={item.id} href={item.link} target="_blank" rel="noreferrer"
                        className={iconBtnClass}>
                        <span className="text-white/50 transition-colors group-hover:text-white">
                          {renderSocialIcon(item.id)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scroll hint */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-px bg-white/20" />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NOW BAND ═══ */}
        <section className="border-b border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-default)/1)] transition-colors duration-500">
          <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <div className="mb-10 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[rgb(var(--pf-gray-400)/1)]">
                Now · 2026
              </span>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {HERO_STATUS.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                    {item.category}
                  </p>
                  <p className="font-newsreader text-xl font-semibold italic leading-snug text-[rgb(var(--pf-gray-900)/1)]">
                    {item.title}
                  </p>
                  <p className="text-sm text-[rgb(var(--pf-gray-500)/1)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 01 BACKGROUND & WORKING STYLE ═══ */}
        <section id="about" className="bg-[rgb(var(--pf-gray-default)/1)] transition-colors duration-500">

          {/* Section header */}
          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-8 md:px-12 transition-colors duration-500">
            <div className="mx-auto flex w-full max-w-7xl items-baseline gap-6">
              <span className="font-mono text-xs font-bold text-[rgb(var(--pf-accent)/1)]">01</span>
              <h2 className="font-archivo text-2xl font-black tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] md:text-3xl">
                Background &amp; Working Style
              </h2>
            </div>
          </div>

          {/* Horizontal skills ticker */}
          <div className="overflow-hidden border-b border-[rgb(var(--pf-gray-200)/1)] py-4 transition-colors duration-500">
            <div className="ticker-track">
              {[...TICKER_SKILLS, ...TICKER_SKILLS].map((skill, i) => (
                <span key={i} className="mx-6 shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                  {skill}
                  <span className="ml-6 text-[rgb(var(--pf-gray-300)/1)]">·</span>
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div ref={aboutRef} className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_300px] lg:gap-24">

              {/* Left: text + timeline */}
              <div className="flex flex-col gap-8">
                <h3 className="reveal font-archivo text-4xl font-black leading-tight tracking-[-0.03em] text-[rgb(var(--pf-gray-900)/1)] md:text-5xl">
                  A developer who ships<br />front to back.
                </h3>

                {/* Drop-cap paragraph */}
                <p className="reveal stagger-1 drop-cap font-newsreader text-lg leading-8 text-[rgb(var(--pf-gray-600)/1)] md:text-xl">
                  I&apos;m Kaesar — a front-end-focused developer based in Jakarta who cares
                  deeply about building interfaces that feel right. I work primarily with React
                  and Next.js, but I&apos;m never afraid to go deeper into the stack when the
                  product demands it.
                </p>
                <p className="reveal stagger-2 font-newsreader text-lg leading-8 text-[rgb(var(--pf-gray-600)/1)] md:text-xl">
                  I&apos;ve already integrated Claude Sonnet, Gemini 2.5 Flash, and Groq API
                  in shipped products — not just experiments. Whether it&apos;s architecting an
                  AI fallback cascade or polishing a Tailwind layout pixel by pixel, I bring
                  the same attention to both ends.
                </p>
                <p className="reveal stagger-3 font-newsreader text-lg leading-8 text-[rgb(var(--pf-gray-600)/1)] md:text-xl">
                  I do my best work when a team needs someone to own the messy middle: design
                  the component, wire the API, push through the deployment, and still notice
                  the 4px spacing that doesn&apos;t feel right.
                </p>

                {/* Signature */}
                <p className="reveal stagger-4 font-newsreader text-base italic text-[rgb(var(--pf-gray-400)/1)]">
                  — Kaesar Adam Rafano, Jakarta 2026
                </p>

                {/* Timeline */}
                <div className="reveal stagger-5 mt-4 flex flex-col">
                  <p className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[rgb(var(--pf-gray-400)/1)]">
                    Through the years
                  </p>
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                          item.current
                            ? "bg-[rgb(var(--pf-accent)/1)]"
                            : "bg-[rgb(var(--pf-gray-300)/1)]"
                        }`} />
                        {i < TIMELINE.length - 1 && (
                          <div className="mt-1 w-px flex-1 bg-[rgb(var(--pf-gray-200)/1)]" style={{ minHeight: 32 }} />
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5 pb-8">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                          {item.year}
                        </span>
                        <p className="font-newsreader text-base leading-relaxed text-[rgb(var(--pf-gray-600)/1)]">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: key facts */}
              <div className="reveal-left flex flex-col gap-0 border-t border-[rgb(var(--pf-gray-200)/1)] pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8 transition-colors duration-500">
                {[
                  { label: "Currently", value: "Back-End Engineering Trainee · Maxy Academy" },
                  { label: "Also leading", value: "3-person team · UKM Seni Religi web platform" },
                  { label: "Based in", value: LOCATION },
                  { label: "Open to", value: "Remote · International · Senior roles" },
                  { label: "University", value: "Brawijaya University" },
                  { label: "Stack", value: "PHP · Laravel · JS · Next.js · Flutter" },
                ].map((fact, i) => (
                  <div key={i} className={`border-b border-[rgb(var(--pf-gray-200)/1)] py-5 stagger-${i + 1} transition-colors duration-500`}>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold text-[rgb(var(--pf-gray-800)/1)]">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 02 EXPERIENCE ═══ */}
        <section id="experience" className="border-t border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-50)/1)] transition-colors duration-500">

          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-8 md:px-12 transition-colors duration-500">
            <div className="mx-auto flex w-full max-w-7xl items-baseline gap-6">
              <span className="font-mono text-xs font-bold text-[rgb(var(--pf-accent)/1)]">02</span>
              <h2 className="font-archivo text-2xl font-black tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] md:text-3xl">
                Engineering Experience
              </h2>
            </div>
          </div>

          <div ref={expRef} className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <p className="reveal mb-12 max-w-sm font-newsreader text-base italic text-[rgb(var(--pf-gray-500)/1)]">
              {workExperience.length} roles · building since 2024
            </p>

            <div className="flex flex-col">
              {workExperience.map((item, index) => (
                <div key={item.id}
                  className={`reveal-left group border-t border-[rgb(var(--pf-gray-200)/1)] py-10 grid grid-cols-1 gap-6 md:grid-cols-[80px_1fr_200px] md:gap-10 md:items-start stagger-${Math.min(index + 1, 5)} transition-colors duration-500`}>

                  {/* Roman numeral */}
                  <div className="font-archivo text-4xl font-black text-[rgb(var(--pf-gray-200)/1)] transition-colors duration-300 group-hover:text-[rgb(var(--pf-accent)/0.3)]">
                    {ROMAN[index]}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <img src={item.thumbnail} alt={item.title}
                        className="h-8 w-auto max-w-[80px] object-contain opacity-70 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="font-archivo text-base font-bold leading-snug text-[rgb(var(--pf-gray-900)/1)]">
                      {item.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {((item as any).descList ?? [item.desc]).map((bullet: string) => (
                        <li key={`${item.id}-${bullet.slice(0, 20)}`}
                          className="flex items-start gap-3 font-newsreader text-sm leading-relaxed text-[rgb(var(--pf-gray-600)/1)]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--pf-gray-400)/1)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Date */}
                  <div className="md:text-right">
                    <span className="font-mono text-xs font-medium tracking-wide text-[rgb(var(--pf-gray-400)/1)]">
                      {formatDateRange(item)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="border-t border-[rgb(var(--pf-gray-200)/1)] transition-colors duration-500" />
            </div>
          </div>
        </section>

        {/* ═══ TOOLKIT ═══ */}
        <section id="toolkit" className="border-t border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-default)/1)] transition-colors duration-500">

          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-8 md:px-12 transition-colors duration-500">
            <div className="mx-auto flex w-full max-w-7xl items-baseline gap-6">
              <span className="font-mono text-xs font-bold text-[rgb(var(--pf-accent)/1)]">T</span>
              <h2 className="font-archivo text-2xl font-black tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] md:text-3xl">
                Toolkit
              </h2>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-200)/1)] md:grid-cols-2 lg:grid-cols-3 transition-colors duration-500">
              {TOOLKIT.map((kit, i) => (
                <div key={i} className="flex flex-col gap-5 bg-[rgb(var(--pf-gray-default)/1)] p-8 transition-colors duration-500">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-[rgb(var(--pf-accent)/0.7)]">
                      T.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-archivo text-sm font-black uppercase tracking-[0.08em] text-[rgb(var(--pf-gray-900)/1)]">
                      {kit.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kit.skills.map((skill) => (
                      <span key={skill}
                        className="rounded-full border border-[rgb(var(--pf-gray-200)/1)] px-3 py-1 text-[11px] font-semibold text-[rgb(var(--pf-gray-600)/1)] transition-all duration-200 hover:border-[rgb(var(--pf-accent)/0.4)] hover:text-[rgb(var(--pf-gray-900)/1)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 03 PROJECTS / PLATES ═══ */}
        <section id="work" className="border-t border-[rgb(var(--pf-gray-200)/1)] transition-colors duration-500">

          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-8 md:px-12 transition-colors duration-500">
            <div className="mx-auto flex w-full max-w-7xl items-baseline gap-6">
              <span className="font-mono text-xs font-bold text-[rgb(var(--pf-accent)/1)]">03</span>
              <h2 className="font-archivo text-2xl font-black tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] md:text-3xl">
                Independent Projects
              </h2>
            </div>
          </div>

          {/* Contents list */}
          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-6 md:px-12 transition-colors duration-500">
            <div className="mx-auto w-full max-w-7xl">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                Contents · {projects.length} plates · this issue
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-1.5">
                {projects.map((p, i) => (
                  <span key={p.id} className="font-mono text-xs text-[rgb(var(--pf-gray-500)/1)]">
                    <span className="text-[rgb(var(--pf-accent)/0.8)]">B.{String(i + 1).padStart(2, "0")}</span>
                    {" "}{p.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Plates */}
          <div ref={workRef} className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12 md:py-16">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {projects.map((project, index) => {
                const hasGithub = isUrl(project.githubLink);
                const hasLive = isUrl(project.liveUrl);
                const techLabels = Array.from(new Set(
                  project.iconLists.map((icon) => iconLabelMap[icon] ?? toReadableLabel(icon))
                ));
                const plateNum = `B.${String(index + 1).padStart(2, "0")}`;

                return (
                  <article
                    key={project.id}
                    className={`reveal plate-card stagger-${Math.min(index + 1, 6)} flex flex-col overflow-hidden border border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-default)/1)] transition-colors duration-500`}
                  >
                    {/* Plate header */}
                    <div className="flex items-center justify-between border-b border-[rgb(var(--pf-gray-200)/1)] px-5 py-3 transition-colors duration-500">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-accent)/1)]">
                        {plateNum}
                      </span>
                      <div className="flex items-center gap-2">
                        {hasGithub ? (
                          <a href={project.githubLink} target="_blank" rel="noreferrer"
                            className="rounded p-1 text-[rgb(var(--pf-gray-400)/1)] transition-colors hover:text-[rgb(var(--pf-gray-900)/1)]">
                            <FaGithub className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="cursor-not-allowed rounded p-1 text-[rgb(var(--pf-gray-200)/1)]">
                            <FaGithub className="h-3.5 w-3.5" />
                          </span>
                        )}
                        {hasLive && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer"
                            className="rounded p-1 text-[rgb(var(--pf-gray-400)/1)] transition-colors hover:text-[rgb(var(--pf-gray-900)/1)]">
                            <FaArrowUpRightFromSquare className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project image */}
                    <div className="aspect-video overflow-hidden bg-[rgb(var(--pf-gray-100)/1)]">
                      {hasLive ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block h-full">
                          <img src={project.img} alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </a>
                      ) : (
                        <img src={project.img} alt={project.title}
                          className="h-full w-full object-cover" />
                      )}
                    </div>

                    {/* Project info */}
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <h3 className="font-archivo text-base font-bold leading-snug text-[rgb(var(--pf-gray-900)/1)]">
                        {project.title}
                      </h3>
                      <p className="font-newsreader text-sm leading-relaxed text-[rgb(var(--pf-gray-500)/1)]">
                        {project.des}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {techLabels.map((tag) => (
                          <span key={`${project.id}-${tag}`}
                            className="rounded-full bg-[rgb(var(--pf-gray-100)/1)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[rgb(var(--pf-gray-500)/1)] transition-colors duration-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 04 CONTACT ═══ */}
        <section id="contact" className="border-t border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-50)/1)] transition-colors duration-500">

          <div className="border-b border-[rgb(var(--pf-gray-200)/1)] px-6 py-8 md:px-12 transition-colors duration-500">
            <div className="mx-auto flex w-full max-w-7xl items-baseline gap-6">
              <span className="font-mono text-xs font-bold text-[rgb(var(--pf-accent)/1)]">04</span>
              <h2 className="font-archivo text-2xl font-black tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] md:text-3xl">
                Contact
              </h2>
            </div>
          </div>

          <div ref={contactRef} className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">

            <h3 className="reveal mb-12 font-archivo font-black leading-[0.88] tracking-[-0.04em] text-[rgb(var(--pf-gray-900)/1)]"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              Let&apos;s work<br />
              <span className="text-[rgb(var(--pf-gray-300)/1)]">together.</span>
            </h3>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px]">

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="reveal stagger-1 flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full border border-[rgb(var(--pf-gray-200)/1)] bg-transparent px-4 py-3 text-sm text-[rgb(var(--pf-gray-900)/1)] outline-none transition-colors duration-200 placeholder:text-[rgb(var(--pf-gray-300)/1)] focus:border-[rgb(var(--pf-accent)/0.6)] bg-[rgb(var(--pf-gray-default)/1)]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full border border-[rgb(var(--pf-gray-200)/1)] bg-transparent px-4 py-3 text-sm text-[rgb(var(--pf-gray-900)/1)] outline-none transition-colors duration-200 placeholder:text-[rgb(var(--pf-gray-300)/1)] focus:border-[rgb(var(--pf-accent)/0.6)] bg-[rgb(var(--pf-gray-default)/1)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                    Note
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="What would you like to work on?"
                    className="w-full resize-none border border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-default)/1)] px-4 py-3 text-sm text-[rgb(var(--pf-gray-900)/1)] outline-none transition-colors duration-200 placeholder:text-[rgb(var(--pf-gray-300)/1)] focus:border-[rgb(var(--pf-accent)/0.6)]"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-3 border border-[rgb(var(--pf-gray-900)/1)] px-7 py-3 text-sm font-bold text-[rgb(var(--pf-gray-900)/1)] transition-all duration-200 hover:bg-[rgb(var(--pf-gray-900)/1)] hover:text-[rgb(var(--pf-gray-default)/1)]"
                >
                  Send message <FaArrowRight className="h-3 w-3" />
                </button>
              </form>

              {/* Aside */}
              <div className="reveal stagger-2 flex flex-col gap-8 border-t border-[rgb(var(--pf-gray-200)/1)] pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8 transition-colors duration-500">
                <div>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                    Email
                  </p>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm font-semibold text-[rgb(var(--pf-gray-800)/1)] transition-colors hover:text-[rgb(var(--pf-accent)/1)]">
                      {CONTACT_EMAIL}
                    </a>
                    <button type="button" onClick={() => handleCopy("email", CONTACT_EMAIL)}
                      aria-label="Copy email"
                      className={`${iconBtnLightClass} ${copiedKey === "email" ? "copy-success" : ""}`}>
                      {copiedKey === "email"
                        ? <FaCheck className="h-3 w-3 text-emerald-500" />
                        : <FaRegCopy className="h-3 w-3 text-[rgb(var(--pf-gray-400)/1)]" />}
                    </button>
                  </div>
                  {copiedKey === "email" && (
                    <p className="mt-1 text-xs font-medium text-emerald-500">✓ Copied</p>
                  )}
                </div>

                <div>
                  <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                    Channels
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "GitHub", icon: <FaGithub className="h-4 w-4" />, link: "https://github.com/damhacker04" },
                      { label: "LinkedIn", icon: <FaLinkedin className="h-4 w-4" />, link: "https://www.linkedin.com/in/kaesar-adam-rafano-b02b141b8" },
                      { label: "Instagram", icon: <FaInstagram className="h-4 w-4" />, link: "https://instagram.com/damdam_rafano" },
                    ].map((ch) => (
                      <a key={ch.label} href={ch.link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 text-sm text-[rgb(var(--pf-gray-600)/1)] transition-colors hover:text-[rgb(var(--pf-gray-900)/1)]">
                        <span className="text-[rgb(var(--pf-gray-400)/1)]">{ch.icon}</span>
                        {ch.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--pf-gray-400)/1)]">
                    Based in
                  </p>
                  <p className="text-sm text-[rgb(var(--pf-gray-600)/1)]">{LOCATION}</p>
                </div>

                <a href={CV_PATH} download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--pf-gray-800)/1)] transition-colors hover:text-[rgb(var(--pf-accent)/1)]">
                  Download CV <FaArrowUpRightFromSquare className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER (giant name) ═══ */}
      <footer className="border-t border-[rgb(var(--pf-gray-200)/1)] transition-colors duration-500">
        <div className="overflow-hidden px-6 pt-8 md:px-12">
          <div className="mx-auto max-w-7xl">
            <p
              className="select-none font-archivo font-black leading-none tracking-[-0.05em] text-[rgb(var(--pf-gray-100)/1)] transition-colors duration-500"
              style={{ fontSize: "clamp(5rem, 19vw, 17rem)" }}
            >
              Kaesar
            </p>
          </div>
        </div>
        <div className="border-t border-[rgb(var(--pf-gray-200)/1)] px-6 py-5 transition-colors duration-500 md:px-12">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[rgb(var(--pf-gray-400)/1)]">
              Vol. 01 · 2026
            </span>
            <p className="font-mono text-[10px] text-[rgb(var(--pf-gray-400)/1)]">
              PHP &amp; JavaScript Developer
            </p>
            <a href="#home"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[rgb(var(--pf-gray-400)/1)] transition-colors hover:text-[rgb(var(--pf-gray-900)/1)]">
              Top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
