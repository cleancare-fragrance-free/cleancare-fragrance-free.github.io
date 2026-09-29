// Featured-tab order observed on 2026-09-29. Facebook may change this order.
// Summaries are original, not reproductions of third-party articles or comments.
const group = 'https://www.facebook.com/groups/391954731491131/posts/';
// Local editorial thumbnails preserve the official source images checked 2026-09-29.
// Each source remains linked for attribution and context.
const photos = [
  {
    provider: 'local',
    src: 'images/featured/nippon-scent-article.jpg',
    photographer: 'Nippon.com',
    sourceUrl: 'https://www.nippon.com/en/in-depth/d00703/',
    alt: 'Nippon.com illustration of scented laundry products releasing particles into the air',
    position: 'center',
    note: 'Official article illustration from the publisher.',
  },
  {
    provider: 'local',
    src: 'images/featured/dr-barrett-video.jpg',
    photographer: 'Dr. Barrett / YouTube',
    sourceUrl: 'https://youtu.be/Mgg5TRYq3d4',
    alt: 'Dr. Barrett speaking in the official Why Fragrances Are Actually Bad for You video thumbnail',
    position: 'center',
    note: 'Official video thumbnail from the publisher.',
  },
  {
    provider: 'local',
    src: 'images/featured/miranda-kerr-dr-hyman.png',
    photographer: 'The Dr. Hyman Show',
    sourceUrl: 'https://drhyman.com/blogs/content/podcast-ep1089',
    alt: 'Miranda Kerr and Dr. Mark Hyman in the official artwork for their interview',
    position: 'center 46%',
    note: 'Official episode image from the publisher.',
  },
  {
    provider: 'local',
    src: 'images/featured/fragrance-free-nation.png',
    photographer: 'Fragrance Free Nation',
    sourceUrl: 'https://www.fragrancefreenation.com/',
    alt: 'Fragrance Free Nation canary logo on a light blue background',
    position: 'center',
    note: 'Official publisher artwork.',
  },
  {
    provider: 'local',
    src: 'images/featured/dr-trisha-pasricha-washington-post.jpg',
    photographer: 'The Washington Post / Instagram',
    sourceUrl: 'https://www.instagram.com/reel/DRS_qV4EcpO/',
    alt: 'Dr. Trisha Pasricha in The Washington Post Ask a Doctor video about perfume and health',
    position: 'center 35%',
    note: 'Official reel thumbnail from the publisher.',
    imageTag: 'The Washington Post',
  },
];
export const featuredPosts = [
  {
    slug: 'scent-pollution-in-japan', title: 'The Sweet Danger of Scent Pollution',
    topic: 'Featured reading', art: 'laundry', format: 'Article', sourceName: 'Nippon.com',
    description: 'A look at scented laundry products, shared air, and public concern in Japan.',
    postUrl: group + '993175098035755/', sourceUrl: 'https://www.nippon.com/en/in-depth/d00703/',
    sourceLabel: 'Read the original article', sourceDate: 'July 30, 2021',
    summary: 'This featured article explores complaints about scented household products in Japan, particularly fabric softeners. It discusses fragrance-release microcapsules, community advocacy, and calls for greater investigation and public awareness.',
    context: 'This is reporting and commentary, not a clinical trial. The article itself acknowledges uncertainty about mechanisms and notes selection bias in a survey it discusses. Those survey findings should not be treated as a population-wide estimate or as proof of a diagnosis.',
  },
  {
    slug: 'why-perfumes-stink', title: 'Why Perfumes Stink',
    topic: 'Featured video', art: 'labels', format: 'Video', sourceName: 'Dr. Barrett · video shared in the group',
    description: 'A featured discussion about perfume, ingredient disclosure, and everyday product choices.',
    postUrl: group + '2006357086717546/', sourceUrl: 'https://youtu.be/Mgg5TRYq3d4',
    sourceLabel: 'Watch the linked video',
    summary: 'The group post introduces a video featuring Dr. Barrett and questions the routine use of perfume and cologne. Its discussion focuses on fragrance formulas and reducing unnecessary scented products. Follow the video link to hear the speaker in their own words.',
    context: 'This overview describes the group post; it is not a verified video transcript. A speaker’s opinion is not equivalent to a systematic evidence review. We do not infer that every perfume contains the same ingredients or presents the same risk, and do not endorse essential oils as a universally safe substitute.',
  },
  {
    slug: 'miranda-kerr-fragrance-conversation', title: 'Miranda Kerr on fragrance in everyday products',
    topic: 'Featured video', art: 'research', format: 'Video', sourceName: 'The Dr. Hyman Show · Miranda Kerr interview',
    description: 'An interview clip that started a conversation about fragrance and personal-care routines.',
    postUrl: group + '1991315638221691/', sourceUrl: 'https://drhyman.com/blogs/content/podcast-ep1089',
    sourceLabel: 'Watch the original interview', sourceDate: 'November 12, 2025',
    summary: 'This featured post shares a Mark Hyman video clip of Miranda Kerr discussing synthetic fragrance in everyday products. It offers a starting point for conversations about ingredient choices and the products people use at home.',
    context: 'This is an interview perspective, not a research paper. The post’s broad language about harm should not be read as evidence that every synthetic fragrance is toxic at every exposure level. Open the shared post to see the original clip and publisher attribution; no transcript is reproduced here.',
  },
  {
    slug: 'fragrance-free-home-community', title: 'Rethinking fragrance in the home',
    topic: 'Featured community', art: 'home', format: 'Community post', sourceName: 'Fragrance Free Nation · shared by Van + veronica Haircare',
    description: 'A community invitation to rethink scented household products and what “clean” means.',
    postUrl: group + '1917676692252253/', sourceUrl: group + '1917676692252253/',
    sourceLabel: 'Read the shared community post',
    summary: 'This Fragrance Free Nation post encourages a fragrance-free home and invites readers into its community. Shared in the group by Van + veronica Haircare, it discusses everyday household and personal-care choices and links to the Fragrance Free Nation marketplace.',
    context: 'This is advocacy and promotional content, not independent medical evidence or a Clean Care product endorsement. We have not reproduced the post’s sweeping health claims. Product safety and individual tolerance cannot be guaranteed by a “fragrance-free” label alone.',
    additionalSource: { title: 'Visit Fragrance Free Nation', url: 'https://www.fragrancefreenation.com/' },
  },
  {
    slug: 'phthalates-personal-care-video', title: 'Phthalates and personal care: a doctor explains',
    topic: 'Featured video', art: 'air', format: 'Video', sourceName: 'The Washington Post · Dr. Trisha Pasricha',
    description: 'A Washington Post video introducing questions about phthalates in personal-care products.',
    postUrl: group + '1780131456006778/', sourceUrl: 'https://www.instagram.com/reel/DRS_qV4EcpO/',
    sourceLabel: 'Watch the original Instagram video',
    summary: 'The featured post links to a Washington Post Instagram video with Dr. Trisha Pasricha. The visible source caption introduces concerns about phthalates in personal-care products and identifies the footage as a video from 2024.',
    context: 'This summary is based on the shared caption, not a full transcript. Phthalates are a group of chemicals, not another name for fragrance. A claim about one substance or exposure cannot automatically be extended to every fragranced product. Follow the original publisher for the full explanation and its supporting references.',
  },
].map((post, index) => {
  const photo = photos[index];
  const imageCredit = `Image: ${photo.photographer}. ${photo.note}`;
  return { ...post, order: index + 1, checked: '2026-09-29', href: 'featured/' + post.slug + '/', photo, imageCredit };
});
