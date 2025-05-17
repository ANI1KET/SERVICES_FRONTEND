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
          url={videoUrl}
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
          style={{ pointerEvents: 'none' }}
        />
      ) : (
        <div className="h-full grid place-items-center border-2 border-black">
          Video not available
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
