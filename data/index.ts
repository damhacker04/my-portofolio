import { link } from "fs";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I value collaboration and clear communication",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full opacity-50",
    titleClassName: "justify-end",
    img: "/Foto_Background3.jpeg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
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
    title: " Seni Religi's Website ",
    des: "Built authentication and item borrowing modules using NextAuth, designed PostgreSQL database schema, developed REST APIs for CRUD operations, implemented role-based access control (admin and user) and ensured data integrity through relational constraints and validation.",
    img: "/SR_experience.jpg",
    iconLists: ["/next.svg", "/javascript.svg"],
    link: " Ongoing Project ",
  },
  {
    id: 2,
    title: " Company Profile Web for PT. Saritama Dharma Buana ",
    des: "Developed a responsive company profile website using Next.js, implemented SEO-friendly pages, reusable UI components, and deployed to production. Delivered end-to-end from requirements gathering to deployment (solo project)",
    img: "/saritama_logo.png",
    iconLists: ["/next.svg", "/javascript.svg"],
    link: " Ongoing Project ",
  },
  {
    id: 3,
    title: "RumahAman",
    des: "Rumah Aman is an Android-based application developed to help prevent and address sexual violence through digital solutions.",
    img: "/RumahAman.png",
    iconLists: ["/kotlin.svg", "/javascript.svg"],
    link: "https://github.com/damhacker04/PAPB-Rumah-Aman",
  },
  {
    id: 4,
    title: "Trajectoria",
    des: "Trajectoria is a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential.",
    img: "/Trajectory.png",
    iconLists: ["/flutter.svg", "/dart.svg", "/html.svg", ],
    link: "https://github.com/damhacker04/trajectoria",
  },
  {
    id: 5,
    title: "SolarQuiz",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/3DSolarSystem(1).svg",
    iconLists: ["/html.svg", "/css.svg", "/three.svg", "/javascript.svg"],
    link: "https://project-akhir-komputer-grafis.vercel.app/",
  },
  {
    id: 6,
    title: "AdamFood",
    des: "AdamFood is a digital ordering system that lets you pick your favorite dishes, add them to your cart, and pay right at the table using QRIS or cash—then just relax while your food is prepared.",
    img: "/Adamfood.png",
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg", "/html.svg", "/css.svg"],
    link: "https://github.com/damhacker04/adamfood",
  },
  {
    id: 7,
    title: "Adamflix",
    des: "Adamflix is a Laravel-based movie streaming platform with a full catalog, ratings, and playback that respects plan resolution (720p/1080p/4K) and device limits. Subscriptions are integrated with Midtrans, device access is enforced automatically, and the modern UI features “New Added/Trending” carousels plus search and categories.",
    img: "/Adamflix.svg",
    // Tech stack: Laravel, PHP, HTML, Tailwind CSS, JavaScript (pastikan ikon tersedia di /public).
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg", "/html.svg", "/css.svg"],
    link: "https://github.com/damhacker04/adamflix",
  },
  {
    id: 8,
    title: "NgantinYUK!",
    des: "NgantinYUK is a web and mobile application designed to make food ordering easier within the campus canteen environment.",
    img: "/NgantinYUK.png",
    iconLists: ["/laravel.svg", "/php.svg","/re.svg", "/tail.svg", "/javascript.svg", "/ts.svg"],
    link: "https://github.com/damhacker04/NgantinYUK",
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
    title: "Particapant of Software Engineering Event by Telkom University Purwokerto",
    desc: "Building Trajectoria a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential. ",
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
