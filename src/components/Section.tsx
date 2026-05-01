import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({ id, children, className = '', title, subtitle }: SectionProps) {
  return (
    <section id={id} className={`py-40 px-6 max-w-7xl mx-auto ${className}`}>
      {title && (
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/60 font-sans">{subtitle || id}</span>
            <h2 className="text-5xl md:text-7xl italic">{title}</h2>
          </motion.div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
