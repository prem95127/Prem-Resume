import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    name: String,
    roles: [String],
    summary: String,
    degree: String,
    contact: { city: String, phone: String, email: String, address: String },
    socials: [{ label: String, url: String }],
    skills: {
      technical: [{ name: String, level: Number }],
      soft: [String],
    },
    education: [{ title: String, period: String, place: String, note: String }],
    experience: [{ title: String, period: String, place: String, points: [String] }],
    projects: [{ title: String, stack: String, date: String, modules: [String], description: String, images: [String] }],
    certificates: [{ title: String, image: String }],
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
  },
  { timestamps: true }
);

export const Profile = model('Profile', profileSchema);
export const Message = model('Message', messageSchema);
