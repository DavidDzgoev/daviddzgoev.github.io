import { Fragment, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Layout, sizes, shadows and assets follow the Figma frame "ddzgoev CV" (see DESIGN.md).
// "**text**" in the strings below is rendered in medium weight, like the key technologies in the design.
const rich = (text: string): ReactNode =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? <strong key={i} className="cv-strong">{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );

type Logo = { src: string; fit?: string };

type Experience = {
  title: string;
  team: string;
  company: string;
  companyNote: string;
  logo: Logo;
  from: string;
  to?: string;
  city: string;
  country: string;
  bullets: { lead?: string; text: string }[];
  achievements?: string;
};

const experiences: Experience[] = [
  {
    title: "Senior Python Backend Developer",
    team: "Carbon footprint & integrations",
    company: "Makersite",
    companyNote: "Product lifecycle intelligence and carbon-footprint platform for manufacturers",
    logo: { src: "./logos/makersite.svg" },
    from: "10/2025",
    city: "Berlin",
    country: "Germany",
    bullets: [
      { lead: "Primary carbon data", text: "Built carbon footprint (**PCF**) calculations on suppliers' measured plant data instead of industry averages, as **Catena-X** and **PACT** require." },
      { lead: "Microsoft integration", text: "Led the compliance redesign of a legacy integration, coordinating with Microsoft's engineers." },
      { lead: "Post-acquisition integration", text: "Integrating **Mattermaps** (ex-Siemens SiGREEN) and **Siemens Teamcenter** into the platform." },
    ],
    achievements: "Refactored and tested an untested graph-traversal module on my own in my first weeks; the Microsoft integration passed the security audit.",
  },
  {
    title: "Python Backend Developer",
    team: "Amazon marketplace integration team",
    company: "Tradebyte (Zalando Group)",
    companyNote: "SaaS platform connecting hundreds of brands and millions of products to marketplaces",
    logo: { src: "./logos/tradebyte.png" },
    from: "06/2023",
    to: "10/2025",
    city: "Ansbach",
    country: "Germany",
    bullets: [
      { lead: "ASR Service", text: "Built an **AWS Lambda** service that loads 50k+ Amazon article updates a day into **DynamoDB**." },
      { lead: "EAN Lookup Service", text: "Built a marketplace article search by EAN with 99% data accuracy on **AWS ECS** and **SQS**." },
      { lead: "Error Pipeline Optimization", text: "Introduced **Kafka**-style sticky partitioning: worst-case processing of millions of weekly errors fell from a week to a day." },
    ],
    achievements: "Owned features end to end with no analyst on a team of five: from a raw client problem to post-release.",
  },
  {
    title: "Python Backend Developer",
    team: "Billing integration team",
    company: "Zvuk (Sber Group)",
    companyNote: "Fastest-growing music and content streaming platform in Russia",
    logo: { src: "./logos/zvuk.png" },
    from: "08/2022",
    to: "05/2023",
    city: "Moscow",
    country: "Russia",
    bullets: [
      { lead: "Splitting legacy code", text: "Split the billing monolith into **microservices**, so new partner integrations became easy." },
      { lead: "BFF service", text: "Built a Backend for Frontend on **FastAPI**, **GraphQL** and **Pydantic**." },
    ],
    achievements: "Raised **unit test** coverage to 90% and built integration tests with the QA team.",
  },
  {
    title: "Junior Backend Developer",
    team: "K2 Cloud (ex Croc Cloud)",
    company: "Croc",
    companyNote: "The biggest B2B cloud platform in Russia, compatible with AWS",
    // the Figma tile shows the green square zoomed in to its letters
    logo: { src: "./logos/croc.png", fit: "absolute left-[-31%] top-[-30%] w-[162%] max-w-none" },
    from: "10/2021",
    to: "08/2022",
    city: "Moscow",
    country: "Russia",
    bullets: [
      { lead: "Compatibility", text: "Kept the cloud's API compatible with the AWS schema." },
      { lead: "API", text: "Built APIs with **Boto** for K2 Cloud services." },
    ],
    achievements: "Built a maintenance mode that keeps customers' virtual machines running.",
  },
  {
    title: "Digital Consultant",
    team: "Digital consulting team",
    company: "Forvis Mazars",
    companyNote: "Global leader in audit, tax, and advisory services",
    // the Figma tile crops the wordmark to its first letter "m"
    logo: { src: "./logos/mazars.png", fit: "absolute left-[1%] top-[23%] h-[58%] w-[367%] max-w-none" },
    from: "02/2021",
    to: "10/2021",
    city: "Moscow",
    country: "Russia",
    bullets: [
      { lead: "IT Consulting", text: "Automated business processes for SOCAR, Pernod Ricard and internal projects." },
      { lead: "Telecom merger analysis", text: "Cut the coverage analysis of 1.1M cell towers from ~2 days to ~2 hours with a sort-and-sweep algorithm." },
    ],
    achievements: "Launched a web-development direction: methodology, **CI/CD** templates and two client apps. Promoted after six months.",
  },
  {
    title: "Intern, Financial Control",
    team: "Finance control",
    company: "Renault",
    companyNote: "Automotive manufacturer",
    logo: { src: "./logos/renault.png" },
    from: "10/2020",
    to: "02/2021",
    city: "Moscow",
    country: "Russia",
    bullets: [
      { text: "Built a **Microsoft Teams** bot for routine finance-control questions; reviewed payment terms in contracts." },
    ],
  },
];

const projects = [
  { name: "AnotherJudoRating.com", href: "https://www.anotherjudorating.com", role: "Founder", text: "Glicko-2 rating of every IJF contest since 2004 (228k contests); predicts winners better than the official IJF ranking (69.4% vs 64.3%)." },
  { name: "Water vending network", href: undefined, role: "Co-owner since 2022", text: "13 machines in Moscow; pricing and promotions driven by sales analytics I built." },
  { name: "judobase", href: "https://github.com/anotherjudorating/judobase", role: "Open source, on PyPI", text: "Async Python client for the Judobase API." },
];

const softSkills = [
  "Strong problem-solving and decision-making skills",
  "Smooth collaboration with cross-functional teams",
  "Effective communication at all organizational levels internally and externally",
  "Defined focus on business impact of technology",
  "Adapting swiftly to new technologies and methods",
];

const techSkills = [
  "Python", "FastAPI", "Django", "Asyncio", "Docker", "CI/CD", "MySQL", "MongoDB", "SQLAlchemy",
  "Kubernetes", "PostgreSQL", "AWS", "Kafka", "Grafana", "Prometheus", "Git", "Pytest", "GraphQL",
];

// Logo size and opacity per university, as in the Figma frame (share of the 54 px circle: 80%, 66%, 80%)
const education = [
  { period: "2022 - 2023", title: "Master's studies | Higher School of Economics", note: "System Programming with ISP RAS (not completed)", logo: "./logos/hse.png", logoSize: "w-[26px] h-[26px]", logoOpacity: 0.9 },
  { period: "2020 - 2022", title: "Bachelor's degree | Financial University", note: "Applied Mathematics and Computer Science: data analysis in economics and finance", logo: "./logos/financial-university.png", logoSize: "w-[21px] h-[21px]", logoOpacity: 1 },
  { period: "2018 - 2020", title: "Bachelor's studies | Moscow State University", note: "Fundamental Mathematics (transferred)", logo: "./logos/msu.png", logoSize: "w-[26px] h-[26px]", logoOpacity: 0.8 },
];

const languages = [
  { flag: "🇬🇧", name: "English", level: "Fluent" },
  { flag: "🇷🇺", name: "Russian", level: "Native" },
  { flag: "🇩🇪", name: "German", level: "A2" },
  { flag: "🇫🇷", name: "French", level: "Beginner" },
];

const contacts = [
  { emoji: "📫", text: "ddzgoev@gmail.com", href: "mailto:ddzgoev@gmail.com" },
  { emoji: "📞", text: "+33640897948", href: "tel:+33640897948" },
  { emoji: "🏠", text: "Berlin, Germany", href: undefined },
];

const socials = [
  { icon: "./social/linkedin.png", name: "LinkedIn", text: "ddzgoev", href: "https://www.linkedin.com/in/ddzgoev" },
  { icon: "./social/github.png", name: "GitHub", text: "DavidDzgoev", href: "https://github.com/DavidDzgoev" },
  { icon: "./social/telegram.png", name: "Telegram", text: "ddzgoev", href: "https://t.me/ddzgoev" },
];

// City silhouettes from OpenStreetMap administrative boundaries: thin appendages removed, simplified,
// smoothed and fitted to a 60 x 60 box (DESIGN.md, "Assets")
const cityOutlines: Record<string, string> = {
  Berlin: "M5.0 45.0L5.7 45.4L6.8 45.5L8.2 45.3L10.0 44.8L12.1 44.0L13.8 43.6L15.1 43.4L16.0 43.4L16.5 43.8L17.2 44.1L18.2 44.2L19.5 44.3L21.1 44.3L22.6 44.4L23.8 44.7L24.9 45.3L25.9 46.0L27.0 46.3L28.3 46.1L29.7 45.5L31.3 44.5L32.6 43.9L33.7 43.7L34.5 44.0L35.1 44.8L36.0 45.4L37.4 45.9L39.2 46.2L41.3 46.4L43.3 46.7L45.1 47.1L46.7 47.7L48.2 48.3L49.6 48.6L50.9 48.4L52.3 47.9L53.5 46.9L54.6 46.0L55.3 45.1L55.8 44.3L56.0 43.5L55.9 42.6L55.5 41.5L54.8 40.2L53.8 38.7L52.7 37.6L51.4 36.8L50.0 36.3L48.5 36.2L47.4 35.7L46.9 34.9L46.9 33.7L47.3 32.1L47.6 30.7L47.8 29.6L47.7 28.6L47.4 27.9L46.9 26.9L46.0 25.7L44.8 24.3L43.2 22.6L41.9 21.3L40.7 20.4L39.6 19.8L38.7 19.5L38.1 19.0L37.6 18.0L37.4 16.7L37.4 15.1L37.3 13.8L37.0 12.7L36.5 12.0L35.9 11.5L34.8 11.4L33.2 11.7L31.1 12.3L28.6 13.4L26.2 14.1L24.2 14.4L22.4 14.5L20.8 14.2L19.3 14.1L17.8 14.1L16.3 14.2L14.9 14.6L13.9 15.1L13.2 15.9L12.8 16.8L12.9 18.0L12.6 18.9L12.0 19.6L11.2 19.9L10.1 19.9L9.0 20.3L8.1 21.1L7.3 22.3L6.5 23.9L6.2 25.4L6.2 26.7L6.7 27.9L7.5 29.0L7.8 30.2L7.7 31.5L7.0 32.8L5.8 34.2L4.9 35.8L4.3 37.5L4.0 39.4L4.0 41.4L4.2 43.0L4.5 44.2Z",
  Ansbach: "M6.4 30.4L5.3 31.1L4.6 31.7L4.1 32.3L4.0 32.9L4.2 33.5L4.6 33.9L5.3 34.2L6.3 34.3L7.5 34.3L8.5 34.5L9.3 35.1L9.8 35.9L10.1 37.0L10.7 37.9L11.4 38.6L12.3 39.0L13.4 39.2L14.3 39.5L15.1 40.0L15.8 40.6L16.3 41.3L17.1 41.8L18.1 41.9L19.4 41.8L21.0 41.4L22.5 41.1L24.1 41.1L25.6 41.3L27.2 41.7L28.5 42.2L29.5 42.8L30.2 43.4L30.7 44.1L31.4 44.7L32.3 45.1L33.4 45.5L34.7 45.7L35.8 46.1L36.6 46.5L37.2 47.0L37.6 47.5L38.3 48.0L39.2 48.3L40.5 48.5L42.0 48.6L43.3 48.8L44.2 49.1L44.8 49.6L45.2 50.2L45.7 50.8L46.5 51.2L47.4 51.5L48.6 51.7L49.5 51.8L50.4 51.7L51.0 51.4L51.4 51.1L51.9 50.3L52.3 49.3L52.6 47.8L53.0 46.1L53.0 44.6L52.6 43.3L51.9 42.2L50.7 41.4L49.7 40.3L48.6 39.0L47.7 37.3L46.7 35.4L46.3 33.8L46.4 32.5L47.1 31.6L48.3 30.9L49.3 30.1L50.1 29.1L50.7 27.9L51.1 26.5L51.6 25.3L52.1 24.5L52.8 23.8L53.6 23.5L54.3 22.9L54.9 22.1L55.4 21.2L55.9 20.1L56.0 19.0L55.7 18.0L55.1 17.1L54.2 16.3L52.6 15.4L50.6 14.6L47.9 13.7L44.7 12.9L42.1 12.0L40.2 11.1L39.0 10.2L38.4 9.2L37.7 8.5L37.0 8.2L36.2 8.3L35.3 8.7L34.3 9.0L33.2 9.1L31.9 9.1L30.5 9.0L29.0 9.4L27.4 10.3L25.7 11.7L23.9 13.7L22.2 15.0L20.6 15.7L19.1 15.6L17.7 15.0L16.2 14.6L14.7 14.4L13.1 14.6L11.4 15.0L10.1 15.6L9.3 16.4L8.7 17.3L8.6 18.4L8.8 19.4L9.3 20.3L10.1 21.1L11.2 21.8L12.2 22.7L12.9 23.8L13.6 25.1L14.0 26.6L14.0 27.9L13.6 29.0L12.8 29.8L11.6 30.4L10.6 30.7L9.8 30.8L9.1 30.6L8.7 30.1L8.1 29.9L7.3 30.0Z",
  Moscow: "M9.4 30.9L10.5 35.1L11.8 38.8L13.2 42.1L14.8 45.0L16.5 47.4L18.2 49.6L19.9 51.5L21.6 53.0L23.3 54.2L25.1 55.1L27.1 55.7L29.1 56.0L31.4 56.0L33.3 55.8L34.9 55.5L36.3 55.1L37.4 54.6L38.7 53.7L40.4 52.3L42.3 50.6L44.5 48.4L46.3 46.4L47.4 44.5L48.1 42.8L48.3 41.1L48.6 39.6L49.1 38.2L49.8 36.9L50.7 35.7L51.2 34.5L51.3 33.3L51.1 32.0L50.4 30.7L49.8 29.0L49.4 26.8L49.0 24.1L48.8 21.0L47.9 18.0L46.3 15.1L44.2 12.4L41.3 9.8L38.5 7.7L35.8 6.1L33.1 4.9L30.5 4.2L27.5 4.0L24.4 4.4L20.9 5.4L17.2 6.9L14.1 9.0L11.8 11.7L10.1 15.0L9.1 18.9L8.7 22.9L8.7 26.9Z",
};

// Figma section heading ("Union"): one shape, a 26 px tab with the lowercase title joined to a 12 px bar
// along its bottom, with the design's two inner shadows. Drawn as a single SVG so there is no seam.
const TAB_H = 26;
const BAR_H = 12;
const R = 6;

const headingPath = (tab: number, width: number) => {
  const r = BAR_H / 2;
  return [
    `M${R} 0H${tab - R}A${R} ${R} 0 0 1 ${tab} ${R}V${TAB_H - BAR_H}`,
    `H${width - r}A${r} ${r} 0 0 1 ${width - r} ${TAB_H}`,
    `H${R}A${R} ${R} 0 0 1 0 ${TAB_H - R}V${R}A${R} ${R} 0 0 1 ${R} 0Z`,
  ].join("");
};

const SectionHeading = ({ title }: { title: string }) => {
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLHeadingElement>(null);
  const [size, setSize] = useState({ tab: 0, width: 0 });
  const filterId = useId().replace(/:/g, "");
  useLayoutEffect(() => {
    const measure = () => setSize({ tab: label.current?.offsetWidth ?? 0, width: box.current?.offsetWidth ?? 0 });
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) observer.observe(box.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={box} className="relative mb-4" style={{ height: TAB_H }}>
      {size.width > 0 && (
        <svg className="absolute inset-0" width={size.width} height={TAB_H} aria-hidden="true">
          <defs>
            <filter id={filterId} x="-2%" y="-40%" width="104%" height="180%">
              <feOffset in="SourceAlpha" dx="5" dy="5" />
              <feGaussianBlur stdDeviation="5" result="dark" />
              <feComposite in="SourceAlpha" in2="dark" operator="arithmetic" k2="1" k3="-1" result="darkEdge" />
              <feFlood floodColor="#213739" />
              <feComposite in2="darkEdge" operator="in" result="darkShadow" />
              <feOffset in="SourceAlpha" dx="-5" dy="-5" />
              <feGaussianBlur stdDeviation="5" result="light" />
              <feComposite in="SourceAlpha" in2="light" operator="arithmetic" k2="1" k3="-1" result="lightEdge" />
              <feFlood floodColor="#326469" floodOpacity="0.5" />
              <feComposite in2="lightEdge" operator="in" result="lightShadow" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="darkShadow" />
                <feMergeNode in="lightShadow" />
              </feMerge>
            </filter>
          </defs>
          <path d={headingPath(size.tab, size.width)} fill="var(--cv-teal)" filter={`url(#${filterId})`} />
        </svg>
      )}
      <h2 ref={label} className="relative inline-block px-3 sm:px-4 text-[19px] sm:text-[21px] font-normal leading-[26px] lowercase text-[color:var(--cv-bg)]">
        {title}
      </h2>
    </div>
  );
};

const Section = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
  <section className={className}>
    <SectionHeading title={title} />
    {children}
  </section>
);

// 36 px raised tile with a 6 px radius: company logos, the calendar and the city outline
const Tile = ({ children, label, className = "" }: { children: ReactNode; label?: string; className?: string }) => (
  <span className={`cv-raised-sm relative w-9 h-9 shrink-0 rounded-[6px] flex items-center justify-center overflow-hidden ${className}`} role={label ? "img" : undefined} aria-label={label}>
    {children}
  </span>
);

const CityOutline = ({ city }: { city: string }) => (
  <Tile label={`${city} city outline`}>
    <svg viewBox="0 0 60 60" className="w-[29px] h-[29px]" aria-hidden="true">
      <path d={cityOutlines[city]} fill="var(--cv-teal)" fillOpacity="0.8" />
    </svg>
  </Tile>
);

const VISIBLE_JOBS = 2; // the two latest jobs are always shown, earlier ones appear on "show earlier positions"

const ExperienceCard = ({ exp, order = 0 }: { exp: Experience; order?: number }) => (
  <article className="cv-raised-lg rounded-[6px] p-4 sm:px-5 sm:py-4" style={{ "--item-delay": `${order * 110}ms` } as CSSProperties}>
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center min-w-0">
        <div className="sm:w-[245px] shrink-0">
          <h3 className="text-[15px] font-normal leading-tight">{exp.title}</h3>
          <p className="text-[12px] text-[color:var(--cv-muted)]">{exp.team}</p>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <Tile>
            <span className="relative w-[29px] h-[29px] rounded-[5px] overflow-hidden">
              <img src={exp.logo.src} alt={`${exp.company} logo`} className={exp.logo.fit ?? "w-full h-full object-contain"} style={{ opacity: 0.8 }} loading="lazy" />
            </span>
          </Tile>
          <div className="min-w-0">
            <p className="text-[15px] font-normal leading-tight">{exp.company}</p>
            <p className="text-[12px] text-[color:var(--cv-muted)]">{exp.companyNote}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-6 sm:gap-8 text-[15px]">
        <div className="flex items-center gap-2.5">
          <Tile className="text-[20px]"><span aria-hidden="true">🗓️</span></Tile>
          <p className="leading-tight whitespace-nowrap">
            from {exp.from}
            {exp.to && <><br />to&nbsp;&nbsp;&nbsp;&nbsp;{exp.to}</>}
          </p>
        </div>
        <div className="flex items-center gap-2.5 sm:w-[150px]">
          <CityOutline city={exp.city} />
          <p className="leading-tight">{exp.city},<br />{exp.country}</p>
        </div>
      </div>
    </div>

    <ul className="mt-3 space-y-2.5 sm:space-y-1.5 list-disc pl-5 text-[15px] leading-normal sm:leading-snug">
      {exp.bullets.map((b, i) => (
        <li key={i}>
          {b.lead && <span className="cv-strong">{b.lead}: </span>}
          {rich(b.text)}
        </li>
      ))}
    </ul>
    {exp.achievements && (
      <p className="mt-3 sm:mt-2 text-[15px] leading-normal sm:leading-snug">
        <span className="cv-link font-normal">Achievements:</span> {rich(exp.achievements)}
      </p>
    )}
  </article>
);

const ExperienceList = () => {
  const [showAll, setShowAll] = useState(false);
  // the earlier cards stay mounted so the list can roll open; their shadows are clipped only while it moves
  const [settled, setSettled] = useState(false);
  const earlier = useRef<HTMLDivElement>(null);
  const hidden = experiences.length - VISIBLE_JOBS;
  useEffect(() => {
    if (earlier.current) earlier.current.inert = !showAll;
  }, [showAll]);
  const toggle = () => {
    setSettled(false);
    setShowAll((v) => !v);
  };
  return (
    <div>
      <div className="space-y-5">
        {experiences.slice(0, VISIBLE_JOBS).map((exp, i) => <ExperienceCard key={exp.company} exp={exp} order={i} />)}
      </div>
      <div
        id="earlier-positions"
        ref={earlier}
        className={`cv-expand grid ${showAll ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        onTransitionEnd={(e) => e.target === e.currentTarget && showAll && setSettled(true)}
      >
        <div className={`min-h-0 -mx-4 px-4 ${settled ? "overflow-visible" : "overflow-hidden"}`}>
          <div className={`space-y-5 pt-5 pb-1 ${showAll ? "cv-replay" : ""}`}>
            {experiences.slice(VISIBLE_JOBS).map((exp, i) => <ExperienceCard key={exp.company} exp={exp} order={i + 1} />)}
          </div>
        </div>
      </div>
      {hidden > 0 && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={showAll}
          aria-controls="earlier-positions"
          className="cv-raised mx-auto mt-5 block rounded-full px-5 py-1.5 text-[15px] font-normal hover:text-[color:var(--cv-teal)]"
        >
          {showAll ? "hide earlier positions ▴" : `show ${hidden} earlier positions ▾`}
        </button>
      )}
    </div>
  );
};

const Index = () => (
  <div className="cv-ground min-h-screen px-3 py-4 sm:p-6">
    <main className="cv-raised-lg mx-auto max-w-[1180px] rounded-[24px] p-4 sm:p-7 space-y-9 sm:space-y-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 flex-1 min-w-0">
          <div className="cv-raised-lg rounded-full p-1 shrink-0">
            <img src="./photo.png" alt="David Dzgoev" className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover" />
          </div>
          <div className="flex flex-col gap-4 min-w-0 w-full items-center sm:items-start">
            <h1 className="cv-raised-lg rounded-[22px] px-6 py-2.5 text-[28px] sm:text-[30px] font-normal leading-tight">David Dzgoev</h1>
            <p className="cv-raised rounded-[22px] px-6 py-2.5 text-[16px] sm:text-[21px] font-light leading-snug text-center sm:text-left lg:min-w-[560px]">
              Senior Backend engineer<br className="sm:hidden" /> on the business–tech boundary
              {/* on a phone the stack line would push the tagline to four lines; it is repeated in tech skills */}
              <span className="hidden sm:inline">
                <br />
                Python · Integrations · Digital transformation
              </span>
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 sm:gap-x-6 gap-y-3">
              {socials.map(({ icon, name, text, href }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={`${name}: ${text}`} className="flex items-center gap-3 group">
                  <span className="cv-raised-sm w-11 h-11 sm:w-[30px] sm:h-[30px] rounded-full flex items-center justify-center">
                    <img src={icon} alt="" className="w-10 h-10 sm:w-7 sm:h-7 rounded-full opacity-80 group-hover:opacity-100" />
                  </span>
                  <span className="cv-raised rounded-full px-4 py-1 text-[17px] cv-link hidden sm:inline">{text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-3 items-center sm:items-start lg:w-[290px] shrink-0">
          {contacts.map(({ emoji, text, href }) => (
            <li key={text} className="flex items-center gap-3">
              <span className="cv-raised-sm w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center text-[17px]" aria-hidden="true">{emoji}</span>
              {href ? (
                <a href={href} className="cv-raised-lg rounded-full px-5 py-1.5 text-[16px] sm:text-[18px] break-all">{text}</a>
              ) : (
                <span className="cv-raised-lg rounded-full px-5 py-1.5 text-[16px] sm:text-[18px]">{text}</span>
              )}
            </li>
          ))}
        </ul>
      </header>

      <Section title="summary">
        <p className="text-[15px] leading-normal sm:text-justify">
          6+ years building backend systems at Tradebyte (Zalando), Zvuk (Sber) and now Makersite, where I compute product carbon footprints and
          connect manufacturers' systems such as Microsoft, Siemens and Catena-X. I own features from a raw client problem to production and like
          finding the real requirement behind legacy constraints.
        </p>
      </Section>

      <Section title="experience">
        <ExperienceList />
      </Section>

      <Section title="pet projects">
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.name} className="cv-raised rounded-[6px] p-4">
              <h3 className="text-[15px] font-normal leading-tight">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="cv-link hover:text-[color:var(--cv-teal)]">
                    {p.name} ↗
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              <p className="text-[12px] text-[color:var(--cv-muted)] mb-1.5">{p.role}</p>
              <p className="text-[15px] leading-snug">{p.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,864fr)_minmax(0,896fr)]">
        <Section title="soft skills">
          <ul className="cv-raised rounded-[6px] p-4 pl-9 list-disc space-y-0.5 text-[15px]">
            {softSkills.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Section>
        <Section title="tech skills">
          <div className="cv-inset rounded-[22px] p-3 flex flex-wrap gap-3">
            {techSkills.map((s) => (
              <span key={s} className="cv-raised-sm rounded-full px-4 py-1 text-[15px] font-normal">{s}</span>
            ))}
          </div>
        </Section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1040fr)_minmax(0,560fr)]">
        <Section title="education">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.title} className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <span className="cv-raised rounded-full px-4 py-1.5 text-[15px] font-normal w-fit shrink-0">{e.period}</span>
                <div className="cv-raised rounded-full px-3 py-2 flex items-center gap-3 min-w-0 flex-1">
                  <span className="cv-raised-sm w-8 h-8 shrink-0 rounded-full flex items-center justify-center">
                    <img src={e.logo} alt="" className={`${e.logoSize} object-contain`} style={{ opacity: e.logoOpacity }} loading="lazy" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-normal leading-tight">{e.title}</p>
                    <p className="text-[12px] text-[color:var(--cv-muted)] leading-snug">{e.note}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="languages">
          <ul className="grid grid-cols-2 gap-4">
            {languages.map((l) => (
              <li key={l.name} className="cv-raised rounded-full px-4 py-2 flex items-center gap-3">
                <span className="text-[20px]" aria-hidden="true">{l.flag}</span>
                <span className="leading-tight">
                  <span className="block text-[15px] font-normal">{l.name}</span>
                  <span className="block text-[12px] text-[color:var(--cv-muted)]">{l.level}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
    <p className="mx-auto max-w-[1180px] mt-4 px-2 text-xs text-[color:var(--cv-muted)]">
      City outlines: ©{" "}
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="cv-link">OpenStreetMap contributors</a>.
      Company and university logos belong to their owners.
    </p>
  </div>
);

export default Index;
