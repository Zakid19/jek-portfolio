import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Hospital Management System",
    short:
      "Role-based hospital management platform handling patients, inpatient care, room assignment, and reporting — with a live monitoring dashboard.",
    longDescription:
      "An end-to-end hospital operations suite built with Laravel and Blade. Includes role-based access for admins, doctors, and nurses, modular patient and room workflows, and a dashboard for monitoring ward occupancy and operational information.",
    tech: ["Laravel", "Blade", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-1.png",
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoQAAgAA4BaJbACdLoAApv8w+hAAOvmC1+aa/Jpczu+LPHK0FXDAxr9b0L7dT8kMbMrgtn+LR/8y78HAAA=",
    href: "https://github.com/Zakid19/Sm-Hospital",
    repo: "https://github.com/Zakid19/Sm-Hospital",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2024",
    highlights: [
      "Role-based access (admin / doctor / nurse)",
      "Ward and occupancy dashboard",
      "Modular patient and room workflows",
    ],
  },

  {
    id: "p2",
    title: "NFT Generator System",
    short:
      "Fullstack NFT collection generator with automated image compositing, JSON metadata generation, and a web preview interface.",
    longDescription:
      "An NFT generation system that creates image collections automatically using combinations of uploaded image layers. The application supports random generation, image export, JSON metadata generation, and rarity configuration.",
    tech: ["Next.js", "Express.js", "Node.js"],
    image: "/assets/images/project-2.png",
    blurDataURL:
      "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoQAAgAA4BaJaVnyAGIAAD+8HQIGGlCydJXQkeullAAAA==",
    href: "https://github.com/Zakid19/generator-system-NFT",
    repo: "https://github.com/Zakid19/generator-system-NFT",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2024",
    highlights: [
      "Upload and manage NFT image layers",
      "Random NFT image generation",
      "Image export and JSON metadata generation",
      "Layer rarity configuration",
    ],
    featured: true,
    caseStudyContent: {
      overview: {
        background:
          "The project was developed to help NFT creators and digital artists generate collections from combinations of image layers.",
        targetUsers: ["NFT Creators", "Digital Artists", "Web3 Enthusiasts"],
      },
      solution: {
        description:
          "A web-based generator that combines image layers to produce NFT image variations and corresponding metadata.",
        features: [
          {
            title: "Layer Upload",
            description:
              "Allows users to upload image layers such as backgrounds, characters, and accessories.",
          },
          {
            title: "Random Generation",
            description:
              "Combines uploaded layers automatically to generate NFT image variations.",
          },
          {
            title: "Image Export",
            description: "Exports generated NFT images as files.",
          },
          {
            title: "JSON Metadata",
            description:
              "Generates JSON metadata for the resulting NFT collection.",
          },
          {
            title: "Rarity Configuration",
            description:
              "Allows users to configure the occurrence probability of individual layers.",
          },
        ],
      },
    },
  },

  {
    id: "p3",
    title: "Parodee — Crypto Landing",
    short:
      "Modern landing page for a cryptocurrency project with a responsive layout, interactive calls to action, and lightweight motion.",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    image: "/assets/images/project-3.png",
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwAgCdASoQAAoAA4BaJQBOj+ADAEOz+scwAAD+7StUosQXT2W+TKt5Ex+ySbyaskwNGLAuP388fg1a/miBUWwO1MOxuUslhuVTsUlYgcl1kEFBNvGQrOCxyB2tbQGKAAA=",
    href: "https://parodee.fun/",
    demo: "https://parodee.fun/",
    role: "Frontend Developer",
    status: "Live",
    type: "Landing Page",
    year: "2024",
    featured: true,
  },

  {
    id: "p4",
    title: "PT Anak Bungsu Indo Energi",
    short:
      "Corporate profile website with a Laravel CMS and React-based admin panel for content management.",
    tech: ["Laravel", "React", "MySQL", "Tailwind CSS"],
    image: "/assets/images/project-4.jpeg",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoQAAkAA4BaJaACdH8AFnfkrc6FAADNk6pO2BzLiRqr64k+8Q1ty5SbGKH6PfHUYZOJ1LlmOonFxc8pgDogFfaTyqsBnr/HRdJo/fruRGE7wCprAAA=",
    href: "http://www.abienergi.com/",
    demo: "http://www.abienergi.com/",
    role: "Fullstack Developer",
    status: "Live",
    type: "CMS",
    year: "2023",
  },

  {
    id: "p5",
    title: "Lorehype Agency",
    short:
      "Interactive agency website with Firebase authentication and an integrated content management system.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    image: "/assets/images/project-5.png",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAkAA4BaJZwAAsdBbIJ0AAD+4eyXO4CvbVaw1Hylki3P1SAnHq+3i1ZhmtN0QADxoEwg8IwZN2SNmMf2DQB51GI22SA0HBDCgAAA",
    href: "https://lorehype.com/",
    demo: "https://lorehype.com/",
    role: "Fullstack Developer",
    status: "Live",
    type: "Web App",
    year: "2024",

    caseStudyContent: {
      overview: {
        background:
          "An interactive agency profile website developed to present agency information and provide visitors and clients with access to its digital presence.",
        targetUsers: ["Agency Team", "Clients", "Website Visitors"],
      },
      solution: {
        description:
          "A responsive agency website integrated with Firebase authentication and a dynamic content management system.",
        features: [
          {
            title: "Admin Authentication",
            description:
              "Uses Firebase Authentication to secure administrator access to content management functionality.",
          },
          {
            title: "Dynamic Content Management",
            description:
              "Allows administrators to add, update, and delete website content dynamically.",
          },
          {
            title: "Responsive Interface",
            description:
              "Provides a modern interface designed to adapt to different device screen sizes.",
          },
          {
            title: "Firebase Realtime Database",
            description:
              "Connects website content to Firebase so changes can be reflected dynamically on the website.",
          },
        ],
      },
    },
  },

  {
    id: "p6",
    title: "Kalisloka — Export Landing",
    short:
      "Modern landing page for an export company, focused on company storytelling, product showcases, and clear calls to action.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-6.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACwAQCdASoQAAcAA4BaJZQAAu0eDYEoAP7tCdjXhuFqRrM301XGrHt0z+YJQzfMxQD6WYAA",
    href: "https://www.kalisloka.com/",
    demo: "https://www.kalisloka.com/",
    role: "Frontend Developer",
    status: "Live",
    type: "Landing Page",
    year: "2024",
  },

  {
    id: "p7",
    title: "Fingerprint Attendance Simulator",
    short:
      "Laravel 11 school attendance management system with fingerprint ID mapping, attendance simulation, and reporting.",
    longDescription:
      "A web-based school attendance management system built with Laravel 11. The project includes student, teacher, and class management, fingerprint ID registration, attendance processing through a simulator API, and attendance reporting. Testing was performed using a simulated fingerprint scanning flow and Postman. The system was not directly connected to a physical fingerprint device.",
    tech: ["Laravel 11", "Blade", "MySQL", "REST API"],
    image: "/assets/images/project-7.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACQAQCdASoQAAcAA4BaJZwAApKugoAA/oo5j51KfmdTYO3L/dxAr/t/Z3D34tHdCZxiH9QsBrHAAA==",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "Fingerprint ID registration and student mapping",
      "Simulated fingerprint attendance API",
      "Attendance check-in and check-out records",
      "Daily and monthly attendance reports",
      "Attendance data export",
    ],
    featured: true,
    caseStudyContent: {
      overview: {
        background:
          "The project was developed as a web-based attendance management solution for schools.",
        targetUsers: ["School Administrators", "Teachers"],
      },
      solution: {
        description:
          "A Laravel-based application that manages student attendance records and processes simulated fingerprint scan data.",
        features: [
          {
            title: "Student and Class Management",
            description:
              "Manages student records, class information, and related attendance data.",
          },
          {
            title: "Fingerprint ID Mapping",
            description:
              "Maps a registered fingerprint ID to the corresponding student record.",
          },
          {
            title: "Attendance Simulation",
            description:
              "Uses a simulated fingerprint scanning flow and API testing through Postman.",
          },
          {
            title: "Attendance Reports",
            description:
              "Provides daily and monthly attendance recaps and export functionality.",
          },
        ],
      },
    },
  },

  {
    id: "p8",
    title: "Smart Workshop Booking & Chatbot",
    short:
      "Laravel 11 booking and queue management platform for automotive workshops, with rule-based wait-time estimation and chatbot functionality.",
    longDescription:
      "A workshop booking and queue management system designed to organize customer appointments and service queues. The application includes wait-time estimation based on service duration, queue length, and mechanic availability. A rule-based chatbot provides access to booking, queue, and schedule information without requiring machine learning.",
    tech: ["Laravel 11", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-8.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAQAgCdASoQAAcAA4BaJZACdAEf/qnmyfAAAP5tJLobcWbFP037kG1bGDxLqKtPXw/7EAAA",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "Online workshop service booking",
      "Rule-based wait-time estimation",
      "Queue monitoring",
      "Command-based chatbot",
      "MVC and Service Layer architecture",
    ],
    featured: true,
  },

  {
    id: "p9",
    title: "Barbershop Booking System",
    short:
      "Web-based booking platform for barbershops, designed to organize customer appointments and simplify booking management.",
    longDescription:
      "A barbershop booking application designed to replace fragmented booking processes through WhatsApp and direct messages. The system focuses on appointment scheduling and an interface suitable for both customers and administrators.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-9.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoQAAcAA4BaJZQCdAEO9p5AAP3GSnNVUE9mIr5iuIN4fXfkGi9FsgASxefklQtL5ThXMTmAAAA=",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
  },

  {
    id: "p10",
    title: "Crypto Landing Page",
    short:
      "Modern cryptocurrency landing page with responsive layouts, interactive calls to action, and lightweight motion.",
    tech: ["React", "Tailwind CSS"],
    image: "/assets/images/project-10.png",
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoQAAcAA4BaJaACdAEO+xazAAD+o398gej5a+yOe58dG3X4u7EcZPDsQ5gK81NpEOtyYAAA",
    href: "#",
    role: "Frontend Developer",
    status: "Completed",
    type: "Landing Page",
    year: "2024",
    caseStudyContent: {
      overview: {
        background:
          "A landing page developed to present a cryptocurrency project through professional visual communication and structured project information.",
        targetUsers: ["Website Visitors", "Investors", "Crypto Community"],
      },
      solution: {
        description:
          "A modern and responsive cryptocurrency landing page designed to communicate project information and guide visitors toward relevant actions.",
        features: [
          {
            title: "Responsive Design",
            description:
              "Provides an optimized website layout for mobile and desktop devices.",
          },
          {
            title: "Roadmap and Tokenomics",
            description:
              "Presents project development stages and token structure in an organized format.",
          },
          {
            title: "Interactive Calls to Action",
            description:
              "Provides Join, Buy, and Contact actions to guide visitors toward relevant next steps.",
          },
          {
            title: "Lightweight Animations",
            description:
              "Uses lightweight animations to improve the user experience without distracting from the website content.",
          },
        ],
      },
    },
  },

  {
    id: "p11",
    title: "Smart Stock Prediction for SMBs",
    short:
      "Laravel 11 Decision Support System helping small businesses forecast inventory needs using the Moving Average method.",
    longDescription:
      "A Decision Support System for small businesses that combines product and sales management, historical sales analysis, and inventory forecasting using the Moving Average method. The application also includes a rule-based chatbot, stock validation, reports, data visualization, and role-based access for administrators and staff.",
    tech: ["Laravel 11", "Tailwind CSS", "MySQL"],
    image: "/assets/images/project-11.png",
    blurDataURL:
      "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoQAAcAA4BaJZwAAudM1z3wAPw+RZ65Z2DV5kuV5kNg07VlIAA=",
    href: "#",
    role: "Fullstack Developer",
    status: "Completed",
    type: "Web App",
    year: "2025",
    highlights: [
      "Moving Average inventory forecasting",
      "Rule-based chatbot",
      "Stock validation",
      "Role-based access (Admin / Staff)",
      "Reports and data visualization",
    ],
    featured: true,
  },
];

/** Used by the Hero component to render a smooth LQIP while the avatar loads. */
export const AVATAR_BLUR =
  "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoQABAAA4BaJagCdAEfbhGqNgAA/vaqviv7cxW4ghYdLwzbeob344JRoyGH+Ix58l6zDMV0wyaVrRimAAA=";
