import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ImageSlider = ({ images }: { images: string[] }) => {
  const [positionIndexes, setPositionIndexes] = useState(
    images.map((_, index) => index)
  );

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % images.length
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      return updatedIndexes;
    });
  };

  const positions = ['center', 'left1', 'left', 'right', 'right1'];

  const extendedPositions = [
    'center',
    ...Array.from(
      { length: Math.floor(images.length / 2) },
      (_, i) => `left${i + 1}`
    ),
    ...Array.from(
      { length: Math.floor(images.length / 2) },
      (_, i) => `right${i + 1}`
    ),
  ].slice(0, images.length);

  const imageVariants = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-50%', scale: 0.7, zIndex: 3 },
    left: { x: '-90%', scale: 0.5, zIndex: 2 },
    right: { x: '90%', scale: 0.5, zIndex: 1 },
    right1: { x: '50%', scale: 0.7, zIndex: 3 },
  };

  return (
    <div className="h-[45vh] flex flex-col justify-center items-center relative ">
      {images.map((image, index) => {
        return (
          <motion.div
            key={index}
            className="h-[30vh] rounded-[12px]"
            initial="center"
            animate={positions[positionIndexes[index]] || 'center'}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: '85%', position: 'absolute' }}
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        );
      })}
      <div className="flex flex-row gap-3 absolute bottom-0">
        <button
          className="text-white bg-black rounded-md p-1 "
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="text-white bg-black rounded-md p-1 "
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
