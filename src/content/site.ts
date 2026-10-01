export const site = {
  name: "Emmanuel Ayeniko",
  firstName: "Emmanuel",
  role: "Full-Stack & AI Product Engineer",
  title: "Emmanuel Ayeniko — Full-Stack & AI Product Engineer",
  description:
    "Product-minded Full-Stack and AI Engineer with 5+ years building production SaaS, event-commerce and e-commerce products. Founder of Tallyn.",
  url: "https://emmanuelayeniko.com",
  email: "ayenikoemmanuel06@gmail.com",
  location: "United Kingdom",
  timeZone: "Europe/London",
  // Carried over from v1 — swap in the latest CV link when ready.
  resumeUrl:
    "https://drive.google.com/file/d/17Uv_QVmugUmsfoHLnfa6ZAfX_dFZ4JDx/view?usp=sharing",
  portrait:
    "https://res.cloudinary.com/djabkdvek/image/upload/v1748168288/photo_yvb19n.jpg",
  // Same photo, face-cropped square by Cloudinary for small avatars.
  avatar:
    "https://res.cloudinary.com/djabkdvek/image/upload/c_thumb,g_face,w_320,h_320/v1748168288/photo_yvb19n.jpg",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/emmanuel-ayeniko-72a758258/",
    },
    { label: "GitHub", href: "https://github.com/NIKO-DEV06" },
  ],
  founderOf: { name: "Tallyn", href: "https://www.tallyn.app" },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
