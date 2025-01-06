'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageLoop = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute top-0 w-full h-full">
      <Image
        fill
        loading="lazy"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{
          objectFit: 'fill',
          objectPosition: 'center',
        }}
      />
    </div>
  );
};

export default ImageLoop;
