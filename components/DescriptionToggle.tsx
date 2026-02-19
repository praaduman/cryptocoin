
'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DescriptionToggle({ name, html }: { name: string; html: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/40">
        About {name}
      </h4>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn(
          "text-sm leading-relaxed text-white/70 [&_a]:text-violet-400 [&_a]:underline",
          expanded ? "block" : "line-clamp-3"
        )}
      />
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
      >
        {expanded ? 'Show less ↑' : 'Read more ↓'}
      </button>
    </div>
  );
}