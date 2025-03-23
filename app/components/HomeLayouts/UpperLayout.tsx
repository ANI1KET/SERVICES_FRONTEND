import Image from 'next/image';

const UpperLayout = () => {
  return (
    <section className="relative h-[50vh]">
      <Image
        src="/a.jpeg"
        alt="Image description"
        fill
        className="object-cover"
      />
    </section>
  );
};

export default UpperLayout;
