// import Image from 'next/image';
// import { useEffect, useRef } from 'react';

// interface ImageSliderProps {
//   photos: string[];
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ photos }) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const scrollInterval = setInterval(() => {
//       if (containerRef.current) {
//         const container = containerRef.current;
//         const firstChild = container.firstChild as HTMLElement;
//         const containerWidth = container.offsetWidth;

//         if (firstChild) {
//           container.scrollBy({
//             left: firstChild.offsetWidth,
//             behavior: 'smooth',
//           });
//         }

//         if (container.scrollLeft + containerWidth >= container.scrollWidth) {
//           container.scrollTo({ left: 0, behavior: 'smooth' });
//         }
//       }
//     }, 1500);

//     return () => clearInterval(scrollInterval);
//   }, []);

//   return (
//     <div ref={containerRef} className="flex overflow-x-scroll">
//       {photos.map((image, index) => (
//         <div
//           key={index}
//           className="relative min-w-[25%] max-sm:min-w-[33.33%] aspect-square"
//         >
//           <Image
//             fill
//             loading="lazy"
//             src={image}
//             alt={`Slide ${index}`}
//             style={{
//               objectFit: 'fill',
//               objectPosition: 'center',
//             }}
//             sizes="100%"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageSlider;

import Image from 'next/image';
import { memo, useEffect, useRef } from 'react';

interface ImageSliderProps {
  photos: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = memo(({ photos }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false); // To prevent overlap in scroll events

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        const totalWidth = container.scrollWidth / 2; // Half since we've duplicated images
        if (container.scrollLeft >= totalWidth) {
          isAnimatingRef.current = true; // Prevent smooth scroll during reset
          container.scrollLeft = 0;
          isAnimatingRef.current = false;
        }
      }
    };

    const scrollInterval = setInterval(() => {
      if (container && !isAnimatingRef.current) {
        const firstChild = container.firstChild as HTMLElement;

        if (firstChild) {
          container.scrollBy({
            left: firstChild.offsetWidth,
            behavior: 'smooth',
          });
        }
      }
    }, 1500);

    container?.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(scrollInterval);
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll scrollbar-hide"
      style={{
        scrollBehavior: isAnimatingRef.current ? 'auto' : 'smooth',
      }}
    >
      {[...photos, ...photos].map((image, index) => (
        <div
          key={index}
          className="relative min-w-[25%] max-sm:min-w-[33.33%] aspect-square"
        >
          <Image
            fill
            src={image}
            // unoptimized
            loading="lazy"
            alt={`Slide ${index}`}
            style={{
              objectFit: 'fill',
              objectPosition: 'center',
            }}
            sizes="100%"
          />
        </div>
      ))}
    </div>
  );
});

ImageSlider.displayName = 'ImageSlider';
export default ImageSlider;
