import { useEffect, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
function Icon({ className, viewBox = "0 0 24 24", children }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor"
      viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">{children}</svg>
  );
}
function EnvelopeIcon({ className }) {
  return <Icon className={className}><path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Zm1.55-.52 7.7 5.78a.75.75 0 0 0 .9 0l7.7-5.78A.75.75 0 0 0 19.5 6h-15a.75.75 0 0 0-.7.23Z" /></Icon>;
}
function GithubIcon({ className }) {
  return <Icon className={className} viewBox="0 0 24 24"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 0 1 6.4 8.4c-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2A4.7 4.7 0 0 1 20 11.6c0 4.7-2.9 5.7-5.6 6 .4.3.9 1 .9 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></Icon>;
}
function LinkedinIcon({ className }) {
  return <Icon className={className} viewBox="0 0 24 24"><path d="M4.98 3.5A1.75 1.75 0 1 0 5 7a1.75 1.75 0 0 0-.02-3.5ZM3.5 8.5h3V20h-3V8.5Zm5.5 0h2.88v1.57h.04c.4-.75 1.38-1.54 2.83-1.54 3.03 0 3.59 1.99 3.59 4.58V20h-3v-5.98c0-1.43-.03-3.27-1.99-3.27-2 0-2.31 1.56-2.31 3.17V20h-3V8.5Z" /></Icon>;
}
function PhoneIcon({ className }) {
  return <Icon className={className}><path d="M6.6 2.8c.4-.4 1-.6 1.6-.4l2.2.7c.7.2 1.1.9 1 1.6l-.3 2a1 1 0 0 1-.8.8l-1.2.3a11.3 11.3 0 0 0 6.2 6.2l.3-1.2a1 1 0 0 1 .8-.8l2-.3c.7-.1 1.4.3 1.6 1l.7 2.2c.2.6 0 1.2-.4 1.6l-1 1c-.9.9-2.2 1.3-3.5 1.1A17.4 17.4 0 0 1 5.5 7.3c-.2-1.3.2-2.6 1.1-3.5l1-1Z" /></Icon>;
}
function DownloadIcon({ className }) {
  return <Icon className={className}><path d="M12 3a.75.75 0 0 1 .75.75v8.44l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V3.75A.75.75 0 0 1 12 3ZM4 15.75A.75.75 0 0 1 4.75 15h14.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75Z" /></Icon>;
}
function ArrowIcon({ className }) {
  return <Icon className={className}><path d="M5 12a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H5.75A.75.75 0 0 1 5 12Z" /></Icon>;
}
function CloseIcon({ className }) {
  return <Icon className={className}><path d="M6.225 4.811a.75.75 0 0 0-1.06 1.06L10.94 12l-5.775 6.129a.75.75 0 1 0 1.06 1.06L12 13.06l5.775 6.13a.75.75 0 1 0 1.06-1.061L13.06 12l5.775-6.128a.75.75 0 0 0-1.06-1.061L12 10.939 6.225 4.811Z" /></Icon>;
}
function MenuIcon({ className }) {
  return <Icon className={className}><path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" /></Icon>;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const profile = {
  name: "Hemnath L E",
  shortTitle: "IT Student · Full Stack Developer · Open to Internships",
  // Sharp, specific tagline — answers "who are you and why should I care" in one sentence
  objective:
    "Final-year B.Tech IT student who has shipped a production Flutter dashboard, built a concurrent auction API with race-condition handling, and demoed a computer vision system at an SAP inter-college hackathon. Looking for a backend, full stack, or mobile team working on a product that real people use.",
  bio: [
    "I build things that work. In three years of college I have gone from learning Java syntax to designing layered Spring Boot APIs, building React + Redux frontends, delivering a cross-platform Flutter dashboard during a real internship, and writing computer vision pipelines under hackathon pressure. Every project on this portfolio runs — none of them are tutorials.",
    "What sets me apart is breadth with depth — I can pick up a backend ticket, a UI bug, or a mobile feature and ship it. I hold two NPTEL Elite certificates (IIT Madras, IIT Roorkee) and represented SKCT at an SAP inter-college hackathon. Right now I am grinding DSA and system design because I want to go from writing code that works to writing code that scales.",
  ],
  education: [
    { label: "College", value: "Sri Krishna College of Technology, Coimbatore" },
    { label: "Degree",  value: "B.Tech Information Technology (Final Year)" },
    { label: "School",  value: "Holy Cross Matric Hr. Sec. School, Salem" },
  ],
  locations: ["Coimbatore", "Salem"],
  email: "hemnath2182006@gmail.com",
  phone: "9342673477",
  github: "https://github.com/HemnathElangovan",
  githubLabel: "github.com/HemnathElangovan",
  linkedin: "https://www.linkedin.com/in/hemnath-elangovan-2614b2290/",
  linkedinLabel: "linkedin.com/in/hemnath-elangovan",
  resume: "/Hemnath_L_E_Resume.pdf",
  roles: ["Full Stack", "Backend", "Frontend"],
};

const timeline = [
  {
    year: "2021",
    label: "Class 12 — Maths & CS",
    place: "Holy Cross Matric Hr. Sec. School, Salem",
    detail: "Completed Class 12 with Maths and Computer Science. My CS teacher showed us a bubble sort implementation and asked us to optimise it — I couldn't sleep until I figured out why insertion sort was faster for nearly-sorted data. That was the moment I knew this was what I wanted to do.",
    color: "teal",
  },
  {
    year: "2022",
    label: "Joined B.Tech IT",
    place: "Sri Krishna College of Technology, Coimbatore",
    detail: "Started the IT program. In the first semester, built a Java console app for student record management — got it working, then kept going until it had input validation, error handling, and clean method separation. That refactoring loop — make it work, then make it right — became a habit I still follow.",
    color: "cyan",
  },
  {
    year: "2023",
    label: "IBM Certification — Python & Data",
    place: "IBM · Cognitive Class.ai",
    detail: "Completed Data Analysis with Python, earning a passing grade from IBM. First real encounter with pandas, NumPy, and data pipelines. This sparked the interest in computer vision projects that followed.",
    color: "teal",
  },
  {
    year: "2023",
    label: "Cybersecurity Awareness",
    place: "I4C · Ministry of Home Affairs",
    detail: "Completed the Hack-Proof Digital Nagrik quiz run by the Ministry of Home Affairs. Introduced to threat awareness, phishing patterns, and digital safety — foundational for building secure applications.",
    color: "teal",
  },
  {
    year: "2024",
    label: "NPTEL Elite — IIT Madras",
    place: "Industry 4.0 & IIoT · 60% Score",
    detail: "Earned an Elite badge in Industry 4.0 & Industrial IoT from IIT Madras — one of the top national online programmes. Studied smart manufacturing, IoT protocols, and cyber-physical systems. Only the top tier of scorers receive this badge.",
    color: "gold",
  },
  {
    year: "2024",
    label: "NPTEL Elite — IIT Roorkee",
    place: "Effective Writing · 61% Score",
    detail: "Second NPTEL Elite badge, this time in technical writing from IIT Roorkee. Strengthened ability to write clear documentation, READMEs, and technical specifications — a skill most developers undervalue.",
    color: "gold",
  },
  {
    year: "2024",
    label: "SAP Inter-college Hackathon",
    place: "Represented Sri Krishna College of Technology",
    detail: "Selected to represent SKCT at an SAP-organised inter-college hackathon. Under competition time pressure, built a working face detection and recognition system using DeepFace + OpenCV. Demonstrated, got feedback, and shipped — the full cycle in hours.",
    color: "red",
  },
  {
    year: "2025",
    label: "Software Development Intern",
    place: "Teckinta, Coimbatore",
    detail: "Joined Teckinta as a software intern. Built a cross-platform Flutter Admin Dashboard that the team adopted post-delivery. Contributed UI and flow improvements to a live dress shopping website — real users, real production, real accountability.",
    color: "cyan",
  },
  {
    year: "2026",
    label: "TCS iON YUVA AI Certified",
    place: "TCS iON · IndiaAI Mission",
    detail: "Completed the national YUVA AI For All programme by TCS iON under the IndiaAI Mission. Covered applied AI, responsible deployment, and emerging use cases — reinforcing the ML skills from earlier projects.",
    color: "teal",
  },
  {
    year: "Now",
    label: "Actively Seeking Internship",
    place: "Immediate joiner · Coimbatore / Remote",
    detail: "Final year. My projects work — now I want to understand why they scale or don't. Actively working through DSA and system design to close that gap. Looking for an internship where senior engineers will review my code and tell me when I'm wrong — that feedback loop is what college can't give me.",
    color: "pulse",
  },
];

const learning = [
  { name: "DSA & LeetCode",   progress: 60, color: "#a78bfa" },
  { name: "TypeScript",       progress: 52, color: "#00d4ff" },
  { name: "System Design",    progress: 38, color: "#00ffcc" },
  { name: "Docker & DevOps",  progress: 28, color: "#f59e0b" },
];

const experience = [
  {
    role: "Software Development Intern",
    company: "Teckinta",
    type: "Internship",
    duration: "2025 · ~2 months · Coimbatore",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs"],
    description:
      "Teckinta builds digital products for retail and operations clients. As the sole intern on two parallel workstreams, I had to pick up the codebase fast and deliver without hand-holding. I built a cross-platform Flutter Admin Dashboard from scratch — covering navigation, data panels, state management, and widget architecture. Simultaneously, I contributed UI and flow improvements to a live dress shopping website used by real customers: fixed product listing layout bugs, improved mobile responsiveness, and streamlined the checkout flow.",
    outcome: "Flutter dashboard delivered on schedule, reviewed by the senior dev, and merged into the main branch. Shopping site fixes pushed to production. Both shipped within the 2-month window.",
    whatILearned: "How to read someone else's codebase fast, ask the right questions, and ship without waiting for perfect information.",
  },
];

const certifications = [
  {
    title: "Introduction to Industry 4.0 & IIoT",
    issuer: "NPTEL — IIT Madras",
    year: "2024",
    badge: "Elite",
    score: "60%",
    why: "Top-tier national programme. Elite badge awarded only to highest-scoring learners.",
    link: "https://nptel.ac.in/",
  },
  {
    title: "Effective Writing",
    issuer: "NPTEL — IIT Roorkee",
    year: "2024",
    badge: "Elite",
    score: "61%",
    why: "Technical communication skills — writing READMEs, docs, and specs that engineers actually read.",
    link: "https://nptel.ac.in/",
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM · Cognitive Class.ai",
    year: "2023",
    badge: "Passing Grade",
    why: "IBM-issued credential. Foundation for the computer vision and ML work that followed.",
    link: "https://courses.cognitiveclass.ai/certificates/deffc5ac284347a1aebddad4e4de77e6",
  },
  {
    title: "YUVA AI For All",
    issuer: "TCS iON · IndiaAI Mission",
    year: "2026",
    badge: "Completion",
    why: "National AI literacy programme under the Government of India's IndiaAI Mission.",
    link: "https://www.tcsion.com/",
  },
  {
    title: "Hack-Proof Digital Nagrik",
    issuer: "I4C · Ministry of Home Affairs",
    year: "2023",
    badge: "Participation",
    why: "Cybersecurity awareness — understanding threats informs how I build secure backend systems.",
    link: "https://www.mygov.in/",
  },
];

const skills = [
  { name: "Java",         level: 85, color: "#f59e0b" },
  { name: "Spring Boot",  level: 80, color: "#86efac" },
  { name: "React",        level: 80, color: "#38bdf8" },
  { name: "MySQL",        level: 85, color: "#c4b5fd" },
  { name: "Flutter",      level: 75, color: "#67e8f9" },
  { name: "Python",       level: 72, color: "#a78bfa" },
  { name: "Git & GitHub", level: 90, color: "#fda4af" },
];

const toolsAndSoft = [
  "VS Code", "IntelliJ IDEA", "Postman", "Android Studio",
  "REST APIs", "OOP", "MVC / Layered Arch.", "Agile basics",
];

const projects = [
  {
    num: "01",
    title: "Online Auction System",
    type: "Backend API",
    impact: "Secure, concurrent bidding — the hard part most tutorials skip",
    desc: "A Spring Boot + MySQL REST API that handles the complete auction lifecycle: user registration, JWT-secured login, item listing with seller ownership, live competitive bidding, and auto-closure when an auction ends. The tricky engineering problem here was concurrency — multiple users bidding on the same item at the same millisecond. I solved this with optimistic locking at the JPA layer so the highest bid always wins cleanly, with no silent overwrites.",
    highlight: "Bid conflict resolution using optimistic locking — prevents race conditions when two users submit bids simultaneously. The losing bid gets a clear error response, not a silent failure.",
    tags: ["Spring Boot", "MySQL", "JPA", "REST API", "JWT", "Optimistic Locking"],
  },
  {
    num: "02",
    title: "Grocery Shop Application",
    type: "Frontend",
    impact: "Global state done properly — one store, no prop drilling, no sync bugs",
    desc: "A React + Redux grocery shopping app with dynamic product browsing, a persistent cart, quantity controls, and a checkout flow. The deliberate choice here was Redux over local state — I wanted to understand global state management properly, not just make it work. All cart operations (add, remove, quantity change) go through Redux actions, so the cart is consistent across every page, refresh included, without prop drilling anywhere.",
    highlight: "Zero prop drilling across the entire app. Redux store is the single source of truth — the cart component, the header badge, and the checkout page all read from the same slice with no sync bugs.",
    tags: ["React", "Redux", "CSS3", "Responsive Design"],
  },
  {
    num: "03",
    title: "Inventory Management System",
    type: "Full Stack",
    impact: "End-to-end system with a clean architecture you can actually extend",
    desc: "A full stack inventory system for tracking products, stock levels, entries, and movements. The emphasis was on architecture: strict separation between the React frontend, a Spring Boot REST API, and the MySQL data layer. Each layer only knows about its immediate neighbour. This makes it trivial to swap the frontend framework or add a new API endpoint without touching business logic. The entire codebase is on GitHub.",
    highlight: "Adding a new product category or report type requires touching exactly one layer — no cross-cutting changes, no fragile dependencies between UI and DB schema.",
    tags: ["React", "Spring Boot", "MySQL", "REST API", "Layered Architecture"],
    link: "https://github.com/HemnathElangovan/Inventory_Management_System_Complete_Project",
  },
  {
    num: "04",
    title: "Flutter Admin Dashboard",
    type: "Internship · Teckinta",
    impact: "Production deliverable — shipped, reviewed, and merged",
    desc: "Built at Teckinta during my internship. This was not a personal project with no deadline — the senior dev was reviewing my PRs, the client was expecting delivery, and there was no one to debug for me. The dashboard covers operational data panels, multi-section navigation, and real-time data binding using Flutter's state management. I made architecture decisions (widget decomposition, state scope) independently, with code review feedback incorporated across iterations.",
    highlight: "Passed code review and was merged into the main branch. The team continued using it after I left — the real test of whether internship work is any good.",
    tags: ["Flutter", "Dart", "State Management", "Cross-platform", "Code Review"],
    link: "https://github.com/HemnathElangovan/Flutter_AdminDashBoard_Not_Complete",
  },
  {
    num: "05",
    title: "Deepface Detection System",
    type: "SAP Hackathon",
    impact: "Working prototype built and demoed in a single competition session",
    desc: "Built at an SAP-organised inter-college hackathon representing SKCT. The challenge was integrating facial recognition into a working demo quickly enough to present before the session ended. I used DeepFace (Meta's face analysis library) for detection and recognition, with OpenCV handling the camera feed and frame processing. The pipeline takes live or static input, runs the model, and returns identity matches with confidence scores.",
    highlight: "The full pipeline — camera input → frame extraction → model inference → result display — was built, tested, and demonstrated within a single hackathon session. Speed under pressure is a skill.",
    tags: ["Python", "DeepFace", "OpenCV", "Computer Vision", "Real-time"],
    link: "https://github.com/HemnathElangovan/Simple_Deepface_Detection",
  },
  {
    num: "06",
    title: "Crowd Detection System",
    type: "College Mini Project",
    impact: "Safety-critical alert system with sub-2-second trigger latency",
    desc: "A real-time crowd density monitoring system using live camera input and OpenCV. The system continuously analyses frames, counts people using contour detection, and fires automated alerts to security personnel when a defined threshold is crossed. The main engineering constraint was latency — an alert that takes 10 seconds is useless in a stampede situation. I optimised the frame processing pipeline to keep the detection-to-alert cycle under 2 seconds on standard hardware.",
    highlight: "Detection-to-alert latency under 2 seconds on a standard laptop CPU — achieved by batching frame analysis and skipping redundant contour recomputation on unchanged regions.",
    tags: ["Python", "OpenCV", "Real-time Processing", "Camera Feed", "Safety Systems"],
    link: "https://github.com/HemnathElangovan/crowd_detection",
  },
];

const githubRepos = [
  {
    name: "Inventory_Management_System_Complete_Project",
    displayName: "Inventory Management System",
    desc: "React + Spring Boot + MySQL — full stack, clean layered architecture, fully documented",
    lang: "Java",
    langColor: "#f59e0b",
    link: "https://github.com/HemnathElangovan/Inventory_Management_System_Complete_Project",
  },
  {
    name: "crowd_detection",
    displayName: "Crowd Detection System",
    desc: "OpenCV pipeline with sub-2s alert latency — real-time safety for public spaces",
    lang: "Python",
    langColor: "#a78bfa",
    link: "https://github.com/HemnathElangovan/crowd_detection",
  },
  {
    name: "Simple_Deepface_Detection",
    displayName: "Deepface Detection",
    desc: "Live face recognition with DeepFace + OpenCV — built at SAP Hackathon",
    lang: "Python",
    langColor: "#a78bfa",
    link: "https://github.com/HemnathElangovan/Simple_Deepface_Detection",
  },
  {
    name: "Flutter_AdminDashBoard_Not_Complete",
    displayName: "Flutter Admin Dashboard",
    desc: "Cross-platform dashboard — a real internship deliverable, merged and adopted",
    lang: "Dart",
    langColor: "#67e8f9",
    link: "https://github.com/HemnathElangovan/Flutter_AdminDashBoard_Not_Complete",
  },
];

const githubStats = [
  { label: "Public Repos", value: "6+", color: "#00d4ff" },
  { label: "Languages", value: "4",    color: "#00ffcc" },
  { label: "Hackathon",  value: "1",   color: "#f59e0b" },
  { label: "Shipped to Production", value: "2", color: "#fda4af" },
];

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTypewriter(words, speed = 85, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) return;
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIdx + 1);
        setDisplay(next);
        if (charIdx + 1 === current.length) {
          setWaiting(true);
          setTimeout(() => { setWaiting(false); setDeleting(true); }, pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause, waiting]);

  return display;
}

/* ─── Skill Bar ──────────────────────────────────────────────────────────── */
function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="skill-row">
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill"
          style={{ width: inView ? `${level}%` : "0%", background: color, color, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

/* ─── Learning Bar ───────────────────────────────────────────────────────── */
function LearningBar({ name, progress, color, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className="learning-row">
      <span className="learning-name">{name}</span>
      <div className="learning-track">
        <div className="learning-fill"
          style={{ width: inView ? `${progress}%` : "0%", background: color, transitionDelay: `${delay}ms` }}
        />
      </div>
      <span className="learning-pct" style={{ color }}>{progress}%</span>
    </div>
  );
}

/* ─── Timeline Item ──────────────────────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const [ref, inView] = useInView(0.15);
  const isRight = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`timeline-item ${inView ? "timeline-visible" : ""} ${isRight ? "tl-right" : "tl-left"}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="timeline-content">
        <div className={`timeline-card tl-card--${item.color}`}>
          <div className="tl-card-top">
            <span className={`tl-year tl-year--${item.color}`}>{item.year}</span>
            {item.color === "pulse" && <span className="tl-pulse" />}
          </div>
          <h3 className="tl-title">{item.label}</h3>
          <p className="tl-place">{item.place}</p>
          <p className="tl-detail">{item.detail}</p>
        </div>
      </div>
      <div className="tl-spine">
        <div className={`tl-node tl-node--${item.color}`} />
      </div>
    </div>
  );
}

/* ─── Repo Card ──────────────────────────────────────────────────────────── */
function RepoCard({ repo, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <a ref={ref} href={repo.link} target="_blank" rel="noopener noreferrer"
      className={`repo-card ${inView ? "repo-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="repo-header">
        <GithubIcon className="repo-icon" />
        <span className="repo-name">{repo.displayName}</span>
      </div>
      <p className="repo-desc">{repo.desc}</p>
      <div className="repo-footer">
        <span className="repo-lang">
          <span className="repo-lang-dot" style={{ background: repo.langColor }} />
          {repo.lang}
        </span>
        <span className="repo-arrow">→</span>
      </div>
    </a>
  );
}

/* ─── Project Card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);
  return (
    <div ref={ref} className={`proj-card ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="proj-number">{project.num}</div>
      <div className="proj-body">
        <div className="proj-top">
          <div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-impact">{project.impact}</p>
          </div>
          <span className="proj-type">{project.type}</span>
        </div>
        <p className="proj-desc">{project.desc}</p>
        {expanded && (
          <div className="proj-highlight">
            <span className="proj-hl-label">// Key insight</span>
            <p className="proj-hl-text">{project.highlight}</p>
          </div>
        )}
        <button className="proj-toggle" onClick={() => setExpanded(p => !p)}>
          {expanded ? "Hide detail ↑" : "Key insight ↓"}
        </button>
        <div className="proj-tags">
          {project.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}
        </div>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="proj-link">
            View on GitHub <ArrowIcon className="proj-link-icon" />
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Contact Form ───────────────────────────────────────────────────────── */
// EmailJS config — fill these in after creating your EmailJS account (see README below)
const EMAILJS_SERVICE_ID  = "service_bli9cmf";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_fnw5jgh";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "qBjacNBme6syoSBRh";   // e.g. "aB1cD2eF3gH4iJ5k"

const PURPOSE_OPTIONS = [
  { value: "",                    label: "— Select purpose —" },
  { value: "internship_inquiry",  label: "Internship Inquiry" },
  { value: "collaboration",       label: "Project Collaboration" },
  { value: "freelance",           label: "Freelance Opportunity" },
  { value: "feedback",            label: "Portfolio Feedback" },
  { value: "just_hello",          label: "Just Saying Hi" },
];

function ContactForm() {
  const [form, setForm]       = useState({ name: "", email: "", purpose: "", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [errors, setErrors]   = useState({});
  const [senderName, setSenderName] = useState(""); // captured before form clears

  const validate = () => {
    const e = {};
    if (!form.name.trim())                         e.name    = "Name is required";
    if (!form.email.trim())                        e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))    e.email   = "Enter a valid email";
    if (!form.purpose)                             e.purpose = "Please select a purpose";
    if (!form.message.trim())                      e.message = "Message is required";
    else if (form.message.trim().length < 20)      e.message = "Message too short (min 20 chars)";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          purpose:    PURPOSE_OPTIONS.find(o => o.value === form.purpose)?.label || form.purpose,
          message:    form.message,
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSenderName(form.name);
      setStatus("success");
      setForm({ name: "", email: "", purpose: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const charCount = form.message.length;
  const sending   = status === "sending";

  return (
    <div className="cf-wrap">
      <div className="cf-header">
        <span className="cf-label">// Send a message</span>
        <p className="cf-hint">Fills in your details, picks a purpose, and lands directly in my inbox.</p>
      </div>

      {status === "success" ? (
        <div className="cf-success">
          <div className="cf-success-icon">✓</div>
          <h3 className="cf-success-title">Message received</h3>
          <p className="cf-success-text">
            Thanks{senderName ? `, ${senderName}` : ""}! I got your message and will reply to{" "}
            <strong>{form.email || "your email"}</strong> within 24 hours.
          </p>
          <button className="cf-reset-btn" onClick={() => setStatus("idle")}>Send another</button>
        </div>
      ) : (
        <form className="cf-form" onSubmit={handleSubmit} noValidate>

          <div className="cf-row cf-row--2">
            {/* Name */}
            <div className={`cf-field ${errors.name ? "cf-field--error" : ""}`}>
              <label className="cf-field-label" htmlFor="cf-name">Name</label>
              <input
                id="cf-name" name="name" type="text"
                className="cf-input" placeholder="Your full name"
                value={form.name} onChange={handleChange} disabled={sending}
                autoComplete="name"
              />
              {errors.name && <span className="cf-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={`cf-field ${errors.email ? "cf-field--error" : ""}`}>
              <label className="cf-field-label" htmlFor="cf-email">Email</label>
              <input
                id="cf-email" name="email" type="email"
                className="cf-input" placeholder="your@email.com"
                value={form.email} onChange={handleChange} disabled={sending}
                autoComplete="email"
              />
              {errors.email && <span className="cf-error">{errors.email}</span>}
            </div>
          </div>

          {/* Purpose */}
          <div className={`cf-field ${errors.purpose ? "cf-field--error" : ""}`}>
            <label className="cf-field-label" htmlFor="cf-purpose">Purpose</label>
            <div className="cf-select-wrap">
              <select
                id="cf-purpose" name="purpose"
                className="cf-select"
                value={form.purpose} onChange={handleChange} disabled={sending}
              >
                {PURPOSE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="cf-select-arrow">▼</span>
            </div>
            {errors.purpose && <span className="cf-error">{errors.purpose}</span>}
          </div>

          {/* Message */}
          <div className={`cf-field ${errors.message ? "cf-field--error" : ""}`}>
            <label className="cf-field-label" htmlFor="cf-message">
              Message
              <span className={`cf-char-count ${charCount > 800 ? "cf-char-count--warn" : ""}`}>
                {charCount}/1000
              </span>
            </label>
            <textarea
              id="cf-message" name="message"
              className="cf-textarea" placeholder="Tell me about the opportunity, project, or just say hi…"
              rows={5} maxLength={1000}
              value={form.message} onChange={handleChange} disabled={sending}
            />
            {errors.message && <span className="cf-error">{errors.message}</span>}
          </div>

          {status === "error" && (
            <div className="cf-send-error">
              Failed to send — check your EmailJS config or try emailing directly at hemnath2182006@gmail.com
            </div>
          )}

          <button type="submit" className="cf-submit" disabled={sending}>
            {sending ? (
              <><span className="cf-spinner" /> Sending…</>
            ) : (
              <><span className="cf-submit-arrow">→</span> Send Message</>
            )}
          </button>

        </form>
      )}
    </div>
  );
}

/* ─── Section Reveal ─────────────────────────────────────────────────────── */
function SectionReveal({ children, className, id }) {
  const [ref, inView] = useInView(0.08);
  return (
    <section ref={ref} id={id} className={`${className} section-reveal ${inView ? "section-visible" : ""}`}>
      {children}
    </section>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const typeText = useTypewriter([
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Open to Internships",
  ]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("header[id], section[id]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = ["about", "journey", "experience", "certifications", "skills", "projects", "github", "contact"];
  const handleNavClick = useCallback((link) => {
    setActiveSection(link);
    setMenuOpen(false);
  }, []);

  return (
    <div className="App">

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <span className="nav-logo">HL<span className="logo-dot">.</span></span>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link}`}
                  className={`nav-link ${activeSection === link ? "active" : ""}`}
                  onClick={() => handleNavClick(link)}>{link}</a>
              </li>
            ))}
          </ul>
          <button className={`nav-burger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu" onClick={() => setMenuOpen(p => !p)}>
            {menuOpen ? <CloseIcon className="burger-icon" /> : <MenuIcon className="burger-icon" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>
        <ul className="drawer-links">
          {navLinks.map((link, i) => (
            <li key={link} style={{ animationDelay: `${i * 55}ms` }}
              className={menuOpen ? "drawer-item-in" : ""}>
              <a href={`#${link}`} className={`drawer-link ${activeSection === link ? "active" : ""}`}
                onClick={() => handleNavClick(link)}>
                <span className="drawer-num">0{i + 1}</span>{link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}

      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-bg-text" aria-hidden="true">HEMNATH</div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-corner hero-corner--tl" aria-hidden="true" />
        <div className="hero-corner hero-corner--tr" aria-hidden="true" />
        <div className="hero-corner hero-corner--bl" aria-hidden="true" />
        <div className="hero-corner hero-corner--br" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-sys-line">
            <span>SYS_INIT</span>
            <span className="sys-sep">//</span>
            <span>PORTFOLIO_v2.0</span>
            <span className="sys-sep">//</span>
            <span>READY</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-first">Hemnath</span>
            <span className="hero-last" data-text="L E">L E</span>
          </h1>

          <div className="hero-typewriter" aria-live="polite">
            <span className="tw-prefix">// </span>
            <span className="tw-text">{typeText}</span>
            <span className="tw-cursor">▌</span>
          </div>

          <p className="hero-tagline">{profile.objective}</p>

          <div className="hero-roles">
            {profile.roles.map((role) => (
              <span key={role} className="hero-role">{role}</span>
            ))}
          </div>

          <div className="hero-data">
            {profile.locations.map((loc) => (
              <span key={loc} className="data-item">{loc}</span>
            ))}
            <span className="data-item">{profile.email}</span>
          </div>

          <div className="hero-availability">
            <span className="avail-dot" />
            <span className="avail-text">Available for internships · Immediate joiner</span>
          </div>

          <div className="hero-actions">
            <a href={profile.resume} className="cta-btn cta-primary" download>
              <DownloadIcon className="btn-icon" /> Download Resume
            </a>
            <a href="#projects" className="cta-btn cta-outline">View Work</a>
            <a href="#contact" className="cta-btn cta-outline">Contact Me</a>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>

        <div className="hero-hud" aria-hidden="true">
          <div className="hud-ring-outer">
            <div className="hud-ring-inner">
              <div className="hud-center">
                <span className="hud-initials">HL</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <SectionReveal id="about" className="section-about">
        <div className="wrap">
          <div className="section-ghost-num" aria-hidden="true">01</div>
          <div className="section-eyebrow">01 / About</div>
          <div className="about-layout">
            <div className="about-heading">
              <h2 className="section-h2">Learning,<br /><em>building</em><br />and shipping</h2>
            </div>
            <div className="about-right">
              {profile.bio.map((p, i) => <p key={i} className="about-para">{p}</p>)}
              <div className="info-grid">
                {profile.education.map((item) => (
                  <div key={item.label} className="info-card">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="stats-row">
                <div className="stat-block">
                  <span className="stat-num">6+</span>
                  <span className="stat-lbl">Projects</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-block">
                  <span className="stat-num">2</span>
                  <span className="stat-lbl">NPTEL Elite</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-block">
                  <span className="stat-num">1</span>
                  <span className="stat-lbl">Hackathon</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-block">
                  <span className="stat-num">1</span>
                  <span className="stat-lbl">Internship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* JOURNEY */}
      <SectionReveal id="journey" className="section-journey">
        <div className="wrap">
          <div className="section-ghost-num" aria-hidden="true">02</div>
          <div className="section-eyebrow">02 / Journey</div>
          <div className="journey-intro">
            <h2 className="section-h2">My <em>Path</em><br />So Far</h2>
            <p className="section-sub">From schooling in Salem to hackathons and internships — every step has shaped who I am as a developer.</p>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <TimelineItem key={`${item.year}-${i}`} item={item} index={i} />
            ))}
            <div className="tl-spine-line" aria-hidden="true" />
          </div>
        </div>
      </SectionReveal>

      {/* EXPERIENCE */}
      <SectionReveal id="experience" className="section-experience">
        <div className="wrap">
          <div className="section-ghost-num" aria-hidden="true">03</div>
          <div className="section-eyebrow">03 / Experience</div>
          <div className="experience-layout">
            <div className="experience-heading">
              <h2 className="section-h2">Practical<br />Exposure</h2>
              <p>Experience that connects academic learning with real deliverables and real teams.</p>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="experience-card">
                  <div className="experience-top">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience-company">{item.company}</p>
                      <p className="experience-duration">{item.duration}</p>
                    </div>
                    <span className="experience-badge">{item.type}</span>
                  </div>
                  <p className="experience-desc">{item.description}</p>
                  <div className="experience-outcome">
                    <span className="outcome-label">Outcome ◆</span>
                    {item.outcome}
                  </div>
                  {item.whatILearned && (
                    <div className="experience-learned">
                      <span className="outcome-label">What I learned ◆</span>
                      {item.whatILearned}
                    </div>
                  )}
                  <div className="experience-stack">
                    {item.stack.map(s => <span key={s} className="stack-tag">{s}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* CERTIFICATIONS */}
      <SectionReveal id="certifications" className="section-certifications">
        <div className="wrap">
          <div className="section-eyebrow">04 / Certifications</div>
          <h2 className="section-h2">Recognized<br /><em>Achievements</em></h2>
          <p className="section-sub">Certifications from IIT Madras, IIT Roorkee, IBM, TCS, and the Ministry of Home Affairs. Each one either deepened a skill directly used in a project, or developed something most developers skip — like technical writing and cybersecurity awareness.</p>
          <div className="cert-list">
            {certifications.map((cert) => (
              <article key={`${cert.title}-${cert.issuer}`} className="cert-card">
                <div className="cert-top-row">
                  <span className="cert-badge">{cert.badge}</span>
                  {cert.score && <span className="cert-score">{cert.score}</span>}
                </div>
                <div className="cert-meta">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer} · {cert.year}</p>
                  {cert.why && <p className="cert-why">{cert.why}</p>}
                </div>
                {cert.link && (
                  <a className="cert-link" href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Certificate <ArrowIcon className="cert-link-icon" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* SKILLS */}
      <SectionReveal id="skills" className="section-skills">
        <div className="wrap">
          <div className="section-ghost-num" aria-hidden="true">05</div>
          <div className="section-eyebrow">05 / Skills</div>
          <div className="skills-layout">
            <div className="skills-heading">
              <h2 className="section-h2">Technical<br /><em>Expertise</em></h2>
              <p>Technologies I use to build backend services, frontend interfaces, and mobile applications.</p>
              <div className="currently-learning">
                <p className="learning-label">// Currently learning</p>
                {learning.map((item, i) => (
                  <LearningBar key={item.name} {...item} delay={i * 120} />
                ))}
              </div>
            </div>
            <div>
              <div className="skills-bars">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 100} />
                ))}
              </div>
              <div className="tools-row">
                <p className="tools-label">// Tools &amp; Practices</p>
                <div className="tools-chips">
                  {toolsAndSoft.map(t => <span key={t} className="tool-chip">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* PROJECTS */}
      <SectionReveal id="projects" className="section-projects">
        <div className="wrap">
          <div className="section-ghost-num" aria-hidden="true">06</div>
          <div className="section-eyebrow">06 / Projects</div>
          <h2 className="projects-heading">Featured<br />Work</h2>
          <div className="projects-list">
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} delay={i * 80} />
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* GITHUB */}
      <SectionReveal id="github" className="section-github">
        <div className="wrap">
          <div className="section-eyebrow">07 / GitHub</div>
          <div className="github-layout">
            <div>
              <h2 className="section-h2">Open Source<br /><em>Activity</em></h2>
              <p className="section-sub">All projects are publicly available with full source code. Building in the open, learning through doing.</p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="cta-btn cta-outline github-profile-btn">
                <GithubIcon className="btn-icon" /> Open GitHub Profile
              </a>
            </div>
            <div className="github-stats-grid">
              {githubStats.map((stat) => (
                <div key={stat.label} className="gh-stat-card">
                  <span className="gh-stat-num" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="gh-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="repo-grid">
            {githubRepos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} delay={i * 80} />
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* CONTACT */}
      <SectionReveal id="contact" className="section-contact">
        <div className="wrap">
          <div className="section-eyebrow">08 / Contact</div>
          <div className="contact-layout">

            {/* Left — heading + quick links */}
            <div className="contact-left">
              <h2 className="contact-heading">Let&apos;s build<br />something <em>great</em></h2>
              <p className="contact-sub">Looking for a backend, full stack, or mobile internship where I will write production code, get it reviewed, and learn why senior engineers make the decisions they do. Immediate joiner. I reply within 24 hours.</p>
              <div className="contact-actions">
                <a href={profile.resume} className="cta-btn cta-primary" download>
                  <DownloadIcon className="btn-icon" /> Download Resume
                </a>
              </div>
              <div className="contact-cards">
                <a href={`mailto:${profile.email}`} className="contact-card">
                  <EnvelopeIcon className="cc-icon" />
                  <div><div className="cc-label">Email</div><div className="cc-val">{profile.email}</div></div>
                  <span className="cc-arrow">→</span>
                </a>
                <a href={`tel:${profile.phone}`} className="contact-card">
                  <PhoneIcon className="cc-icon" />
                  <div><div className="cc-label">Phone</div><div className="cc-val">{profile.phone}</div></div>
                  <span className="cc-arrow">→</span>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-card">
                  <GithubIcon className="cc-icon" />
                  <div><div className="cc-label">GitHub</div><div className="cc-val">{profile.githubLabel}</div></div>
                  <span className="cc-arrow">→</span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
                  <LinkedinIcon className="cc-icon" />
                  <div><div className="cc-label">LinkedIn</div><div className="cc-val">{profile.linkedinLabel}</div></div>
                  <span className="cc-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="contact-right">
              <ContactForm />
            </div>

          </div>
        </div>
      </SectionReveal>

      <footer className="footer">
        <span>{`© ${new Date().getFullYear()} ${profile.name}`}</span>
        <div className="footer-center">
          <span className="footer-dot">·</span>
          <span>{profile.shortTitle}</span>
          <span className="footer-dot">·</span>
          <div className="footer-status">
            <span className="status-dot" />
            <span>Available for internships</span>
          </div>
        </div>
        <span>Built with React</span>
      </footer>
    </div>
  );
}
