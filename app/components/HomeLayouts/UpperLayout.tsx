import Image from 'next/image';

const UpperLayout = () => {
  return (
    <section className="relative h-[45vh]">
      <Image
        fill
        priority
        src="/a.jpeg"
        alt="Image description"
        className="object-cover"
      />
    </section>
  );
};

export default UpperLayout;
