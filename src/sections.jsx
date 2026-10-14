import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from './icons.jsx';

const img = (file) => `/img/${encodeURIComponent(file)}`;

const PAGES = [
  ['/', 'Home', 'home'],
  ['/resume', 'Resume', 'resume'],
  ['/projects', 'Projects', 'project'],
  ['/certificates', 'Certificates', 'certificate'],
];

function useTyped(items) {
  const [text, setText] = useState(items?.[0] || '');
  useEffect(() => {
    if (!items?.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0, j = 0, deleting = false, timer;
    const tick = () => {
      const word = items[i];
      j += deleting ? -1 : 1;
      setText(word.slice(0, j));
      let delay = deleting ? 50 : 100;
      if (!deleting && j === word.length) { deleting = true; delay = 1800; }
      else if (deleting && j === 0) { deleting = false; i = (i + 1) % items.length; delay = 300; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [items]);
  return text;
}

/** Fades content in once when it scrolls into view. */
function Reveal({ as: Tag = 'div', className = '', children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</Tag>;
}

/* Scrolls to top on page change, or to a home section for links like /?to=contact */
export function ScrollManager() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const to = new URLSearchParams(search).get('to');
    const el = to && document.getElementById(to);
    if (el) el.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  return null;
}

export function Header({ name }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="topbar">
      <Link className="brand" to="/" onClick={close}>{name}</Link>
      <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
        <Icon name={open ? 'close' : 'menu'} /> {open ? 'Close' : 'Menu'}
      </button>
      <nav id="nav" className={open ? 'open' : ''}>
        {PAGES.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={close}><Icon name={icon} />{label}</NavLink>
        ))}
        <Link to="/?to=contact" onClick={close}><Icon name="mail" />Contact</Link>
      </nav>
    </header>
  );
}

export function Hero({ p }) {
  const role = useTyped(p.roles);
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="eyebrow">Hello, I'm</p>
        <h1>{p.name}</h1>
        <p className="role" aria-label={p.roles.join(', ')}>
          A <span>{role}</span><i className="caret" aria-hidden="true" />
        </p>
        <p className="lede">{p.degree} graduate, 2025. I build web applications with the MERN stack.</p>
        <div className="actions">
          <Link className="btn primary" to="/projects">See my projects <Icon name="arrow" /></Link>
          <Link className="btn" to="/?to=contact"><Icon name="mail" /> Get in touch</Link>
        </div>
      </div>
      <figure className="portrait">
        <img src={img('me2.png')} alt={`Portrait of ${p.name}`} />
      </figure>
    </section>
  );
}

export function Stats({ p }) {
  const items = [
    [p.projects.length, 'Projects', 'project'],
    [p.certificates.length, 'Certificates', 'certificate'],
    [p.skills.technical.length, 'Technical skills', 'code'],
  ];
  return (
    <Reveal className="wrap stats-wrap">
      <ul className="stats">
        {items.map(([n, label, icon]) => (
          <li key={label}>
            <Icon name={icon} lead big />
            <strong>{n}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Section({ id, title, children, tone }) {
  return (
    <section id={id} className={`block ${tone || ''}`}>
      <Reveal className="wrap">
        <h2>{title}</h2>
        <div className="body">{children}</div>
      </Reveal>
    </section>
  );
}

export function PageHead({ title, intro }) {
  return (
    <div className="page-head">
      <div className="wrap">
        <Link className="back" to="/">Back to home</Link>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

export function About({ p }) {
  return (
    <Section id="about" title="About">
      <p className="prose">{p.summary}</p>
      <dl className="facts">
        <div><dt><Icon name="graduation" lead /> Degree</dt><dd>{p.degree}</dd></div>
        <div><dt><Icon name="pin" lead /> City</dt><dd>{p.contact.city}</dd></div>
        <div><dt><Icon name="phone" lead /> Phone</dt><dd><a href={`tel:${p.contact.phone.replace(/\s/g, '')}`}>{p.contact.phone}</a></dd></div>
        <div><dt><Icon name="mail" lead /> Email</dt><dd><a href={`mailto:${p.contact.email}`}>{p.contact.email}</a></dd></div>
      </dl>
    </Section>
  );
}

export function Skills({ skills }) {
  return (
    <Section id="skills" title="Skills" tone="band">
      <div className="two">
        <div className="card pad">
          <h3><Icon name="code" lead /> Technical</h3>
          <ul className="bars">
            {skills.technical.map((s) => (
              <li key={s.name}>
                <div className="bar-head"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="track" role="img" aria-label={`${s.name}: ${s.level} percent`}>
                  <div className="fill" style={{ '--w': `${s.level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card pad">
          <h3><Icon name="star" lead /> Personal</h3>
          <ul className="chips big">
            {skills.soft.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* Home page links to the three separate pages */
export function Explore({ p }) {
  const rows = [
    ['/resume', 'Resume', 'resume', 'Education, experience and skills'],
    ['/projects', 'Projects', 'project', `${p.projects.length} web projects with details and screenshots`],
    ['/certificates', 'Certificates', 'certificate', `${p.certificates.length} course and training certificates`],
  ];
  return (
    <Section id="explore" title="Explore">
      <ul className="explore">
        {rows.map(([to, title, icon, text]) => (
          <li key={to}>
            <Link className="card explore-card" to={to}>
              <Icon name={icon} lead big />
              <span className="explore-title">{title}</span>
              <span className="explore-text">{text}</span>
              <span className="explore-go">View page <Icon name="arrow" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Resume page ---------- */
export function ResumePage({ p }) {
  return (
    <>
      <PageHead title="Resume" intro={`${p.name}, ${p.degree}. ${p.contact.city}.`} />
      <Reveal className="wrap page-body two">
        <div>
          <h3><Icon name="graduation" lead /> Education</h3>
          <div className="timeline">
            {p.education.map((e) => (
              <article className="entry" key={e.title}>
                <h4>{e.title}</h4>
                <p className="meta">{e.period}, {e.place}</p>
                <p>{e.note}</p>
              </article>
            ))}
          </div>
          <h3><Icon name="star" lead /> Skills</h3>
          <ul className="chips">
            {[...p.skills.technical.map((s) => s.name), ...p.skills.soft].map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3><Icon name="briefcase" lead /> Experience</h3>
          <div className="timeline">
            {p.experience.map((e) => (
              <article className="entry" key={e.title}>
                <h4>{e.title}</h4>
                <p className="meta">{e.period}, {e.place}</p>
                <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}

/* ---------- Projects page ---------- */
function ProjectItem({ project }) {
  const [i, setI] = useState(0);
  const n = project.images.length;
  return (
    <Reveal as="article" className="project-item card">
      <div className={`project ${n ? '' : 'no-media'}`}>
        {n > 0 && (
          <div className="slider">
            <img src={img(project.images[i])} alt={`${project.title}, screenshot ${i + 1} of ${n}`} />
            <div className="slider-ctl">
              <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous screenshot">Previous</button>
              <span>{i + 1} / {n}</span>
              <button onClick={() => setI((i + 1) % n)} aria-label="Next screenshot">Next</button>
            </div>
          </div>
        )}
        <div>
          <h2>{project.title}</h2>
          <p className="meta">{[project.stack, project.date].filter(Boolean).join(', ')}</p>
          <p className="prose">{project.description}</p>
          <h4>Modules</h4>
          <ul className="chips">{project.modules.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectsPage({ p }) {
  return (
    <>
      <PageHead title="Projects" intro="Web applications I have built." />
      <div className="wrap page-body">
        {p.projects.map((project) => <ProjectItem key={project.title} project={project} />)}
      </div>
    </>
  );
}

/* ---------- Certificates page ---------- */
export function CertificatesPage({ p }) {
  const items = p.certificates;
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <>
      <PageHead title="Certificates" intro="Select a certificate to view it full size." />
      <Reveal className="wrap page-body">
        <ul className="certs">
          {items.map((c, idx) => (
            <li key={c.title}>
              <button className="card" onClick={() => setOpen(idx)} aria-label={`View ${c.title} certificate`}>
                <img src={img(c.image)} alt="" loading="lazy" />
                <span><Icon name="certificate" /> {c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[open].title} onClick={() => setOpen(null)}>
          <img src={img(items[open].image)} alt={`${items[open].title} certificate`} />
          <button onClick={() => setOpen(null)}>Close</button>
        </div>
      )}
    </>
  );
}

export function Contact({ contact, api }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!api) {
      const body = `${form.message}\n\n${form.name} (${form.email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: 'sent', text: 'Your email app should open with the message ready to send.' });
      return;
    }
    setStatus({ state: 'sending', text: '' });
    try {
      const res = await fetch(`${api}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Something went wrong.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus({ state: 'sent', text: 'Message sent. Thank you, I will reply soon.' });
    } catch (err) {
      setStatus({ state: 'error', text: err.message });
    }
  }

  return (
    <Section id="contact" title="Contact" tone="band">
      <div className="two">
        <address className="contact-list">
          <p><Icon name="pin" lead /><span><strong>Address</strong><br />{contact.address}</span></p>
          <p><Icon name="phone" lead /><span><strong>Phone</strong><br /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></span></p>
          <p><Icon name="mail" lead /><span><strong>Email</strong><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></span></p>
        </address>
        <form className="card pad" onSubmit={submit}>
          <label>Your name<input value={form.name} onChange={set('name')} required maxLength={100} /></label>
          <label>Your email<input type="email" value={form.email} onChange={set('email')} required maxLength={200} /></label>
          <label>Subject<input value={form.subject} onChange={set('subject')} required maxLength={150} /></label>
          <label>Message<textarea rows="6" value={form.message} onChange={set('message')} required maxLength={3000} /></label>
          <button className="btn primary" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending…' : <>Send message <Icon name="send" /></>}
          </button>
          <p className={`status ${status.state}`} role="status">{status.text}</p>
        </form>
      </div>
    </Section>
  );
}

export function Footer({ p }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <ul className="social">
          {p.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                <Icon name={s.label.toLowerCase()} />
              </a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} {p.name}</p>
      </div>
    </footer>
  );
}
