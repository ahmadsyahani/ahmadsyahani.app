import Link from "@/components/studio/Navigation";
import { ArrowRight } from "lucide-react";

export default function NotFound() { return <main id="main-content" className="subpage not-found"><span className="small-label">404 / Out of the canvas</span><h1>This page wandered off.</h1><p>Let’s get you back to something that exists.</p><Link className="outlined-button" href="/"><span className="button-fill" aria-hidden="true"><i /><i /><i /></span><span className="button-label">Back to home <ArrowRight size={17} /></span></Link></main>; }
