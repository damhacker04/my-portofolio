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
    title: "⚙️ Highly adaptable and flexible with time zone communications.",
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
    title: "Klinik Sehat Selalu",
    des: "Analyzed system requirements and developed a comprehensive clinic management platform. Designed a structured database for patient records, implemented secure appointment scheduling features, and built an intuitive user interface to streamline daily clinic operations.",
    img: "/klinik_web.png", 
    iconLists: ["/next.svg", "/javascript.svg", "/ts.svg"], // Sesuaikan jika menggunakan Next.js atau stack lain
    githubLink: "https://github.com/damhacker04/klinik-sehat-selalu", 
    liveUrl: "https://klinik-sehat-selalu.vercel.app", 
  },
  {
    id: 2,
    title: "Company Profile Web PT. Saritama Dharma Buana",
    des: "Developed a responsive company profile website using Next.js, implemented SEO-friendly pages, reusable UI components, and deployed to production. Delivered end-to-end from requirements gathering to deployment (solo project)",
    img: "/saritama_web.png",
    iconLists: ["/next.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/saritama",
    liveUrl: "https://saritama.vercel.app/",
  },
  {
    id: 3,
    title: "RumahAman",
    des: "Rumah Aman is an Android-based application developed to help prevent and address sexual violence through digital solutions.",
    img: "/RumahAman.png",
    iconLists: ["/kotlin.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/PAPB-Rumah-Aman",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Trajectoria",
    des: "Trajectoria is a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential.",
    img: "/Trajectory.png",
    iconLists: ["/flutter.svg", "/dart.svg", "/html.svg"],
    githubLink: "https://github.com/damhacker04/trajectoria",
    liveUrl: "",
  },
  {
    id: 5,
    title: "SolarQuiz",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/solar3d_web.png",
    iconLists: ["/html.svg", "/css.svg", "/three.svg", "/javascript.svg"],
    githubLink: "https://github.com/damhacker04/project-akhir-komputer-grafis",
    liveUrl: "https://project-akhir-komputer-grafis.vercel.app/",
  },
  {
    id: 6,
    title: "AdamFood",
    des: "AdamFood is a digital ordering system that lets you pick your favorite dishes, add them to your cart, and pay right at the table using QRIS or cash\u2014then just relax while your food is prepared.",
    img: "/Adamfood.png",
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg", "/html.svg", "/css.svg"],
    githubLink: "https://github.com/damhacker04/adamfood",
    liveUrl: "",
  },


  
];

export const workExperience = [
  {
    id: 1,
    title: "IT Development at PT. Saritama Dharma Buana",
    desc: "Developed a responsive company profile website using Next.js, implemented SEO-friendly pages, reusable UI components, and deployed to production. Delivered end-to-end from requirements gathering to deployment (solo project).",
    className: "md:col-span-2",
    thumbnail: "/saritama_logo_experience.png",
    startMonth: "Jan",
    startYear: 2026,
    endMonth: "Now",
  },
  {
    id: 2,
    title: "Head of Website Management and Information System",
    desc: "Managing and Maintaining the UKM Seni Religi Brawijaya University Website",
    className: "md:col-span-2",
    thumbnail: "/SR.jpg",
    startMonth: "Jan",
    startYear: 2026,
    endMonth: "Now",
  },
  {
    id: 3,
    title: "Participant of Software Engineering Event by Telkom University Purwokerto",
    desc: "Building Trajectoria a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential.",
    className: "md:col-span-2",
    thumbnail: "/sevent_logo.png",
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
