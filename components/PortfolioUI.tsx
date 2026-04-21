"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  FaArrowUpRightFromSquare,
  FaBars,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaMoon,
  FaRegCopy,
  FaSun,
  FaXmark,
  FaCheck,
} from "react-icons/fa6";

import { gridItems, projects, socialMedia, workExperience } from "@/data";

/* ─── constants ─── */
const CV_PATH = "/my_cv_updated.pdf";
const CONTACT_EMAIL = "adamemier16@gmail.com";
const LOCATION = "Jakarta, Indonesia";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const iconLabelMap: Record<string, string> = {
  "/next.svg": "Next.js",
  "/javascript.svg": "Javascript",
  "/kotlin.svg": "Kotlin",
  "/flutter.svg": "Flutter",
  "/dart.svg": "Dart",
  "/html.svg": "HTML",
  "/css.svg": "CSS",
  "/three.svg": "Three.js",
  "/laravel.svg": "Laravel",
  "/php.svg": "PHP",
  "/tail.svg": "Tailwindcss",
  "/re.svg": "React",
  "/ts.svg": "Typescript",
  "/git.svg": "Git",
  "/dockerName.svg": "Docker",
};

/* ─── helpers ─── */
const toReadableLabel = (value: string) => {
  const cleaned = value.split("/").pop()?.replace(/\.(svg|png|jpg|jpeg)$/i, "") ?? value;
  return cleaned
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const isUrl = (value: string) => /^https?:\/\//i.test(value.trim());

const formatDateRange = (item: {
  startMonth?: string;
  startYear?: number;
  endMonth?: string;
  endYear?: number;
}) => {
  const start = [item.startMonth, item.startYear].filter(Boolean).join(" ");
  const isPresent = item.endMonth === "Now" || item.endMonth === "Present";
  const end = isPresent ? "Present" : [item.endMonth, item.endYear].filter(Boolean).join(" ");
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

const toBullets = (description: string) => {
  const pieces = description
    .replace(/\s+/g, " ")
    .split(". ")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (part.endsWith(".") ? part : `${part}.`));
  return pieces.length > 0 ? pieces.slice(0, 4) : [description];
};

const renderSocialIcon = (id: number) => {
  if (id === 1) return <FaGithub className="h-5 w-5" />;
  if (id === 2) return <FaInstagram className="h-5 w-5" />;
  return <FaLinkedin className="h-5 w-5" />;
};

/* ─── scroll reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // also reveal children with reveal / reveal-left / reveal-right / reveal-scale class
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
              .forEach((child) => child.classList.add("revealed"));
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // observe the container itself
    if (
      el.classList.contains("reveal") ||
      el.classList.contains("reveal-left") ||
      el.classList.contains("reveal-right") ||
      el.classList.contains("reveal-scale")
    ) {
      observer.observe(el);
    }

    // observe children
    el
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── sub-components ─── */
function SectionTag({ label }: { label: string }) {
  return (
    <div className="self-center">
      <div className="flex items-center justify-center rounded-xl bg-[rgb(var(--pf-gray-200)/1)] px-5 py-1 transition-colors duration-300">
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

/* ─── style constants ─── */
const sectionClass = "w-full py-16 md:py-20 2xl:py-24 transition-colors duration-400";
const sectionContainer = "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8";
const iconButtonClass =
  "group relative inline-flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] active:bg-[rgb(var(--pf-gray-200)/1)] hover:scale-110 active:scale-95";

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function PortfolioUI() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* reveal refs for each section */
  const heroRef = useReveal();
  const aboutRef = useReveal();
  const skillsRef = useReveal();
  const workRef = useReveal();
  const experienceRef = useReveal();
  const contactRef = useReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  /* scroll listener for navbar shadow + active section tracking */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // detect active section
      const sections = ["contact", "experience", "work", "skills", "about", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDark =
    mounted && (theme === "dark" || (theme === "system" && resolvedTheme === "dark"));

  /* aggregate unique skills from projects */
  const skills = useMemo(() => {
    const unique = new Map<string, { icon: string; label: string }>();
    for (const project of projects) {
      for (const icon of project.iconLists) {
        if (!unique.has(icon)) {
          unique.set(icon, {
            icon,
            label: iconLabelMap[icon] ?? toReadableLabel(icon),
          });
        }
      }
    }
    const preferredOrder = [
      "/javascript.svg", "/ts.svg", "/re.svg", "/next.svg",
      "/flutter.svg", "/kotlin.svg", "/laravel.svg", "/php.svg",
      "/html.svg", "/css.svg", "/tail.svg", "/three.svg",
      "/dart.svg", "/git.svg", "/dockerName.svg",
    ];
    return Array.from(unique.values())
      .sort((a, b) => {
        const aI = preferredOrder.indexOf(a.icon);
        const bI = preferredOrder.indexOf(b.icon);
        return (aI === -1 ? 999 : aI) - (bI === -1 ? 999 : bI);
      })
      .slice(0, 16);
  }, []);

  /* about bullets from grid items */
  const aboutBits = useMemo(
    () => gridItems.map((item) => item.title.trim()).filter(Boolean),
    []
  );

  /* secondary contact (LinkedIn) */
  const secondaryContactLink =
    socialMedia.find((item) => item.id === 3)?.link ?? socialMedia[0]?.link ?? "";
  const secondaryContactLabel = secondaryContactLink
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  /* handlers */
  const handleThemeToggle = () => setTheme(isDark ? "light" : "dark");

  const handleCopy = useCallback(async (key: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  }, []);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  /* ─── RENDER ─── */
  return (
    <div className="min-h-screen bg-[rgb(var(--pf-gray-default)/1)] text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-400">

      {/* ═══ HEADER ═══ */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
          ? "border-[rgb(var(--pf-gray-200)/1)] bg-[rgb(var(--pf-gray-default)/0.85)] nav-scrolled"
          : "border-[rgb(var(--pf-gray-100)/0.5)] bg-[rgb(var(--pf-gray-default)/0.5)]"
          } backdrop-blur-xl`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] transition-all duration-200 hover:opacity-70 md:text-3xl"
          >
            {"<KA />"}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex list-none items-center gap-6">
              {navLinks.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`relative text-base font-medium transition-all duration-200 ${isActive
                        ? "text-[rgb(var(--pf-gray-900)/1)]"
                        : "text-[rgb(var(--pf-gray-600)/1)] hover:text-[rgb(var(--pf-gray-900)/1)]"
                        }`}
                    >
                      {item.label}
                      {/* Active indicator line */}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[rgb(var(--pf-gray-900)/1)] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                          }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-0.5 bg-[rgb(var(--pf-gray-200)/1)]" />

            <div className="flex items-center gap-4">
              <button
                onClick={handleThemeToggle}
                type="button"
                aria-label="Toggle theme"
                className={iconButtonClass}
              >
                <span key={isDark ? "sun" : "moon"} className="theme-icon-enter">
                  {isDark ? (
                    <FaSun className="h-5 w-5 text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-200 group-hover:text-[rgb(var(--pf-gray-900)/1)]" />
                  ) : (
                    <FaMoon className="h-5 w-5 text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-200 group-hover:text-[rgb(var(--pf-gray-900)/1)]" />
                  )}
                </span>
              </button>

              <a
                href={CV_PATH}
                download
                className="inline-flex items-center justify-center rounded-xl bg-[rgb(var(--pf-gray-900)/1)] px-4 py-1.5 font-medium text-[rgb(var(--pf-gray-50)/1)] transition-all duration-200 hover:bg-[rgb(var(--pf-gray-700)/1)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:bg-[rgb(var(--pf-gray-800)/1)]"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            className={`${iconButtonClass} md:hidden`}
          >
            <span key={menuOpen ? "close" : "open"} className="theme-icon-enter">
              {menuOpen ? (
                <FaXmark className="h-6 w-6 text-[rgb(var(--pf-gray-600)/1)]" />
              ) : (
                <FaBars className="h-6 w-6 text-[rgb(var(--pf-gray-600)/1)]" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu-enter border-t border-[rgb(var(--pf-gray-100)/1)] bg-[rgb(var(--pf-gray-default)/1)] px-4 py-4 md:hidden">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] hover:text-[rgb(var(--pf-gray-900)/1)] active:bg-[rgb(var(--pf-gray-200)/1)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-[rgb(var(--pf-gray-100)/1)] pt-3">
                <button
                  onClick={handleThemeToggle}
                  type="button"
                  aria-label="Toggle theme"
                  className={iconButtonClass}
                >
                  {isDark ? (
                    <FaSun className="h-5 w-5 text-[rgb(var(--pf-gray-600)/1)]" />
                  ) : (
                    <FaMoon className="h-5 w-5 text-[rgb(var(--pf-gray-600)/1)]" />
                  )}
                </button>
                <a
                  href={CV_PATH}
                  download
                  className="inline-flex items-center justify-center rounded-xl bg-[rgb(var(--pf-gray-900)/1)] px-4 py-1.5 font-medium text-[rgb(var(--pf-gray-50)/1)] transition-all duration-200 hover:bg-[rgb(var(--pf-gray-700)/1)] active:bg-[rgb(var(--pf-gray-800)/1)]"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex min-h-screen w-full flex-col">

        {/* ═══ HERO ═══ */}
        <section id="home" className={`${sectionClass} bg-[rgb(var(--pf-gray-default)/1)]`}>
          <div ref={heroRef} className={sectionContainer}>
            <div className="flex flex-col gap-12 md:flex-row md:items-center">
              {/* Photo */}
              <div className="reveal-scale flex items-center justify-center md:order-last md:flex-grow md:justify-end">
                <div className="relative h-[300px] w-[280px] md:h-[360px] md:w-[320px]">
                  <img
                    src="/PhotoProfile.jpg"
                    alt="Headshot of Kaesar Adam Rafano"
                    className="absolute z-10 h-[280px] w-[240px] border-8 border-[rgb(var(--pf-gray-default)/1)] object-cover shadow-[var(--pf-shadow-lg)] transition-all duration-500 hover:shadow-[var(--pf-shadow-2xl)] max-md:left-5 md:left-0 md:top-0 md:h-[320px] md:w-[280px]"
                  />
                  <div className="absolute h-[280px] w-[280px] border-8 border-transparent bg-[rgb(var(--pf-gray-200)/1)] transition-colors duration-400 max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]" />
                </div>
              </div>

              {/* Text content */}
              <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
                <div className="flex flex-col gap-2">
                  <h1 className="reveal text-4xl font-semibold text-[rgb(var(--pf-gray-900)/1)] transition-colors duration-300 md:text-5xl md:font-bold md:tracking-[-0.02em] lg:text-6xl lg:leading-[72px]">
                    Hi, I&apos;m Kaesar{" "}
                    <span className="inline-block origin-[70%_70%] animate-[wave_2.5s_ease-in-out_infinite]">👋</span>
                  </h1>
                  <p className="reveal stagger-1 text-base leading-7">
                    PHP &amp; JavaScript Developer specializing in Backend Architecture &amp; System Design — building production-grade web systems with Laravel, Next.js, and REST APIs. Open to remote &amp; international roles.
                  </p>
                </div>

                <div className="reveal stagger-2 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <FaLocationDot className="h-6 w-6 shrink-0 text-[rgb(var(--pf-gray-600)/1)]" />
                    <p className="text-base">{LOCATION}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                      </span>
                    </div>
                    <p className="text-base">Available for new projects</p>
                  </div>
                </div>

                <div className="reveal stagger-3 flex gap-1">
                  {socialMedia.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Social profile ${item.id}`}
                      className={iconButtonClass}
                    >
                      <span className="text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-200 group-hover:text-[rgb(var(--pf-gray-900)/1)]">
                        {renderSocialIcon(item.id)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className={`${sectionClass} bg-[rgb(var(--pf-gray-50)/1)]`}>
          <div ref={aboutRef} className={sectionContainer}>
            <div className="reveal">
              <SectionTag label="About me" />
            </div>

            <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
              {/* Photo */}
              <div className="reveal-left flex justify-center md:order-first md:justify-end">
                <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
                  <img
                    src="/Foto_Background3.jpeg"
                    alt="Fullpose of Kaesar Adam Rafano"
                    className="absolute z-10 h-[360px] w-[280px] border-8 border-[rgb(var(--pf-gray-50)/1)] object-cover shadow-[var(--pf-shadow-lg)] transition-all duration-500 hover:shadow-[var(--pf-shadow-2xl)] max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"
                  />
                  <div className="absolute h-[360px] w-[320px] border-8 border-transparent bg-[rgb(var(--pf-gray-200)/1)] transition-colors duration-400 max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]" />
                </div>
              </div>

              {/* Text */}
              <div className="flex max-w-xl flex-col gap-6">
                <h3 className="reveal-right text-2xl font-semibold tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] transition-colors duration-300 md:text-3xl">
                  Curious about me? Here you have it:
                </h3>
                <p className="reveal-right stagger-1 text-base leading-7">
                  As a PHP &amp; JavaScript Developer specializing in backend architecture and system design, I build fast, reliable web systems from the ground up — from database schema to deployed API to polished frontend.
                  I have a strong focus on clean code, maintainable systems, and production-ready solutions that scale.
                  I believe great products are built on clear technical decisions and seamless collaboration across engineering, design, and product.
                </p>
                <p className="reveal-right stagger-4 text-base leading-7">Finally, some quick bits about me.</p>

                <div className="reveal-right stagger-5 flex flex-col gap-2 md:flex-row md:gap-6">
                  <ul className="flex list-inside list-disc flex-col gap-2">
                    {aboutBits.slice(0, 2).map((bit) => (
                      <li key={bit} className="text-base">{bit}</li>
                    ))}
                  </ul>
                  <ul className="flex list-inside list-disc flex-col gap-2">
                    {aboutBits.slice(2, 4).map((bit) => (
                      <li key={bit} className="text-base">{bit}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="skills" className={`${sectionClass} bg-[rgb(var(--pf-gray-default)/1)]`}>
          <div ref={skillsRef} className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 md:px-8">
            <div className="flex flex-col items-start gap-4">
              <div className="reveal w-full">
                <SectionTag label="Skills" />
              </div>
              <p className="reveal stagger-1 mx-auto w-full max-w-[576px] text-center text-[20px] leading-7">
                The skills, tools and technologies I am really good at:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-y-4 md:grid-cols-6 md:gap-y-8 lg:grid-cols-8 lg:gap-y-12">
              {skills.map((skill, i) => (
                <div
                  key={skill.icon}
                  className={`reveal-scale stagger-${Math.min(i + 1, 15)} flex min-h-[100px] flex-col items-center justify-center gap-2`}
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="skill-icon-glow h-16 w-16 object-contain"
                  />
                  <p className="text-center text-base leading-7 md:text-[18px]">{skill.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WORK / PROJECTS ═══ */}
        <section id="work" className={`${sectionClass} bg-[rgb(var(--pf-gray-50)/1)]`}>
          <div ref={workRef} className={sectionContainer}>
            <div className="flex flex-col items-center gap-4">
              <div className="reveal">
                <SectionTag label="Work" />
              </div>
              <p className="reveal stagger-1 max-w-xl text-center text-lg md:text-xl">
                Some of the noteworthy projects I have built:
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {projects.map((project, index) => {
                const reverse = index % 2 === 1;
                const hasGithub = isUrl(project.githubLink);
                const hasLive = isUrl(project.liveUrl);
                const techLabels = Array.from(
                  new Set(
                    project.iconLists.map((icon) => iconLabelMap[icon] ?? toReadableLabel(icon))
                  )
                );

                return (
                  <article
                    key={project.id}
                    className={`reveal stagger-${Math.min(index + 1, 5)} group/card mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800 dark:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-2xl md:flex-row`}
                  >
                    {/* Image */}
                    <div
                      className={`flex items-center justify-center border-gray-100 bg-gray-50 p-8 dark:bg-gray-700 max-md:rounded-t-xl md:w-1/2 lg:p-12 ${reverse
                        ? "md:order-last md:rounded-r-xl md:border-l"
                        : "md:rounded-l-xl md:border-r"
                        }`}
                    >
                      {hasLive ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="overflow-hidden rounded-xl">
                          <img
                            src={project.img}
                            alt={`${project.title.trim()} preview`}
                            className="max-h-[320px] w-full rounded-xl bg-[rgb(var(--pf-gray-default)/1)] object-cover shadow-[var(--pf-shadow-lg)] transition-all duration-700 group-hover/card:scale-105"
                          />
                        </a>
                      ) : (
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={project.img}
                            alt={`${project.title.trim()} preview`}
                            className="max-h-[320px] w-full rounded-xl bg-[rgb(var(--pf-gray-default)/1)] object-cover shadow-[var(--pf-shadow-lg)] transition-all duration-700 group-hover/card:scale-105"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-col gap-6 p-8 md:w-1/2 lg:p-12 ${reverse ? "md:order-first" : ""
                        }`}
                    >
                      <p className="text-lg font-semibold text-[rgb(var(--pf-gray-900)/1)] transition-colors duration-300 md:text-xl">
                        {project.title.trim()}
                      </p>
                      <p className="text-base leading-7">{project.des}</p>

                      <div className="flex flex-wrap gap-2">
                        {techLabels.map((tag) => (
                          <div
                            key={`${project.id}-${tag}`}
                            className="flex items-center justify-center rounded-xl bg-[rgb(var(--pf-gray-200)/1)] px-5 py-1 transition-all duration-200 hover:bg-[rgb(var(--pf-gray-300)/1)] hover:scale-105"
                          >
                            <p className="text-sm font-medium">{tag}</p>
                          </div>
                        ))}
                      </div>

                      {/* Action links: GitHub + External */}
                      <div className="flex items-center gap-2">
                        {/* GitHub link */}
                        {hasGithub ? (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="self-start rounded-lg p-1.5 text-[rgb(var(--pf-gray-500)/1)] transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] hover:text-[rgb(var(--pf-gray-900)/1)]"
                            aria-label={`GitHub repo for ${project.title.trim()}`}
                          >
                            <FaGithub className="h-5 w-5" />
                          </a>
                        ) : (
                          <span
                            className="self-start rounded-lg p-1.5 text-[rgb(var(--pf-gray-300)/1)] cursor-not-allowed"
                            aria-label="GitHub not available"
                          >
                            <FaGithub className="h-5 w-5" />
                          </span>
                        )}

                        {/* External / live link */}
                        {hasLive ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="self-start rounded-lg p-1.5 text-[rgb(var(--pf-gray-500)/1)] transition-all duration-200 hover:bg-[rgb(var(--pf-gray-100)/1)] hover:text-[rgb(var(--pf-gray-900)/1)]"
                            aria-label={`Live site for ${project.title.trim()}`}
                          >
                            <FaArrowUpRightFromSquare className="h-5 w-5" />
                          </a>
                        ) : (
                          <span
                            className="self-start rounded-lg p-1.5 text-[rgb(var(--pf-gray-300)/1)] cursor-not-allowed"
                            aria-label="Live site not available"
                          >
                            <FaArrowUpRightFromSquare className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience" className={`${sectionClass} bg-[rgb(var(--pf-gray-default)/1)]`}>
          <div ref={experienceRef} className={sectionContainer}>
            <div className="flex flex-col items-center gap-4">
              <div className="reveal">
                <SectionTag label="Experience" />
              </div>
              <p className="reveal stagger-1 max-w-xl text-center text-lg md:text-xl">
                Here is a quick summary of my most recent experiences:
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {workExperience.map((item, index) => (
                <article
                  key={item.id}
                  className={`reveal-left stagger-${Math.min(index + 1, 5)} rounded-xl bg-white shadow-md dark:bg-gray-800 dark:shadow-2xl mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-2xl md:flex-row md:gap-8`}
                >
                  {/* Logo */}
                  <div className="max-md:order-1 md:w-1/4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-auto max-w-[120px] object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Title + bullets */}
                  <div className="flex flex-col gap-4 max-md:order-3 md:w-2/4">
                    <p className="text-lg font-semibold text-[rgb(var(--pf-gray-900)/1)] transition-colors duration-300 md:text-xl">
                      {item.title}
                    </p>
                    <ul className="flex list-disc flex-col gap-2 md:gap-1">
                      {((item as any).descList ?? toBullets(item.desc)).map((bullet: string) => (
                        <li key={`${item.id}-${bullet}`} className="text-base">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Date range */}
                  <div className="max-md:order-2 md:w-1/4">
                    <p className="text-base text-[rgb(var(--pf-gray-500)/1)] md:text-right">
                      {formatDateRange(item)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className={`${sectionClass} bg-[rgb(var(--pf-gray-50)/1)]`}>
          <div ref={contactRef} className={sectionContainer}>
            <div className="flex flex-col items-center gap-4">
              <div className="reveal">
                <SectionTag label="Get in touch" />
              </div>
              <p className="reveal stagger-1 max-w-xl text-center text-lg md:text-xl">
                What&apos;s next? Feel free to reach out for collaboration or project
                discussions.
              </p>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
              {/* Email row */}
              <div className="reveal stagger-2 flex items-center gap-3">
                <FaEnvelope className="h-6 w-6 text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-200 md:h-8 md:w-8" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-2xl font-semibold tracking-[-0.02em] text-[rgb(var(--pf-gray-900)/1)] transition-all duration-200 hover:underline hover:underline-offset-4 md:text-4xl md:tracking-[-0.02em]"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("email", CONTACT_EMAIL)}
                  aria-label="Copy email"
                  className={`${iconButtonClass} ${copiedKey === "email" ? "copy-success" : ""}`}
                >
                  {copiedKey === "email" ? (
                    <FaCheck className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <FaRegCopy className="h-5 w-5 text-[rgb(var(--pf-gray-600)/1)]" />
                  )}
                </button>
              </div>

              {/* LinkedIn row */}


              <p className="reveal stagger-4 text-center text-sm transition-all duration-300">
                {copiedKey ? (
                  <span className="text-emerald-500 font-medium">✓ Copied to clipboard!</span>
                ) : (
                  "You may also find me on these platforms"
                )}
              </p>

              <div className="reveal stagger-5 flex gap-1">
                {socialMedia.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Social link ${item.id}`}
                    className={iconButtonClass}
                  >
                    <span className="text-[rgb(var(--pf-gray-600)/1)] transition-colors duration-200 group-hover:text-[rgb(var(--pf-gray-900)/1)]">
                      {renderSocialIcon(item.id)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full bg-[rgb(var(--pf-gray-50)/1)] py-6 transition-colors duration-400">
        <div className="flex items-center justify-center gap-1 px-4 text-center text-sm">
          <p className="transition-colors duration-300">
            © {new Date().getFullYear()} | Designed and coded with{" "}
            <span className="inline-block transition-transform duration-200 hover:scale-125">❤️</span>{" "}
            by Kaesar Adam Rafano
          </p>
        </div>
      </footer>
    </div>
  );
}
