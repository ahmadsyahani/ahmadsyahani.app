import type { Metadata } from "next";
import { ArrowDownRight, Smile, MapPin } from "lucide-react";
import { BackLink, EmailButton, SocialLinks } from "@/components/studio/Studio";
import { DrawLabel, WordReveal } from "@/components/studio/Motion";
import ContactComposer from "@/components/studio/ContactComposer";
import { personalInfo } from "@/lib/data";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main id="main-content" className="subpage contact-page">
    <BackLink />
    <header className="contact-intro">
      <DrawLabel color="purple">Say hello</DrawLabel>
      <h1><WordReveal text="Got an idea? I'm all ears." /></h1>
      <p>A new project, a collaboration, or just a friendly hello. Leave a little note and let?s start there.</p>
    </header>
    <div className="contact-desk">
      <section className="contact-postcard" aria-label="Write your message">
        <ContactComposer />
      </section>
      <aside className="contact-sidebar" aria-label="Other ways to connect">
        <div className="contact-note">
          <span className="contact-tape" aria-hidden="true" />
          <Smile className="contact-note-smile" size={40} strokeWidth={1.5} aria-hidden="true" />
          <h2>Good things start<br />with a hello.</h2>
          <p>Prefer a direct email? Copy my address and say hi.</p>
          <EmailButton />
          <span className="contact-location"><MapPin size={15} aria-hidden="true" />{personalInfo.location}</span>
        </div>
        <div className="contact-socials"><h2>Or find me here</h2><SocialLinks /></div>
        <p className="contact-side-caption">Your next idea starts here <ArrowDownRight size={28} strokeWidth={1.5} aria-hidden="true" /></p>
      </aside>
    </div>
  </main>;
}
