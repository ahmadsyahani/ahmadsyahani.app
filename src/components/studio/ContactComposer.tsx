"use client";

import { useState } from "react";
import { Check, Code2, Handshake, MessageCircle, Send, Smartphone, Smile } from "lucide-react";
import { personalInfo } from "@/lib/data";

const topics = [
  { name: "Web application", Icon: Code2 },
  { name: "Mobile app", Icon: Smartphone },
  { name: "Collaboration", Icon: Handshake },
  { name: "Something else", Icon: MessageCircle },
];

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
  return <form className="contact-composer" onSubmit={submit}>
    <div className="postcard-header">
      <div><span className="postcard-recipient">To: Ahmad Syahani</span><h2>A little note,<br />a new beginning.</h2></div>
      <span className="postcard-stamp" aria-hidden="true"><Smile size={30} strokeWidth={1.5} /><span>Hello!</span></span>
    </div>
    <fieldset><legend>What do you have in mind?</legend>
      <div className="contact-topics">{topics.map(({ name, Icon }) => <button type="button" key={name} aria-pressed={topic === name} onClick={() => { setTopic(name); setOpened(false); }}><Icon size={17} aria-hidden="true" /><span>{name}</span>{topic === name && <Check className="topic-check" size={14} aria-hidden="true" />}</button>)}</div>
    </fieldset>
    <div className="input-pair">
      <label>Your name<input name="name" autoComplete="name" placeholder="What should I call you?" required maxLength={100} /></label>
      <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
    </div>
    <label>Your message<textarea name="message" placeholder="Hi Ahmad, I?ve been thinking about..." required rows={5} maxLength={4000} /></label>
    <div className="contact-send-row"><button type="submit" className="contact-send">Open email draft <Send size={18} aria-hidden="true" /></button><span>You write. We build.</span></div>
    <p className="form-hint" role="status">{opened ? "If your email app opened, your draft is ready for you to send. You can also copy my email address from the note on this page." : "Opens a draft in your email app. You review it and hit send."}</p>
  </form>;
}
