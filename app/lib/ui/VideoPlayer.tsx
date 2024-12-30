'use client';

import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string | null | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="relative w-[45vw] max-xsm:w-screen aspect-video overflow-hidden rounded-xl max-xsm:rounded-none ">
      {videoUrl ? (
        <ReactPlayer
          loop
          muted
          playing
          width="100%"
          height="100%"
          controls={false}
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                showinfo: 0,
                disablekb: 1,
                modestbranding: 1,
              },
            },
          }}
          url={videoUrl}
        />
      ) : (
        <div className="h-full grid place-items-center border-2 border-black">
          Video not available
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent pointer-events-auto"></div>
    </div>
  );
};

export default VideoPlayer;
