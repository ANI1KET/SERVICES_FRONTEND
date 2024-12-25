'use client';

import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="flex max-xsm:flex-col gap-1 p-1 relative mb-5 max-xsm:p-0 max-xsm:gap-0 ">
      <div className="relative w-[45vw] max-xsm:w-screen aspect-video overflow-hidden rounded-xl max-xsm:rounded-none ">
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
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent pointer-events-auto"></div>
      </div>

      <div className="w-[56vw] max-xsm:w-screen p-2 absolute right-1 top-2 bottom-2 max-xsm:static max-xsm:-mt-3 max-xsm:-z-0 overflow-hidden rounded-xl bg-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deserunt
        modi doloribus ea eos quia natus quasi officiis consequuntur. Id maxime
        sit error optio est, nemo eveniet? Possimus cumque ratione, sapiente
        aliquam, id adipisci quas voluptatibus odit labore debitis aspernatur
        dolore provident, maxime recusandae praesentium impedit similique
        aliquid at atque. Cum rem eligendi consequuntur aliquid voluptatem
        sapiente ipsum, atque praesentium et nihil vel delectus perspiciatis ea
        assumenda, neque expedita, voluptatum placeat enim harum beatae quod d
        explicabo aliquam laboriosam, aut culpa? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Tenetur fugit quibusdam dolore laudantium
        natus odit hic fugiat! Laboriosam quidem cupiditate iusto expedita
        perspiciatis cum ducimus officiis dolorum? Omnis delectus quod, dolorem
        quibusdam explicabo atque. Iure quo at numquam? Explicabo quasi
        distinctio eius! Magnam recusandae odio beatae in nihil ex praesentium
        et deserunt minima? Porro iste placeat magni optio. Voluptatem nobis
        explicabo optio deserunt eius quaerat rem mollitia alias omnis,
        laboriosam placeat illum maxime corrupti, totam repellendus debitis
        molestiae tenetur, ea aliquid sint consequatur? Asperiores, architecto
        deserunt dolorum modi pariatur quia iusto, dolore illo velit aspernatur
        cum laudantium culpa quos? Quos.
      </div>
    </div>
  );
};

export default VideoPlayer;
