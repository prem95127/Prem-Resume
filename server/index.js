import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Profile, Message } from './models.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : true }));
app.use(express.json({ limit: '10kb' }));

// Very small in-memory limiter: 5 messages per IP per hour.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

app.get('/api/profile', async (_req, res) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).json({ error: 'No profile found. Run "npm run seed".' });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load the profile.' });
  }
});

app.post('/api/messages', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const emailOk = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const textOk = [name, subject, message].every((v) => typeof v === 'string' && v.trim().length > 0);
  if (!emailOk || !textOk) return res.status(400).json({ error: 'Please fill in every field with a valid email.' });
  if (limited(req.ip)) return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  try {
    await Message.create({ name, email, subject, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save your message.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
