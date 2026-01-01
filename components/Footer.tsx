import { FaLocationArrow } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Want to build clean, impactful <span className="text-purple">digital</span> products?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          I&apos;m open to internships, project collaborations, and discussions.
        </p>
        <a href="mailto:adamemier16@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Kaesar Adam Rafano
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              {info.id === 2 ? (
                <FaInstagram className="text-white" size={20} />
              ) : (
                <img src={info.img} alt="icons" width={20} height={20} />
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
