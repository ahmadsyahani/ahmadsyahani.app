"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactComposer() {
  const [topic, setTopic] = useState("Web application");
  const [opened, setOpened] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hi Ahmad,\n\n${data.get("message")}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Let's talk: ${topic}`)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }
  return <form className="contact-composer" onSubmit={submit}><fieldset><legend>What do you have in mind?</legend><div className="filter-list">{["Web application", "Mobile app", "Collaboration", "Something else"].map(item => <button type="button" key={item} aria-pressed={topic === item} className={topic === item ? "selected" : ""} onClick={() => setTopic(item)}>{item}</button>)}</div></fieldset><div className="input-pair"><label>Your name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div><label>Your message<textarea name="message" placeholder="Tell me a little about your idea..." required rows={5} maxLength={4000} /></label><button type="submit" className="outlined-button"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">Open email draft <ArrowUpRight size={17} /></span></button><p className="form-hint" role="status">{opened ? "Your email draft is ready to open. Send it from your email app, or email me directly using the address above." : "This opens a draft in your email app, ready for you to send."}</p></form>;
}
