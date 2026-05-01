import { Project, Experience } from './types';

export const HERO_TEXT = {
  title: "LAEBA FIRDOUS.",
  subtitle: "I like to turn my creative ideas into reality through crafting digital experiences that leave a lasting impression in the hearts and minds of users."
};

export const ABOUT_ME_PARTS = [
  "I’m Laeba Firdous — a developer who blends logic with creativity.",
  "While most see code as instructions, I see it as a language to craft experiences.",
  "I build full-stack applications that don’t just work — they feel intuitive.",
  "With a strong grip on Next.js, React, Node.js, and Supabase, I turn ideas into fast, functional, and beautifully minimal products.",
  "My recent obsession? Designing tools that simplify life — like AI-powered portfolios, smart CRMs, and sleek SaaS dashboards."
];

export const ABOUT_IMAGES = [
  "https://picsum.photos/seed/p1/800/1000",
  "https://picsum.photos/seed/p2/800/1000",
  "https://picsum.photos/seed/p3/800/1000",
  "https://picsum.photos/seed/p4/800/1000",
  "https://picsum.photos/seed/p5/800/1000",
  "https://picsum.photos/seed/p6/800/1000",
];

export const SKILLS = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
];

export const CONTACT_DETAILS = {
  email: "laeba2704@gmail.com",
};

export const SOCIAL_LINKS = {
  twitter: "https://x.com/laebaaa",
  github: "https://github.com/laeba27",
  linkedin: "https://www.linkedin.com/in/laeba-firdous27/",
  instagram: "#"
};

export const APP_CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=600&q=80',
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Meeting Scheduler',
    category: 'Full-Stack App',
    description: 'A web platform for users to log in, schedule meetings, and manage URLs, timings, and calendars. Built with Next.js, Firebase & Shadcn.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80',
    color: 'bg-[#F4F1EA]',
    link: 'https://meeting-schedule-nu.vercel.app/',
  },
  {
    id: '2',
    title: 'Picture Mind',
    category: 'AI Application',
    description: 'An innovative AI-powered image generation app that utilizes the Together AI API to create stunning visuals from user prompts.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80',
    color: 'bg-ink',
    link: 'https://ai-image-generator-phi-seven.vercel.app/',
  },
  {
    id: '3',
    title: 'UiForge',
    category: 'Developer Tool',
    description: 'A collaborative platform featuring a vast collection of open-source UI components. Tailored for designers and developers.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80',
    color: 'bg-pastel-clay',
    link: 'https://uiforge-one.vercel.app/',
  },
  {
    id: '4',
    title: 'Smile Returns ERP',
    category: 'Enterprise Software',
    description: 'A UK-based dental clinic ERP system offering end-to-end operations, patient bookings, and multi-role access. Built with Supabase.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80',
    color: 'bg-[#fafafa]',
    link: 'https://hospital.smilereturn.com',
  },
  {
    id: '5',
    title: 'GraspIt Platform',
    category: 'Web Platform',
    description: 'A modern service provider enquiry platform featuring a highly animated Web3Forms-based contact form using Framer Motion.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80',
    color: 'bg-[#F4F1EA]',
    link: 'https://www.gograspit.in/',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Full-Stack Developer',
    company: 'Independent / Freelance',
    period: '2023 — Present',
    description: 'Designing and building scalable digital products, spanning AI image generators, enterprise ERP systems, and modern SaaS dashbords with Next.js and Supabase.',
  },
  {
    id: '2',
    role: 'Frontend Engineer',
    company: 'Open Source',
    period: '2022 — 2023',
    description: 'Contributed to the developer community by building UI platforms like UiForge, exploring the depths of React, Tailwind CSS, and Framer Motion for fluid experiences.',
  },
  {
    id: '3',
    role: 'Web Developer',
    company: 'Creative Journey',
    period: '2021 — 2022',
    description: 'Focused on responsive design, crafting solid foundations in modern web technologies, and turning ideas into fast, functional, and minimal products.',
  },
];
