import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Download,
  GraduationCap,
  HeartPulse,
  Mail,
  Menu,
  Sparkles,
  UsersRound,
  X,
  Baby,
  Cpu,
  HandHeart,
} from "lucide-react";
import "./styles/styles.css";
import "./i18n";
import { useTranslation } from "react-i18next";

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about-aarambh" },
  { key: "blogs", href: "#blogs" },
  { key: "sessions", href: "#live-sessions" },
  { key: "resources", href: "#resources" },
  { key: "community", href: "#community" },
  { key: "contact", href: "#contact" },
];

const categories = [
  { title: "Health & Fitness", icon: HeartPulse, text: "Simple, evidence-aware habits for stronger bodies and everyday vitality." },
  { title: "Mental Wellbeing", icon: Brain, text: "Practical tools for stress, focus, emotional balance, and resilience." },
  { title: "Parenting", icon: Baby, text: "Grounded support for families, children, communication, and care." },
  { title: "Workplace Management", icon: BriefcaseBusiness, text: "Better teams, humane productivity, leadership, and workplace culture." },
  { title: "Education", icon: GraduationCap, text: "Learning methods, classroom practices, and lifelong skill-building." },
  { title: "Personal Growth", icon: Sparkles, text: "Reflective, realistic ways to build confidence, purpose, and momentum." },
  { title: "Technology & AI for Everyday Life", icon: Cpu, text: "Clear guides to use technology wisely at home, work, and school." },
  { title: "Social Welfare & Awareness", icon: HandHeart, text: "Community-first perspectives on inclusion, safety, and social change." },
];

const featuredArticles = [
  {
    category: "Mental Wellbeing",
    title: "A Practical Guide to Recognising Burnout Early",
    excerpt: "Learn the subtle signals of burnout and small recovery steps that can be used before exhaustion becomes normal.",
    readTime: "6 min read",
  },
  {
    category: "Education",
    title: "How Evidence-Based Learning Improves Retention",
    excerpt: "A clear look at retrieval practice, spaced repetition, and feedback loops for students and educators.",
    readTime: "8 min read",
  },
  {
    category: "Workplace Management",
    title: "Building Workplaces Where People Can Think Clearly",
    excerpt: "Design meetings, communication, and priorities around attention instead of constant interruption.",
    readTime: "7 min read",
  },
];

const mostRead = [
  "10 Daily Habits That Support Long-Term Health",
  "Parenting Through Exams Without Creating Fear",
  "Using AI Tools Responsibly in Everyday Work",
  "The Difference Between Motivation and Discipline",
];

const sessions = [
  { date: "18 Jul", title: "Managing Stress in Daily Life", host: "Dr. Meera Joshi", mode: "Live Webinar" },
  { date: "25 Jul", title: "AI for Teachers and Parents", host: "AARAMBH Learning Team", mode: "Interactive Session" },
  { date: "02 Aug", title: "Creating Healthier Workplace Conversations", host: "Leadership Circle", mode: "Panel Talk" },
];

const resources = [
  "Healthy Routine Planner",
  "Workplace Meeting Checklist",
  "Parent-Child Conversation Prompts",
];

const brandDescription = "Inspired by Ancient wisdom, guided by Righteous values, driven by Altruism, practiced with Mindfulness, and enriched by Biosophy - the wisdom of life.";
const typingPhrases = ["AARAMBH"];

function useTypingLoop(phrases) {
  const [displayText, setDisplayText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const typingDone = !isDeleting && displayText === currentPhrase;
    const deletingDone = isDeleting && displayText === "";

    const delay = typingDone ? 2300 : isDeleting ? 65 : 95;
    const timer = window.setTimeout(() => {
      if (typingDone) {
        setIsDeleting(true);
        return;
      }

      if (deletingDone) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setDisplayText((currentText) => {
        if (isDeleting) {
          return currentPhrase.slice(0, Math.max(0, currentText.length - 1));
        }

        return currentPhrase.slice(0, currentText.length + 1);
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phrases, phraseIndex]);

  return displayText;
}

function Header() {
  const [open, setOpen] = React.useState(false);

  const { t, i18n } = useTranslation();

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="AARAMBH home">
        <span className="brand-title">AARAMBH - The Beginning</span>
        <span className="brand-description">{brandDescription}</span>
      </a>
      <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
         <a key={item.key} href={item.href}>
  {t(item.key)}
  {item.key === "community" && (
    <span className="soon">Future</span>
  )}
</a>
        ))}
        <div className="language-switcher">
  <span>🌐</span>
<select
  value={i18n.language}
  onChange={(e) => i18n.changeLanguage(e.target.value)}
>
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
  <option value="mr">मराठी</option>
  <option value="ta">தமிழ்</option>
</select>
</div>
        
      </nav>
    </header>
  );
}

function Hero() {
  const typedWord = useTypingLoop(typingPhrases);

  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Learn Better. Live Better. Lead Better.</p>
        <h1 aria-label="AARAMBH">
          <span className="hero-title-accent">{typedWord.slice(0, 1)}</span>
          <span className="hero-title-rest">{typedWord.slice(1)}</span>
          <span className="typing-cursor title-cursor" aria-hidden="true" />
        </h1>
        <p className="tagline evidence-line">Evidence-based insights for better living, better workplaces, and better education.</p>
        <div className="hero-actions">
          <a className="button primary" href="#blogs">
            Explore Articles <ArrowRight size={18} />
          </a>
          <a className="button secondary" href="#live-sessions">
            Join Live Sessions <CalendarDays size={18} />
          </a>
        </div>
      </div>
      <div className="hero-visual" aria-label="AARAMBH focus areas">
        <div className="focus-card health">
          <HeartPulse size={30} />
          <span>Health</span>
        </div>
        <div className="focus-card education">
          <GraduationCap size={30} />
          <span>Education</span>
        </div>
        <div className="focus-card family">
          <Baby size={30} />
          <span>Family</span>
        </div>
        <div className="focus-card workplace">
          <BriefcaseBusiness size={30} />
          <span>Workplace</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section split" id="about-aarambh">
      <div>
        <p className="section-kicker">About AARAMBH</p>
        <h2>A clear starting point for better decisions.</h2>
      </div>
      <div className="prose">
        <p>
          AARAMBH is a knowledge-sharing platform dedicated to helping people lead healthier lives, build stronger workplaces, nurture families, and create better communities.
        </p>
        <p>
          Every article is written with a focus on practical insights, evidence-based understanding, and real-world applicability.
        </p>
        <div className="proof-grid">
          {["Evidence-aware", "Practical", "Human-centred"].map((item) => (
            <span key={item}><CheckCircle2 size={18} />{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section" id="blogs">
      <div className="section-heading">
        <p className="section-kicker">Explore Categories</p>
        <h2>Blogs that meet real life where it happens.</h2>
      </div>
      <div className="category-grid">
        {categories.map(({ title, icon: Icon, text }) => (
          <article className="category-card" key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section className="section tinted">
      <div className="section-heading">
        <p className="section-kicker">Featured Articles</p>
        <h2>Fresh thinking for healthier homes, teams, and classrooms.</h2>
      </div>
      <div className="article-grid">
        {featuredArticles.map((article) => (
          <article className="article-card" key={article.title}>
            <span>{article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <a href="#contact">Read article <ArrowRight size={16} /></a>
            <small>{article.readTime}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function LiveSessions() {
  return (
    <section className="section split" id="live-sessions">
      <div>
        <p className="section-kicker">Upcoming Live Sessions</p>
        <h2>Learn directly with experts and peers.</h2>
        <p className="muted">Sessions can become webinars, Q&A rooms, workshops, or community conversations as AARAMBH grows.</p>
      </div>
      <div className="session-list">
        {sessions.map((session) => (
          <article className="session-row" key={session.title}>
            <time>{session.date}</time>
            <div>
              <h3>{session.title}</h3>
              <p>{session.host} - {session.mode}</p>
            </div>
            <a href="#contact" aria-label={`Register for ${session.title}`}>Register</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function MostRead() {
  return (
    <section className="section compact">
      <div className="section-heading">
        <p className="section-kicker">Most Read Articles</p>
        <h2>Start with what readers return to most.</h2>
      </div>
      <ol className="most-read">
        {mostRead.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </section>
  );
}

function Resources() {
  return (
    <section className="section resources" id="resources">
      <div>
        <p className="section-kicker">Download Free Resources</p>
        <h2>Useful tools for action, reflection, and planning.</h2>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <a className="resource-card" href="#contact" key={resource}>
            <Download size={22} />
            <span>{resource}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Subscribe() {
  return (
    <section className="subscribe" id="contact">
      <div>
        <p className="section-kicker">Subscribe</p>
        <h2>Get new articles and session updates.</h2>
      </div>
      <form className="subscribe-form">
        <label htmlFor="email">Email address</label>
        <div>
          <input id="email" type="email" placeholder="you@example.com" />
          <button className="button primary" type="submit">
            Subscribe <Mail size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand" href="#home">
          <span className="brand-title">AARAMBH - The Beginning</span>
          <span className="brand-description">{brandDescription}</span>
        </a>
        <p>Evidence-based insights for better living, better workplaces, and better education.</p>
      </div>
      <div className="footer-links">
        <a href="#about-aarambh">About</a>
        <a href="#blogs">Blogs</a>
        <a href="#live-sessions">Live Sessions</a>
        <a href="#resources">Resources</a>
        <a href="#community">Community</a>
      </div>
      <p className="copyright">(c) 2026 AARAMBH. The Beginning.</p>
    </footer>
  );
}

function Community() {
  return (
    <section className="section community" id="community">
      <UsersRound size={34} />
      <div>
        <p className="section-kicker">Community</p>
        <h2>Future space for shared learning and support.</h2>
        <p className="muted">A dedicated community area can later host discussions, groups, expert AMAs, and member-led initiatives.</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Categories />
        <Articles />
        <LiveSessions />
        <MostRead />
        <Resources />
        <Subscribe />
        <Community />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
