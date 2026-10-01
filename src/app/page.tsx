import { Capabilities } from "@/components/sections/capabilities";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { RadialMarquee } from "@/components/sections/radial-marquee";
import { Work } from "@/components/sections/work";
import { site } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  image: site.portrait,
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  sameAs: site.socials.map((social) => social.href),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Coventry University" },
  founder: {
    "@type": "Organization",
    name: site.founderOf.name,
    url: site.founderOf.href,
  },
};

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Intro />
      <Work />
      <Capabilities />
      <RadialMarquee />
      <Experience />
    </main>
  );
}
