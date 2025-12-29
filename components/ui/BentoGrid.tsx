"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoCopyOutline } from "react-icons/io5";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiHtml5,
  SiCss3
} from "react-icons/si";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

const skillCards = [
  { label: "Laravel", percent: "71%", icon: SiLaravel },
  { label: "PHP", percent: "86%", icon: SiPhp },
  { label: "HTML", percent: "86%", icon: SiHtml5 },
  { label: "CSS", percent: "86%", icon: SiCss3 },
  { label: "JavaScript", percent: "90%", icon: SiJavascript },
  { label: "React.js", percent: "20%", icon: SiReact },
  { label: "Next.js", percent: "90%", icon: SiNextdotjs },
  { label: "Node.js", percent: "88%", icon: SiNodedotjs },
  { label: "Tailwind CSS", percent: "94%", icon: SiTailwindcss },
  { label: "TypeScript", percent: "86%", icon: SiTypescript },
];

const skillStyles: Record<
  string,
  { base: string; shadow: string; border: string; gradStart: string; gradEnd: string }
> = {
  Laravel: {
    base: "#F55247",
    shadow: "rgba(245,82,71,0.45)",
    border: "rgba(245,82,71,0.35)",
    gradStart: "rgba(245,82,71,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  "React.js": {
    base: "#61DAFB",
    shadow: "rgba(97,218,251,0.45)",
    border: "rgba(97,218,251,0.35)",
    gradStart: "rgba(97,218,251,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  "Next.js": {
    base: "#FFFFFF",
    shadow: "rgba(255,255,255,0.35)",
    border: "rgba(255,255,255,0.25)",
    gradStart: "rgba(255,255,255,0.15)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  "Node.js": {
    base: "#68A063",
    shadow: "rgba(104,160,99,0.45)",
    border: "rgba(104,160,99,0.35)",
    gradStart: "rgba(104,160,99,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  "Tailwind CSS": {
    base: "#38BDF8",
    shadow: "rgba(56,189,248,0.45)",
    border: "rgba(56,189,248,0.35)",
    gradStart: "rgba(56,189,248,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  TypeScript: {
    base: "#3178C6",
    shadow: "rgba(49,120,198,0.45)",
    border: "rgba(49,120,198,0.35)",
    gradStart: "rgba(49,120,198,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  PHP: {
    base: "#777BB3",
    shadow: "rgba(119,123,179,0.45)",
    border: "rgba(119,123,179,0.35)",
    gradStart: "rgba(119,123,179,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  HTML: {
    base: "#E34F26",
    shadow: "rgba(227,79,38,0.45)",
    border: "rgba(227,79,38,0.35)",
    gradStart: "rgba(227,79,38,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  CSS: {
    base: "#1572B6",
    shadow: "rgba(21,114,182,0.45)",
    border: "rgba(21,114,182,0.35)",
    gradStart: "rgba(21,114,182,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
  JavaScript: {
    base: "#F7DF1E",
    shadow: "rgba(247,223,30,0.45)",
    border: "rgba(247,223,30,0.35)",
    gradStart: "rgba(247,223,30,0.20)",
    gradEnd: "rgba(20,19,49,0.85)",
  },
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const slides = ["/PhotoBackground1.jpg", "/Foto_Background2.jpeg"];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (id !== 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [id, slides.length]);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "hsu@jsmastery.pro";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <>
      <div
        className={cn(
          "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
          id === 1 ? "duration-500 ease-out" : "duration-200",
          className
        )}
        style={
          id === 1
            ? undefined
            : {
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }
        }
      >
        <div className={`${id === 6 && "flex justify-center"} h-full`}>
          <div className="w-full h-full absolute">
            {id !== 1 && img && (
              <img
                src={img}
                alt={img}
                className={cn(imgClassName, "object-cover object-center ")}
              />
            )}
            {id === 1 && (
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div
                  className="flex h-full"
                  style={{
                    width: `${slides.length * 100}%`,
                    transform: `translateX(-${slideIndex * 100}%)`,
                    transition: "transform 800ms ease-out",
                  }}
                >
                  {slides.map((src, idx) => (
                    <div
                      key={src + idx}
                      className="relative w-full h-full flex-shrink-0"
                    >
                      <Image
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#04091d]/80 via-transparent to-transparent" />
              </div>
            )}
          </div>
          <div
            className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}
          >
            {spareImg && (
              <img
                src={spareImg}
                alt={spareImg}
                className="object-cover object-center w-full h-full"
              />
            )}
          </div>
          {id === 6 && (
            <BackgroundGradientAnimation>
              <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
            </BackgroundGradientAnimation>
          )}

          <div
            className={cn(
              titleClassName,
              "group-hover/bento:translate-x-2 transition relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
              id === 1 ? "duration-500 ease-out" : "duration-200"
            )}
          >
            <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
              {description}
            </div>
            <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
              {title}
            </div>

            {id === 2 && <GridGlobe />}

            {id === 3 && (
              <div className="w-full mt-4 overflow-hidden">
                <div className="flex items-center gap-4 md:gap-6 animate-marquee min-w-max">
                  {[...skillCards, ...skillCards].map((skill, i) => {
                    const Icon = skill.icon;
                    const styleCfg = skillStyles[skill.label] || {
                      base: "#d1d5db",
                      shadow: "rgba(112,141,129,0.45)",
                      border: "rgba(112,141,129,0.35)",
                      gradStart: "rgba(112,141,129,0.20)",
                      gradEnd: "rgba(20,19,49,0.85)",
                    };
                    return (
                      <div
                        key={skill.label + i}
                        className={cn(
                          "bg-[#14134145] text-center w-28 h-28 sm:w-32 sm:h-32 rounded-2xl flex flex-col items-center justify-center",
                          "shadow-lg transition hover:scale-105 shrink-0 border border-transparent",
                          "hover:shadow-[var(--skill-shadow)]",
                          "hover:border-[var(--skill-border)]",
                          "hover:bg-[radial-gradient(circle_at_center,var(--skill-grad-start),var(--skill-grad-end))]"
                        )}
                        style={
                          {
                            "--skill-shadow": `0 0 24px ${styleCfg.shadow}`,
                            "--skill-border": styleCfg.border,
                            "--skill-grad-start": styleCfg.gradStart,
                            "--skill-grad-end": styleCfg.gradEnd,
                          } as React.CSSProperties
                        }
                      >
                        <Icon
                          className="text-4xl sm:text-5xl"
                          style={{ color: styleCfg.base }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {id === 6 && (
              <div className="mt-5 relative">
                <div
                  className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"}`}
                >
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>

                <MagicButton
                  title={copied ? "Email is Copied!" : "Copy my email address"}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-[#161A31]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .animate-marquee > * {
          flex: 0 0 auto;
        }
      `}</style>
    </>
  );
};
