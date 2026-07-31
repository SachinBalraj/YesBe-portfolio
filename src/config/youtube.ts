export const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "";
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";

export const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export function buildYoutubeSearchUrl(partial: string) {
  return `${YOUTUBE_API_URL}/${partial}&key=${YOUTUBE_API_KEY}`;
}
