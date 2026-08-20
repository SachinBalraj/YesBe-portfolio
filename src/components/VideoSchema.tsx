interface VideoSchemaProps {
  video: {
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    publishedDate: string;
    duration: string;
  };
}

export function VideoSchema({ video }: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnail],
    uploadDate: video.publishedDate,
    duration: video.duration,
    contentUrl: video.url,
    embedUrl: video.url,
    publisher: {
      "@type": "Organization",
      "@id": "https://www.yesbe.tech/#organization",
      name: "YesBe Technologies",
      logo: {
        "@type": "ImageObject",
        url: "https://www.yesbe.tech/YBlogo.png",
      },
    },
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
}
