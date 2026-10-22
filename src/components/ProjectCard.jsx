import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "./Logo.jsx";

function BrowserFrame({ project }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_24px_50px_-28px_rgba(11,11,20,0.45)] outline-1 -outline-offset-1 outline-fog">
      <div className="flex items-center gap-3 border-b border-fog bg-white px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-fog" />
          <span className="size-2.5 rounded-full bg-fog" />
          <span className="size-2.5 rounded-full bg-fog" />
        </span>
        <span className="flex-1 truncate rounded-md bg-cloud px-3 py-1 text-center font-mono text-[11px] text-ash">{project.domain}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <img
          src={project.desktop}
          alt={`Homepage of ${project.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function MiniPhone({ src, alt, className = "" }) {
  return (
    <div className={`rounded-[26px] bg-coal p-[5px] shadow-[0_24px_50px_-14px_rgba(11,11,20,0.55)] ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[21px] bg-ink-900">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        <span className="absolute top-[6px] left-1/2 h-[10px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-brand uppercase outline-1 -outline-offset-1 outline-fog">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }) {
  if (project.social) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[26px] bg-cloud p-5 transition-colors hover:bg-[#ececf2] sm:flex-row sm:items-center md:p-7"
      >
        <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(109,59,255,0.22),transparent)]" />
        <MiniPhone
          src={project.social}
          alt={`Instagram profile of ${project.name}`}
          className="relative mx-auto w-[150px] shrink-0 transition-transform duration-700 ease-out-expo group-hover:-rotate-2 sm:mx-0 md:w-[168px]"
        />
        <div className="relative flex flex-1 flex-col gap-3">
          <Tag>
            <InstagramIcon className="size-3.5" />
            {project.category}
          </Tag>
          <h3 className="text-[22px] leading-[1.15] font-medium tracking-[-0.02em] text-coal md:text-[26px]">{project.name}</h3>
          <p className="text-[15px] leading-[1.55] text-slate">{project.description}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="rounded-full bg-brand px-2.5 py-1 text-[12px] font-semibold text-white">{project.stat}</span>
            <span className="inline-flex items-center gap-1 text-[14px] font-medium text-coal">
              {project.domain}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[26px] bg-cloud p-4 transition-colors hover:bg-[#ececf2] md:p-6"
    >
      <div className="relative pr-8 pb-6 md:pr-12 md:pb-8">
        <BrowserFrame project={project} />
        <MiniPhone
          src={project.mobile}
          alt={`Mobile view of ${project.name}`}
          className="absolute right-0 bottom-0 w-[22%] min-w-[78px] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        />
      </div>
      <div className="relative flex flex-col gap-2.5 px-1 pb-1">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[22px] leading-[1.15] font-medium tracking-[-0.02em] text-coal md:text-[26px]">{project.name}</h3>
          <Tag>{project.category}</Tag>
        </div>
        <p className="text-[15px] leading-[1.55] text-slate">{project.description}</p>
        <span className="mt-1 inline-flex w-fit items-center gap-1 text-[14px] font-medium text-coal">
          Visit {project.domain}
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
