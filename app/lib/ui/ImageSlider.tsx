'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

import { ArrowLeftIcon, ArrowRightIcon, CrossIcon } from '../icon/svg';

interface ImageSliderProps {
  imagesUrl: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ imagesUrl }) => {
  const touchStartX = useRef<number | null>(null);
  const [positionIndexes, setPositionIndexes] = useState<number[]>(
    imagesUrl.map((_, index) => index)
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    Math.floor(imagesUrl.length / 2)
  );

  const extendedPositions = [
    ...Array.from(
      { length: Math.floor(imagesUrl.length / 2) },
      (_, i) => `left${Math.floor(imagesUrl.length / 2) - i}`
    ),
    'center',
    ...Array.from(
      { length: Math.floor(imagesUrl.length / 2) },
      (_, i) => `right${i + 1}`
    ),
  ].slice(0, imagesUrl.length);

  const imageVariants = extendedPositions.reduce((acc, pos, index) => {
    const centerIndex = extendedPositions.indexOf('center');
    const distanceFromCenter = Math.abs(centerIndex - index);

    acc[pos] = {
      x: pos === 'center' ? '0%' : `${(index - centerIndex) * 100}%`,
      scale: Math.max(1 - distanceFromCenter * 0.25, 0.2),
    };
    return acc;
  }, {} as Record<string, { x: string; scale: number }>);

  const handleNext = () => {
    setPositionIndexes((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setSelectedIndex(
      (prev) => (prev - 1 + imagesUrl.length) % imagesUrl.length
    );
  };

  const handleBack = () => {
    setPositionIndexes((prev) => [...prev.slice(1), prev[0]]);
    setSelectedIndex((prev) => (prev + 1) % imagesUrl.length);
  };

  const handleDotClick = (index: number) => {
    setPositionIndexes((prev) => {
      const currentCenterIndex = Math.floor(prev.length / 2);

      if (prev[currentCenterIndex] === index) {
        return prev;
      }

      const currentIndex = prev.indexOf(index);
      const shift = currentCenterIndex - currentIndex;

      return prev.map((_, i) => prev[(i - shift + prev.length) % prev.length]);
    });

    setSelectedIndex(index);
  };

  // const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
  //   if (e.deltaX > 0) handleNext();
  //   else if (e.deltaX < 0) handleBack();
  // };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartX.current) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    if (diff > 50) {
      handleBack();
      touchStartX.current = null;
    } else if (diff < -50) {
      handleNext();
      touchStartX.current = null;
    }
  };

  return (
    <>
      <div
        className="w-screen h-[50vh] max-sm:h-[40vh] max-xsm:h-[35vh] flex flex-col items-center relative overflow-x-hidden"
        // onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {imagesUrl.map((image, index) => {
          return (
            <motion.div
              key={index}
              initial="center"
              variants={imageVariants}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute' }}
              onClick={() => setPreviewImage(image)}
              animate={extendedPositions[positionIndexes[index]]}
              className={`w-[20%] max-sm:w-[35%] h-[45vh] max-sm:h-[35vh] max-xsm:h-[30vh] cursor-pointer `}
            >
              <Image
                fill
                src={image}
                loading="lazy"
                alt={`Slide ${index}`}
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 35%, 20%"
              />
            </motion.div>
          );
        })}
        <div className="flex flex-row gap-3 absolute bottom-0">
          <button onClick={handleBack}>
            <ArrowLeftIcon />
          </button>
          <div className="flex flex-row-reverse items-center justify-center gap-2">
            {positionIndexes.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    selectedIndex === index ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  onClick={() => handleDotClick(index)}
                ></div>
              );
            })}
          </div>
          <button onClick={handleNext}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {previewImage && (
        <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
          <div className="relative w-[85vw] h-[85vh]">
            <Image
              fill
              alt="Preview"
              loading="lazy"
              src={previewImage}
              style={{ objectFit: 'contain' }}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-gray-600 rounded-full p-1"
            >
              <CrossIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
