import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/projects", "/contact", ...projects.map(p => `/project/${p.id}`)];
  return paths.map(path => ({ url: `https://ahmadsyahani.app${path}`, changeFrequency: "monthly", priority: path ? .7 : 1 }));
}
