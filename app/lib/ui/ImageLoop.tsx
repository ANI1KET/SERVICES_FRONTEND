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
    <Image
      fill
      sizes="100%"
      loading="lazy"
      src={images[currentIndex]}
      alt={`Slide ${currentIndex}`}
      style={{
        objectFit: 'fill',
        objectPosition: 'center',
      }}
      // sizes="(max-width: 768px) 100vw, (min-width: 769px) 100vw"
    />
  );
};

export default ImageLoop;
