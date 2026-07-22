"use client";

/*
  DIRECTION CONTRACT — "The Strata"  (Experience · replaces the dark-photo breedlove world)

  THESIS: A portfolio as a cross-section of cooled rock. It refuses the loud dark-hero-photo
    and the big-count-up metric template; the work and the whitespace lead.
  OWN-WORLD: Cool mineral paper (#ECEBE6) / basalt (#121110), ink text, one molten ember seam
    used on <=5% of any viewport. Oversized Hanken Grotesk display against JetBrains Mono index
    labels. Sections are horizontal strata banded by 1px hairlines, opened by a mono number +
    ember tick. Flat by default; hover lifts warm.
  STORY: A recruiter lands on calm near-white, reads an oversized name and one honest line,
    scans real shipped work banded like rock layers, and reaches out.
  FIRST VIEWPORT: Minimal top bar; giant "Kaesar / Adam Rafano" on paper; a seam-tick + mono
    "WEB DEVELOPER" under it; one honest intro line; Get-in-touch action left, socials beside.
  FORM: Editorial strata (magma.build reference, user-pinned). Top-ranked structure; no seed
    roll (pinned world). Light + dark both authored. Primitives in components/strata/.
*/

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  FaArrowUpRightFromSquare,
  FaBars,
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
import { Strata, Label, Tag, Field, WRAP, ICON_BTN } from "@/components/strata";

/* ─── constants ─── */
const CV_PATH = "/Kaesar_Adam_Rafano_CV_Updated.pdf";
const CONTACT_EMAIL = "adamemier16@gmail.com";
const LOCATION = "Jakarta, Indonesia";

const HERO_STATS = [
  { value: 7, suffix: "", label: "Projects shipped" },
  { value: 3, suffix: "", label: "AI APIs in production" },
  { value: 5, suffix: "", label: "Roles held" },
];

const HERO_STATUS = [
  { category: "BUILDING", title: "UKM Web Platform", desc: "100+ members on Supabase and PostgreSQL" },
  { category: "BOOTCAMP", title: "Maxy Academy", desc: "Back-End Engineering trainee" },
  { category: "LAST SHIPPED", title: "Tripaw", desc: "Laravel 13 with a Claude Sonnet planner" },
  { category: "GOING DEEP ON", title: "Front-End Engineering", desc: "React patterns, UI craft, web performance" },
];

const TICKER_SKILLS = [
  "PHP", "Laravel", "Livewire", "JavaScript", "TypeScript", "React",
  "Next.js", "Node.js", "REST APIs", "Flutter", "Kotlin", "Dart",
  "Supabase", "PostgreSQL", "Firebase", "Docker", "GitHub Actions",
  "Claude Sonnet", "Gemini", "Groq API", "Midtrans", "Three.js",
  "HTML", "CSS", "Tailwind CSS", "Git",
];

const TOOLKIT = [
  { label: "Frontend", skills: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Backend", skills: ["PHP", "Laravel", "Livewire", "Node.js", "REST APIs"] },
  { label: "Mobile", skills: ["Flutter", "Dart", "Kotlin", "Jetpack Compose"] },
  { label: "Database & Cloud", skills: ["PostgreSQL", "Supabase", "Firebase", "Firestore"] },
  { label: "DevOps", skills: ["Docker", "GitHub Actions", "Git"] },
  { label: "AI & Integrations", skills: ["Claude Sonnet", "Gemini 2.5 Flash", "Groq API", "Midtrans", "Three.js"] },
];

const TIMELINE = [
  { year: "2024", event: "Joined GDG on Campus Brawijaya, authored a first PRD, started shipping web apps", current: false },
  { year: "2025", event: "First paid client (Saritama), competed at SEVENT 9.0, shipped Trajectoria and RumahAman", current: false },
  { year: "2026", event: "Maxy Academy back-end bootcamp, deployed multi-AI cascade systems, leading a 3-person team", current: true },
];

const navLinks = [
  { num: "00", label: "Intro", href: "#home" },
  { num: "01", label: "Background", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Projects", href: "#work" },
  { num: "04", label: "Toolkit", href: "#toolkit" },
  { num: "05", label: "Contact", href: "#contact" },
];

const iconLabelMap: Record<string, string> = {
  "/next.svg": "Next.js", "/javascript.svg": "JavaScript", "/kotlin.svg": "Kotlin",
  "/flutter.svg": "Flutter", "/dart.svg": "Dart", "/html.svg": "HTML",
  "/css.svg": "CSS", "/three.svg": "Three.js", "/laravel.svg": "Laravel",
  "/php.svg": "PHP", "/tail.svg": "Tailwind CSS", "/re.svg": "React",
  "/ts.svg": "TypeScript", "/git.svg": "Git", "/dockerName.svg": "Docker",
};

/* ─── helpers ─── */
const toReadableLabel = (value: string) => {
  const cleaned = value.split("/").pop()?.replace(/\.(svg|png|jpg|jpeg)$/i, "") ?? value;
  return cleaned.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
};

const isUrl = (value: string) => /^https?:\/\//i.test(value.trim());

const formatDateRange = (item: {
  startMonth?: string; startYear?: number; endMonth?: string; endYear?: number;
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

/* ─── count-up hook (compact proof figures) ─── */
function useCountUp(target: number, duration = 1100) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count };
}

function CompactStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(value);
  return (
    <div className="flex flex-col gap-2">
      <span ref={ref} className="font-sans text-5xl font-extrabold leading-none tracking-[-0.03em] text-ink md:text-6xl">
        {String(count).padStart(2, "0")}{suffix}
      </span>
      <Label className="text-[10px]">{label}</Label>
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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
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

/* ═══════════════════════════════════════════════ */
export default function PortfolioUI() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState<string>("");

  const aboutRef = useReveal();
  const expRef = useReveal();
  const workRef = useReveal();
  const toolkitRef = useReveal();
  const contactRef = useReveal();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["contact", "toolkit", "work", "experience", "about", "home"];
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
      `Name: ${formData.name}\nEmail: ${formData.email}\n${inquiryType ? `Inquiry: ${inquiryType}\n` : ""}\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-paper font-sans text-ink-soft transition-colors duration-500">

      {/* ═══ TOP NAV ═══ */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-paper/[0.86] backdrop-blur-xl" : "border-b border-transparent"
      }`}>
        <div className={`${WRAP} flex items-center justify-between py-4`}>
          <a href="#home" className="font-mono text-xs font-semibold tracking-[0.2em] text-ink transition-opacity hover:opacity-60">
            KAR
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => {
              const active = activeSection === item.href.replace("#", "");
              return (
                <a key={item.href} href={item.href}
                  className="group flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200">
                  <span className={active ? "text-ember-deep" : "text-ink-faint"}>{item.num}</span>
                  <span className={active ? "text-ink" : "text-ink-faint group-hover:text-ink"}>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={handleThemeToggle} type="button" aria-label="Toggle theme" className={ICON_BTN}>
              <span key={isDark ? "sun" : "moon"} className="theme-icon-enter">
                {isDark ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
              </span>
            </button>
            <a href={CV_PATH} download
              className="hidden border border-line px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:border-ink md:inline-flex">
              Resume
            </a>
            <button onClick={() => setMenuOpen((p) => !p)} type="button" aria-label="Toggle menu" className={`${ICON_BTN} md:hidden`}>
              <span key={menuOpen ? "x" : "bars"} className="theme-icon-enter">
                {menuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu-enter border-t border-line bg-paper px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMobileMenu}
                  className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink">
                  <span className="text-ember-deep">{item.num}</span>
                  {item.label}
                </a>
              ))}
              <a href={CV_PATH} download className="mt-1 border-t border-line pt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink">
                Resume ↓
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ═══ 00 HERO ═══ */}
        <section id="home" className="relative flex min-h-screen flex-col justify-between bg-paper pt-28 pb-8">
          <div className={`${WRAP} flex flex-1 flex-col justify-center py-10`}>
            <div className="mb-8 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              <Label className="tracking-[0.18em]">Available for work · Portfolio 2026</Label>
            </div>

            <h1 className="font-sans font-extrabold leading-[0.92] tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
              Kaesar<br />Adam Rafano
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <span className="seam-tick" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink">Web Developer</span>
              <Label className="tracking-[0.14em]">· {LOCATION}</Label>
            </div>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              I&apos;m a web developer based in Jakarta. As a student I&apos;ve already shipped real,
              deployed products across web, mobile, and AI-integrated systems, and right now I&apos;m
              going deep on front-end. Open to remote and international roles.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact"
                className="lift-hover inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-ember">
                Get in touch <FaArrowRight className="h-3 w-3" />
              </a>
              <div className="flex gap-1">
                {socialMedia.map((item) => (
                  <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className={ICON_BTN} aria-label="Social link">
                    {renderSocialIcon(item.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-line">
            <div className={`${WRAP} flex items-center justify-between py-4`}>
              <Label className="tracking-[0.18em]">00 · Intro</Label>
              <Label className="tracking-[0.18em]">Scroll ↓</Label>
            </div>
          </div>
        </section>

        {/* ═══ STANDING BAND ═══ */}
        <section className="bg-surface">
          <div className={`${WRAP} py-16 md:py-20`}>
            <div className="grid grid-cols-3 gap-6 border-b border-line pb-14 sm:gap-10">
              {HERO_STATS.map((s, i) => (
                <CompactStat key={i} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {HERO_STATUS.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Label className="text-[10px] text-ember-deep">{item.category}</Label>
                  <p className="text-lg font-bold leading-snug tracking-[-0.01em] text-ink">{item.title}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 01 BACKGROUND ═══ */}
        <section id="about" className="bg-paper">
          <Strata num="01" label="Background & Working Style" />

          <div className="overflow-hidden border-b border-line py-3.5">
            <div className="ticker-track">
              {[...TICKER_SKILLS, ...TICKER_SKILLS].map((skill, i) => (
                <span key={i} className="mx-5 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  {skill} <span className="ml-5 text-line">/</span>
                </span>
              ))}
            </div>
          </div>

          <div ref={aboutRef} className={`${WRAP} py-16 md:py-28`}>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_320px] lg:gap-24">
              <div className="flex flex-col gap-8">
                <h2 className="reveal font-sans text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl">
                  A developer who<br />ships, front to back.
                </h2>
                <p className="reveal stagger-1 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                  I&apos;m Kaesar, a web developer in Jakarta. I care about interfaces that feel right,
                  and I work mostly with React and Next.js. When a product needs more than the front end,
                  I go deeper into the stack.
                </p>
                <p className="reveal stagger-2 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                  I&apos;ve shipped Claude Sonnet, Gemini 2.5 Flash, and Groq in real products, not side
                  projects. Wiring an AI fallback cascade and polishing a Tailwind layout get the same
                  attention from me.
                </p>
                <p className="reveal stagger-3 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                  I do my best work owning the messy middle. Build the component, wire the API, push the
                  deploy, and still catch the 4px that feels off.
                </p>
                <Label className="reveal stagger-4 tracking-[0.14em]">Kaesar Adam Rafano, Jakarta 2026</Label>

                <div className="reveal stagger-5 mt-6 flex flex-col">
                  <Label className="mb-8 tracking-[0.18em]">Through the years</Label>
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className={`mt-1.5 h-2 w-2 shrink-0 ${item.current ? "bg-ember" : "bg-ink-faint"}`} />
                        {i < TIMELINE.length - 1 && <div className="mt-1 w-px flex-1 bg-line" style={{ minHeight: 34 }} />}
                      </div>
                      <div className="flex flex-col gap-1.5 pb-9">
                        <Label className="tracking-[0.16em]">{item.year}</Label>
                        <p className="max-w-[52ch] leading-relaxed text-ink-soft">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-right flex flex-col gap-8">
                <div className="overflow-hidden border border-line">
                  <img src="/Foto_Background3.jpeg" alt="Kaesar Adam Rafano" className="aspect-[4/5] w-full object-cover object-[60%_center]" />
                </div>
                <div className="flex flex-col">
                  {[
                    { label: "Currently", value: "Back-End Trainee · Maxy Academy" },
                    { label: "Also leading", value: "3-person team · UKM Seni Religi platform" },
                    { label: "Based in", value: LOCATION },
                    { label: "Open to", value: "Remote · International roles" },
                    { label: "University", value: "Brawijaya University" },
                    { label: "Stack", value: "React · Next.js · Laravel · Flutter" },
                  ].map((fact) => (
                    <div key={fact.label} className="border-b border-line py-4 first:border-t">
                      <Label className="mb-1 block text-[10px]">{fact.label}</Label>
                      <p className="text-sm font-semibold text-ink">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 02 EXPERIENCE ═══ */}
        <section id="experience" className="bg-surface">
          <Strata num="02" label="Engineering Experience" />
          <div ref={expRef} className={`${WRAP} py-14 md:py-20`}>
            <Label className="reveal mb-10 block tracking-[0.14em]">{workExperience.length} roles · building since 2024</Label>
            <div className="flex flex-col">
              {workExperience.map((item, index) => (
                <div key={item.id}
                  className={`reveal-left group grid grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-[64px_1fr_180px] md:gap-10 stagger-${Math.min(index + 1, 5)}`}>
                  <div className="font-mono text-2xl font-semibold text-ink-faint transition-colors duration-300 group-hover:text-ember">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex flex-col gap-4">
                    <img src={item.thumbnail} alt={item.title} className="h-7 w-auto max-w-[76px] object-contain opacity-80" />
                    <h3 className="text-base font-bold leading-snug text-ink">{item.title}</h3>
                    <ul className="flex flex-col gap-3">
                      {((item as { descList?: string[] }).descList ?? [item.desc]).map((bullet: string) => (
                        <li key={`${item.id}-${bullet.slice(0, 18)}`} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                          <span className="mt-2.5 h-1 w-1 shrink-0 bg-ember" />
                          <span className="max-w-[64ch] text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:text-right">
                    <span className="font-mono text-[11px] tracking-[0.06em] text-ink-faint">{formatDateRange(item)}</span>
                  </div>
                </div>
              ))}
              <div className="border-t border-line" />
            </div>
          </div>
        </section>

        {/* ═══ 03 PROJECTS ═══ */}
        <section id="work" className="bg-paper">
          <Strata num="03" label="Independent Projects" />
          <div ref={workRef} className={`${WRAP} py-14 md:py-20`}>
            <Label className="reveal mb-10 block tracking-[0.14em]">{projects.length} shipped · click through to live builds</Label>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project, index) => {
                const hasGithub = isUrl(project.githubLink);
                const hasLive = isUrl(project.liveUrl);
                const techLabels = Array.from(new Set(project.iconLists.map((icon) => iconLabelMap[icon] ?? toReadableLabel(icon))));
                const plateNum = `B.${String(index + 1).padStart(2, "0")}`;
                return (
                  <article key={project.id}
                    className={`reveal lift-hover stagger-${Math.min(index + 1, 6)} flex flex-col border border-line bg-paper`}>
                    <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                      <Label className="text-ember-deep tracking-[0.14em]">{plateNum}</Label>
                      <div className="flex items-center gap-1">
                        {hasGithub ? (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className={ICON_BTN} aria-label="GitHub">
                            <FaGithub className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="p-2 text-line"><FaGithub className="h-3.5 w-3.5" /></span>
                        )}
                        {hasLive && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={ICON_BTN} aria-label="Live site">
                            <FaArrowUpRightFromSquare className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="aspect-video overflow-hidden border-b border-line bg-surface">
                      {hasLive ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block h-full">
                          <img src={project.img} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                        </a>
                      ) : (
                        <img src={project.img} alt={project.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-base font-bold leading-snug text-ink">{project.title}</h3>
                      <p className="text-sm leading-relaxed text-ink-soft">{project.des}</p>
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {techLabels.map((tag) => (
                          <Tag key={`${project.id}-${tag}`} variant="meta">{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 04 TOOLKIT ═══ */}
        <section id="toolkit" className="bg-surface">
          <Strata num="04" label="Toolkit" />
          <div ref={toolkitRef} className={`${WRAP} py-14 md:py-20`}>
            <div className="grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLKIT.map((kit, i) => (
                <div key={i} className={`reveal stagger-${Math.min(i + 1, 6)} flex flex-col gap-5`}>
                  <div className="flex items-center gap-3 border-b border-line pb-3">
                    <span className="font-mono text-[11px] font-medium text-ember-deep">T.{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-bold uppercase tracking-[0.06em] text-ink">{kit.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kit.skills.map((skill) => (
                      <Tag key={skill} variant="skill">{skill}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 05 CONTACT ═══ */}
        <section id="contact" className="bg-paper">
          <Strata num="05" label="Contact" />
          <div ref={contactRef} className={`${WRAP} py-16 md:py-24`}>
            <h2 className="reveal mb-12 font-sans font-extrabold leading-[0.9] tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
              Let&apos;s work<br /><span className="text-ink-faint">together.</span>
            </h2>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_300px]">
              <form onSubmit={handleFormSubmit} className="reveal stagger-1 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Label className="text-[10px]">I&apos;m reaching out about</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Senior Role", "Contract", "Design Work", "Other"].map((type) => (
                      <button key={type} type="button" onClick={() => setInquiryType((prev) => prev === type ? "" : type)}
                        className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-150 ${
                          inquiryType === type
                            ? "border-ember bg-ember text-paper"
                            : "border-line text-ink-faint hover:border-ink-faint hover:text-ink"
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Name" required value={formData.name} placeholder="Your name"
                    onChange={(v) => setFormData((p) => ({ ...p, name: v }))} />
                  <Field label="Email" type="email" required value={formData.email} placeholder="your@email.com"
                    onChange={(v) => setFormData((p) => ({ ...p, email: v }))} />
                </div>

                <Field label="Note" textarea value={formData.message} placeholder="What would you like to work on?"
                  onChange={(v) => setFormData((p) => ({ ...p, message: v }))} />

                <button type="submit"
                  className="lift-hover self-start inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-ember">
                  Send message <FaArrowRight className="h-3 w-3" />
                </button>
              </form>

              <div className="reveal stagger-2 flex flex-col gap-8 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <Label className="mb-2 block text-[10px]">Email</Label>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold text-ink transition-colors hover:text-ember-deep">
                      {CONTACT_EMAIL}
                    </a>
                    <button type="button" onClick={() => handleCopy("email", CONTACT_EMAIL)} aria-label="Copy email"
                      className={`${ICON_BTN} ${copiedKey === "email" ? "copy-success" : ""}`}>
                      {copiedKey === "email" ? <FaCheck className="h-3 w-3 text-ember" /> : <FaRegCopy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block text-[10px]">Channels</Label>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "GitHub", icon: <FaGithub className="h-4 w-4" />, link: "https://github.com/damhacker04" },
                      { label: "LinkedIn", icon: <FaLinkedin className="h-4 w-4" />, link: "https://www.linkedin.com/in/kaesar-adam-rafano-b02b141b8" },
                      { label: "Instagram", icon: <FaInstagram className="h-4 w-4" />, link: "https://instagram.com/damdam_rafano" },
                    ].map((ch) => (
                      <a key={ch.label} href={ch.link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-ink">
                        <span className="text-ink-faint">{ch.icon}</span>{ch.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block text-[10px]">Based in</Label>
                  <p className="text-sm text-ink-soft">{LOCATION}</p>
                </div>

                <a href={CV_PATH} download className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ember-deep">
                  Download CV <FaArrowUpRightFromSquare className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-line bg-paper">
        <div className="overflow-hidden px-6 pt-10 md:px-12">
          <div className="mx-auto max-w-[76rem]">
            <p className="select-none font-sans font-extrabold leading-none tracking-[-0.05em] text-surface"
              style={{ fontSize: "clamp(4.5rem, 18vw, 16rem)" }}>
              Kaesar
            </p>
          </div>
        </div>
        <div className="border-t border-line">
          <div className={`${WRAP} flex items-center justify-between gap-4 py-5`}>
            <Label className="tracking-[0.18em]">Vol. 2026</Label>
            <Label className="tracking-[0.14em]">Web Developer</Label>
            <a href="#home" className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-ink">
              Top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
