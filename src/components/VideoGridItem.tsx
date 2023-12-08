import { useEffect, useRef, useState } from "react";
import { formatDuration, formatTimeAgo } from "../utils";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    name: string;
    id: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const viewFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export const VideoGridItem = ({
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href="#" className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-300 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
          alt="video thumbnail"
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          src={videoUrl}
          ref={videoRef}
          muted
          playsInline
        ></video>
      </a>
      <div className="flex gap-2">
        <a href="#" className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            className="w-12 h-12 rounded-full"
            alt="channel profile"
          />
        </a>
        <div className="flex flex-col">
          <a href="#" className="font-bold">
            {title}
          </a>
          <a href="#" className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {viewFormatter.format(views)} Views・{formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
