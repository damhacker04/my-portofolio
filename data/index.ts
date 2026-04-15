export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "💡 Tech enthusiast with a passion for continuous learning and problem-solving.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full opacity-50",
    titleClassName: "justify-end",
    img: "/Foto_Background3.jpeg",
    spareImg: "",
  },
  {
    id: 2,
    title: "⚙️ Open to remote freelance work and international internship opportunities. Adaptable across time zones.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "🏗️ Passionate about structured systems, currently exploring AI integrations and advanced architectures",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "🚀 Currently building an integrated Web and Mobile Platform",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Currently building a Web and Mobile Platform",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Tripaw - AI Trip Planner",
    des: "An AI-powered travel planning application that generates personalized itineraries based on user preferences and budget. Built and delivered end-to-end within a 48-hour hackathon sprint, covering frontend UI, REST API, and LLM-based recommendation engine.",
    img: "/landing-page-tripaw.png",
    iconLists: ["/next.svg", "/javascript.svg", "/ts.svg"],
    githubLink: "https://github.com/ghufronbagaskara/travel-itinerery-ai",
    liveUrl: "https://tripaw.ghufronbagas.dev/",
  },
  {
    id: 2,
    title: "TDR Seamless Transaction",
    des: "A full-featured Laravel 12 e-commerce platform with Midtrans Snap payment gateway, Telegram Bot API for real-time order notifications, Redis job queues for async processing, and Docker + Nginx containerization for production deployment.",
    img: "/landing-page-tdr.png",
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg"],
    githubLink: "https://github.com/SutaSS/TDR-Seamless-Transaction",
    liveUrl: "",
  },

  {
    id: 3,
    title: "Company Profile Web PT. Saritama Dharma Buana",
    des: "Developed a responsive company profile website using Next.js, implemented SEO-friendly pages, reusable UI components, and deployed to production. Delivered end-to-end from requirements gathering to deployment",
    img: "/saritama_web.png",
    iconLists: ["/next.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/saritama",
    liveUrl: "https://saritama.vercel.app/",
  },

  {
    id: 4,
    title: "Klinik Sehat Selalu",
    des: "Served as System Analyst for a full-featured clinic management platform. Architected the relational database schema for patient records, designed appointment scheduling workflows, and defined system requirements for the UI and backend integration. Built with Next.js and TypeScript with a focus on streamlining daily clinic operations.",
    img: "/klinik_web.png",
    iconLists: ["/next.svg", "/javascript.svg", "/ts.svg"], // Sesuaikan jika menggunakan Next.js atau stack lain
    githubLink: "https://github.com/damhacker04/klinik-sehat-selalu",
    liveUrl: "https://klinik-sehat-selalu.vercel.app",
  },
  {
    id: 5,
    title: "RumahAman",
    des: "Served as System Analyst and Back-End contributor for an Android application helping victims of violence find appropriate support services. Architected the Firestore database schema covering users, tips, recommendations, and notification collections. Integrated a real-time AI chat assistant powered by Groq API (Llama 3.3 70B) with response times under 2 seconds, and defined the multi-step recommendation engine logic matching victims to legal, psychological, and medical services.",
    img: "/RumahAman.png",
    iconLists: ["/kotlin.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/PAPB-Rumah-Aman",
    liveUrl: "",
  },
  {
    id: 6,
    title: "Trajectoria",
    des: "Served as System Analyst for a cross-platform mobile application built with Flutter, designed to help young people discover and develop their potential through digital competitions, interactive learning modules, and AI-powered automated insights. Responsible for defining system architecture, user flow diagrams, and feature specifications across Android and iOS platforms.",
    img: "/Trajectory.png",
    iconLists: ["/flutter.svg", "/dart.svg", "/html.svg"],
    githubLink: "https://github.com/damhacker04/trajectoria",
    liveUrl: "",
  },
  {
    id: 7,
    title: "SolarQuiz",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/solar3d_web.png",
    iconLists: ["/html.svg", "/css.svg", "/three.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/project-akhir-komputer-grafis",
    liveUrl: "https://project-akhir-komputer-grafis.vercel.app/",
  },

];

export const workExperience = [
  {
    id: 1,
    title: "Full-Stack Engineer & System Analyst | Maxy Academy - Back End Bootcamp",
    desc: "",
    descList: [
      "Completed 2 intensive hackathons, delivering AI Trip Planner (Full-Stack) and TDR Seamless Transaction (System Analyst) under tight time constraints.",
      "Applied end-to-end development and system architecture skills across both frontend and backend layers.",
    ],
    className: "md:col-span-2",
    thumbnail: "/m-logo.png",
    startMonth: "Feb",
    startYear: 2026,
    endMonth: "Present",
  },
  {
    id: 2,
    title: "Head of Website Development & Information Systems | UKM Seni Religi - Brawijaya University",
    desc: "",
    descList: [
      "Led full-cycle development of the organization's web platform for 100+ active members, covering VPS setup and object storage infrastructure.",
      "Architected the core database schema as Lead Back-End Developer, coordinating a cross-functional team of 3 (frontend dev, UI/UX designer).",
    ],
    className: "md:col-span-2",
    thumbnail: "/logo_sr.png",
    startMonth: "Jan",
    startYear: 2026,
    endMonth: "Present",
  },
  {
    id: 3,
    title: "IT Development at PT. Saritama Dharma Buana",
    desc: "",
    descList: [
      "Built and deployed a 7-page company profile website (saritama.vercel.app) as sole developer, covering 3 service categories: Pest, Rodent & Termite Control.",
      "Implemented mobile-first responsive design with SEO optimization, WhatsApp CTA, FAQ accordion, project gallery, and a dedicated 5-year warranty section.",
    ],
    className: "md:col-span-2",
    thumbnail: "/saritama_logo_experience.png",
    startMonth: "Dec",
    startYear: 2025,
    endMonth: "Present",
  },

  {
    id: 4,
    title: "Participant of Software Engineering Event by Telkom University Purwokerto",
    desc: "Building Trajectoria a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential.",
    className: "md:col-span-2",
    thumbnail: "/logo_telkom_purwokerto.png",
    startMonth: "Nov",
    startYear: 2025,
    endMonth: "Dec",
    endYear: 2025,
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/damhacker04",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://instagram.com/damdam_rafano",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/kaesar-adam-rafano-b02b141b8",
  },
];
