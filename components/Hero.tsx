"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { BsDownload } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const roles = ["Full Stack Developer", "System Analyst"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/kaesar-adam-cv.pdf";                // sesuaikan nama file di public/
    link.download = "Kaesar-Adam-CV.pdf"; // nama file saat tersimpan
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    const finishedTyping = !isDeleting && displayText === current;
    const finishedDeleting = isDeleting && displayText === "";

    const timeout = setTimeout(() => {
      if (finishedTyping) {
        setIsDeleting(true);
        return;
      }
      if (finishedDeleting) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      const nextText = isDeleting
        ? current.slice(0, displayText.length - 1)
        : current.slice(0, displayText.length + 1);
      setDisplayText(nextText);
    }, finishedTyping ? 1500 : isDeleting ? 40 : 90);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
     <div className="pb-20 pt-36">
      {/* Background & spotlights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]">
          <div className="absolute inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        <Spotlight className="top-0 left-0 h-[120vh] w-[120vw]" fill="white" />
        <Spotlight className="top-10 left-1/3 h-[110vh] w-[110vw]" fill="purple" />
        <Spotlight className="top-24 left-1/4 h-[110vh] w-[110vw]" fill="blue" />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/PhotoProfile.jpg"
              alt="Profile photo"
              width={150}
              height={150}
              className="rounded-full border-8 border-[#0c0c48aa] shadow-xl object-cover"
              priority
            />
          </motion.div>

          <motion.p
            className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            Welcome to my Portfolio
          </motion.p>

          <TextGenerateEffect
            words=" Hi! My Name is Kaesar Adam Rafano"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            highlightRange={[5, 7]} // Kaesar Adam Rafano
          />

          <motion.div
            className="font-normal text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            <span className="text-purple">a</span>
            <span className="text-purple">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
            <span className="text-purple">Enthusiast</span>
            <span className="dark:text-white text-black">
              from Brawijaya University
            </span>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a href="">
            </a>
            <MagicButton
              title="Download My CV"
              icon={<BsDownload />}
              position="left"
              handleClick={downloadCV}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
