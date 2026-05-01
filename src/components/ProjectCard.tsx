import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col gap-6"
    >
      <div className={`aspect-[4/5] rounded-[24px] overflow-hidden ${project.color} border border-black/5 shadow-sm`}>
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      
      <div className="flex justify-between items-start px-2">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink opacity-60 font-sans mb-1 block">
            {project.category}
          </span>
          <h3 className="text-2xl">{project.title}</h3>
          <p className="font-serif italic text-sm mt-2 max-w-[250px] leading-relaxed opacity-70">
            {project.description}
          </p>
        </div>
        
        <motion.div 
          whileHover={{ rotate: 45, scale: 1.1 }}
          className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors"
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>

      <a href={project.link} className="absolute inset-0 z-10">
        <span className="sr-only">View project</span>
      </a>
    </motion.div>
  );
}
