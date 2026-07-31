import { buildYoutubeSearchUrl } from "@/config/youtube";

export async function fetchYoutubeVideos(channelId: string, maxResults = 12) {
  if (!channelId) return [];

  const searchUrl = buildYoutubeSearchUrl(`search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video`);
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();
  const ids = searchData.items?.map((item: any) => item.id.videoId).filter(Boolean).
    join(",");

  if (!ids) return [];

  const detailsUrl = buildYoutubeSearchUrl(`videos?part=snippet,contentDetails,statistics&id=${ids}`);
  const detailsResponse = await fetch(detailsUrl);
  const detailsData = await detailsResponse.json();

  return detailsData.items?.map((item: any) => ({
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url,
    url: `https://www.youtube.com/watch?v=${item.id}`,
    videoId: item.id,
    category: item.snippet.categoryId || "Video",
    duration: item.contentDetails.duration,
    platform: "YouTube",
    publishedDate: item.snippet.publishedAt,
    tags: item.snippet.tags ?? [],
    viewCount: item.statistics?.viewCount ?? 0,
  })) ?? [];
}
