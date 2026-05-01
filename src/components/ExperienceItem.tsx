import { motion } from 'motion/react';
import { Experience } from '../types';

interface ExperienceItemProps {
  key?: string | number;
  experience: Experience;
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="group border-b border-ink/5 py-12 flex flex-col md:flex-row justify-between gap-8 md:gap-20">
      <div className="flex-1">
        <h3 className="text-2xl italic mb-2 group-hover:pl-4 transition-all duration-300">
          {experience.role}
        </h3>
        <p className="font-sans text-sm opacity-60 uppercase tracking-widest">{experience.company}</p>
      </div>
      
      <div className="flex-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink opacity-40 mb-4">
          {experience.period}
        </p>
        <p className="font-serif text-lg leading-relaxed opacity-70">
          {experience.description}
        </p>
      </div>
    </div>
  );
}
