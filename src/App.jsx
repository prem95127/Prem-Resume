import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import localData from './data.js';
import {
  ScrollManager, Header, Hero, Stats, About, Skills, Explore, Contact, Footer,
  ResumePage, ProjectsPage, CertificatesPage,
} from './sections.jsx';
import { ThemePanel } from './theme.jsx';

// Optional: set VITE_API_URL (e.g. http://localhost:5000) to load content from MongoDB via the server/ folder.
const API = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [profile, setProfile] = useState(localData);

  useEffect(() => {
    if (!API) return;
    fetch(`${API}/api/profile`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && d.projects && setProfile(d))
      .catch(() => {}); // keep local data if the API is unreachable
  }, []);

  return (
    <HashRouter>
      <ScrollManager />
      <Header name={profile.name} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero p={profile} />
                <Stats p={profile} />
                <About p={profile} />
                <Skills skills={profile.skills} />
                <Explore p={profile} />
                <Contact contact={profile.contact} api={API} />
              </>
            }
          />
          <Route path="/resume" element={<ResumePage p={profile} />} />
          <Route path="/projects" element={<ProjectsPage p={profile} />} />
          <Route path="/certificates" element={<CertificatesPage p={profile} />} />
          <Route path="*" element={<div className="wrap page-body"><p>Page not found.</p></div>} />
        </Routes>
      </main>
      <Footer p={profile} />
      <ThemePanel />
    </HashRouter>
  );
}
