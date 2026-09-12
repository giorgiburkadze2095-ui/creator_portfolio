// Site-wide SEO and social-sharing defaults. Edit the values below directly —
// they feed <title>, <meta name="description">, and the Open Graph /
// Twitter card tags rendered by components/shared/SEO.js on every page.
//
// Images referenced here are NOT uploaded by any system in this app — place
// the actual files by hand in client/public/seo/ using the exact filenames
// below (paths are relative to the site root, so they resolve to
// https://<your-domain>/seo/<file>.jpg once deployed):
//   - client/public/seo/og-image.jpg   -> ogImage (social share / cover image)
//   - client/public/seo/page-image.jpg -> pageImage (optional page/title image, reserved below)
export const SEO = {
  title: 'Giorgi Burkadze — Creator',
  description:
    "Giorgi Burkadze is a creator from Georgia exploring creativity, fitness, music, personal growth, and the process of discovering what we are capable of.",
  ogTitle: 'Giorgi Burkadze — Creator',
  ogDescription:
    "A journey through creativity, fitness, music, and discovering what I'm capable of.",
  ogImage: '/seo/og-image.jpg',
  ogImageAlt: 'Giorgi Burkadze — Creator',

  // Reserved for a distinct page/title image (e.g. a banner shown on the
  // page itself, separate from the social-preview ogImage above). Not wired
  // into any component yet — the SEO component accepts an optional `image`
  // prop that a page can pass this value into if/when one is needed.
  pageImage: '/seo/page-image.jpg',
};
