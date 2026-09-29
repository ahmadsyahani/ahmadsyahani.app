import type { Metadata } from "next";
import { BackLink, EmailButton, Frame, PageIntro, SocialLinks } from "@/components/studio/Studio";
import ContactComposer from "@/components/studio/ContactComposer";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main id="main-content" className="subpage contact-page"><BackLink /><PageIntro label="Start a conversation" title="Good things start with a hello." description="Have an idea, an opportunity, or just want to say hi? I’d love to hear from you." /><div className="contact-details"><div><span className="small-label">Write to me</span><EmailButton /></div><div><span className="small-label">Find me elsewhere</span><SocialLinks /></div></div><Frame className="contact-form-frame" color="green" label="Your next idea"><ContactComposer /></Frame></main>;
}
