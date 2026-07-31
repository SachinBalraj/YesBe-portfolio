export interface VideoItem {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  videoId?: string;
  category: string;
  duration: string;
  platform: "YouTube" | "YouTube Shorts" | "Instagram Reels" | "LinkedIn";
  publishedDate: string;
  tags: string[];
  featured?: boolean;
}

export const VIDEO_CATEGORIES = [
  "All Videos",
  "AI",
  "ERP",
  "Power BI",
  "Automation",
  "SEO",
  "Digital Marketing",
  "Cloud",
  "Cybersecurity",
  "Case Studies",
  "Project Walkthroughs",
  "Founder Videos",
];

export const videos: VideoItem[] = [
  {
    title: "AI Automation for Business Growth",
    description: "How AI automation saves time, reduces errors, and drives scalable growth for modern enterprises.",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    videoId: "VIDEO_ID",
    category: "AI",
    duration: "8:12",
    platform: "YouTube",
    publishedDate: "2026-07-12",
    tags: ["AI", "Automation", "Business", "YouTube"],
    featured: true,
  },
  {
    title: "ERP vs CRM: What Every Business Should Know",
    description: "A clear comparison of ERP and CRM systems and when each tool delivers the most value.",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_2",
    videoId: "VIDEO_ID_2",
    category: "ERP",
    duration: "9:44",
    platform: "YouTube",
    publishedDate: "2026-06-28",
    tags: ["ERP", "CRM", "Business", "YouTube"],
  },
  {
    title: "Founder Insights: Why YesBe Was Built",
    description: "A founder video about our mission, vision, and the future of business technology.",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID_3/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_3",
    videoId: "VIDEO_ID_3",
    category: "Founder Videos",
    duration: "5:20",
    platform: "LinkedIn",
    publishedDate: "2026-07-05",
    tags: ["Founder", "Vision", "Leadership"],
  },
];
