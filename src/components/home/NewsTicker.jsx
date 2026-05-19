import { Newspaper } from "lucide-react";

const NEWS_ITEMS = [
  "MISTAS Annual Reunion 2025 — Registration Now Open",
  "Scholarship Applications for MIST Students Close 15 June 2025",
  "New Chapter Launched in Toronto, Canada — Join Your Local Network",
  "MISTAS Career Fair 2025 — 60+ Companies Participating",
  "Congratulations to Brig. Gen. Nasir Ahmed on His Promotion",
  "MIST Ranked #1 Among Military Technical Institutes in Bangladesh 2025",
  "Alumni Mentorship Programme Accepting New Mentors — Apply Now",
  "MISTAS Constitution Amendment Vote — Members Please Participate",
];

export default function NewsTicker() {
  const doubled = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <div className="bg-forest-950 border-b border-white/5 flex items-stretch overflow-hidden h-10">
      {/* Label badge */}
      <div className="flex items-center gap-2 px-4 bg-forest-700 shrink-0 z-10">
        <Newspaper size={11} className="text-white" />
        <span className="font-mono text-[9px] font-bold tracking-[0.25em] uppercase text-white whitespace-nowrap">
          Latest News
        </span>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/10 shrink-0" />

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-forest-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-forest-950 to-transparent z-10 pointer-events-none" />

        <div className="ticker-track flex items-center h-full whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-sans text-xs text-white/70 hover:text-white transition-colors cursor-default px-2">
                {item}
              </span>
              <span className="text-forest-600 mx-3 text-xs select-none">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
