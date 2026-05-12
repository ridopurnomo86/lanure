"use client";

import React from "react";

type VideoReviewsPropsType = {
  videos: { url: string; type: string }[];
};

const VideoReviews = ({ videos }: VideoReviewsPropsType) => {
  if (!videos || videos.length === 0) return null;

  const getEmbedUrl = (url: string, type: string) => {
    if (type === "youtube") {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
    }
    // For TikTok and Instagram, embedding is more complex without their SDKs
    // We'll return the original URL and handle it in the UI or use a placeholder
    return url;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 border-t border-gray-100">
      <h2 className="text-3xl font-serif text-ceramide-text-dark text-center mb-12">
        See It In Action
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-xl relative group"
          >
            {video.type === "youtube" ? (
              <iframe
                src={getEmbedUrl(video.url, video.type)}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-white text-sm font-medium mb-4">
                  Watch on {video.type === "tiktok" ? "TikTok" : "Instagram"}
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  Open Video
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoReviews;
