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
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
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
    title: "NgantinYUK!",
    des: "NgantinYUK is a web and mobile application designed to make food ordering easier within the campus canteen environment.",
    img: "/NgantinYUK.png",
    iconLists: ["/laravel.svg", "/php.svg","/re.svg", "/tail.svg", "/javascript.svg", "/ts.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "Adamflix",
    des: "Adamflix is a Laravel-based movie streaming platform with a full catalog, ratings, and playback that respects plan resolution (720p/1080p/4K) and device limits. Subscriptions are integrated with Midtrans, device access is enforced automatically, and the modern UI features “New Added/Trending” carousels plus search and categories.",
    img: "/Adamflix.svg",
    // Tech stack: Laravel, PHP, HTML, Tailwind CSS, JavaScript (pastikan ikon tersedia di /public).
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg", "/html.svg", "/css.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "AdamFood",
    des: "AdamFood is a digital ordering system that lets you pick your favorite dishes, add them to your cart, and pay right at the table using QRIS or cash—then just relax while your food is prepared.",
    img: "/Adamfood.png",
    iconLists: ["/laravel.svg", "/php.svg", "/tail.svg", "/javascript.svg", "/html.svg", "/css.svg"],
    link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "SolarQuiz",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/3DSolarSystem(1).svg",
    iconLists: ["/html.svg", "/css.svg", "/three.svg", "/javascript.svg"],
    link: "https://project-akhir-komputer-grafis.vercel.app/",
  },
  {
    id: 5,
    title: "Trajectoria",
    des: "Trajectoria is a mobile app that combines digital competitions, interactive learning, and automated insights to help young people discover and grow their potential.",
    img: "/Trajectory.png",
    iconLists: ["/flutter.svg", "/dart.svg", "/html.svg", ],
    link: "https://project-akhir-komputer-grafis.vercel.app/",
  },
  {
    id: 6,
    title: "RumahAman",
    des: "Rumah Aman is an Android-based application developed to help prevent and address sexual violence through digital solutions.",
    img: "/RumahAman.png",
    iconLists: ["/kotlin.svg", "/javascript.svg"],
    link: "https://project-akhir-komputer-grafis.vercel.app/",
  },
];


export const workExperience = [
  {
    id: 1,
    title: "Event Staff HOLOGY 7.0 FILKOM 2024  ",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/Hology.jpg",
    startMonth: "Mar",
    startYear: 2024,
    endMonth: "Nov",
    endYear: 2024,
  },
  {
    id: 2,
    title: "Backend of NgantinYUK Web Project ",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/NgantinYUKLogo3.png",
    startMonth: "Mar",
    startYear: 2024,
    endMonth: "Apr",
    endYear: "2024",
  },
  {
    id: 3,
    title: "Co-Head of Fahmil Qur'an UKM Seni Religi",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/SR.jpg",
    startMonth: "Feb",
    startYear: 2025,
    endMonth: "Dec",
    endYear: 2025,
  },
  {
    id: 4,
    title: "System Analyst of Klinik Sehat Selalu Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
    startMonth: "Aug",
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
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
