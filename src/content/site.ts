export const site = {
  name: 'Emmanuel Ayeniko',
  firstName: 'Emmanuel',
  role: 'Full-Stack & AI Product Engineer',
  title: 'Emmanuel Ayeniko • Full-Stack & AI Product Engineer',
  description:
    'Product-minded Full-Stack and AI Engineer with 5+ years building production SaaS, event-commerce and e-commerce products. Founder of Tallyn.',
  // The www address is the live one; Vercel redirects the bare domain to it,
  // so canonical and share links point here rather than through a redirect.
  url: 'https://www.emmanuelayeniko.com',
  email: 'ayenikoemmanuel06@gmail.com',
  location: 'United Kingdom',
  timeZone: 'Europe/London',
  // Served from public/; replace that file to update the CV.
  resumeUrl: '/Emmanuel_Ayeniko_Full_Stack_Engineer_CV.pdf',
  portrait:
    'https://res.cloudinary.com/djabkdvek/image/upload/v1748168288/photo_yvb19n.jpg',
  // Same photo, face-cropped square by Cloudinary for small avatars.
  avatar:
    'https://res.cloudinary.com/djabkdvek/image/upload/c_thumb,g_face,w_320,h_320/v1748168288/photo_yvb19n.jpg',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/emmanuel-ayeniko-72a758258/',
    },
    { label: 'GitHub', href: 'https://github.com/NIKO-DEV06' },
  ],
  founderOf: { name: 'Tallyn', href: 'https://www.tallyn.app' },
  currently: [
    { role: 'Founder', org: 'Tallyn', href: 'https://www.tallyn.app' },
    { role: 'Software Engineer', org: 'Bloco' },
  ],
} as const;

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;
