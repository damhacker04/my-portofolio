"use client";
import React, { useState, ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setMobileMenuOpen(false);

    // Small delay to let menu close animation complete before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (window.location.hash !== href) {
        history.replaceState(null, "", href);
      }
    }, 150);
  };

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
          setMobileMenuOpen(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed z-[5000] top-10 inset-x-0 mx-auto px-6 py-4 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center",
          // Desktop: horizontal layout, Mobile: column layout
          "max-w-fit md:min-w-[70vw] lg:min-w-fit",
          "flex-col md:flex-row",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {/* Mobile: hamburger button + brand row */}
        <div className="flex items-center justify-between w-full md:hidden">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>

        {/* Mobile: collapsible nav links */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 overflow-hidden w-full pt-4 md:hidden"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  onClick={(e) => handleNavClick(e, navItem.link)}
                  className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 py-2 w-full justify-center border-b border-white/[0.08] last:border-b-0"
                >
                  <span className="text-sm !cursor-pointer">{navItem.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: horizontal nav links */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={(e) => handleNavClick(e, navItem.link)}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
