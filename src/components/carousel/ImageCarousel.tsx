'use client';

import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon';

type Props = {
  urls: string[];
};

export default function ImageCarousel({ urls }: Props) {
  const total = urls.length;
  const [previewIndex, setPreviewIndex] = useState(0);

  const nextPreview = () => {
    setPreviewIndex((val) => {
      if (val === total - 1) {
        return 0;
      }
      return (val += 1);
    });
  };

  const prevPreview = () => {
    setPreviewIndex((val) => {
      if (val === 0) {
        return total - 1;
      }
      return (val -= 1);
    });
  };
  return (
    <div className="relative group overflow-y-hidden w-full h-full rounded-lg">
      {total > 1 && (
        <Button
          onClick={prevPreview}
          variant="flat"
          className={`absolute group-hover:opacity-100 opacity-0 top-1/2 left-3 -translate-y-1/2`}
          isIconOnly
          startContent={<ChevronLeftIcon className="w-5 h-5" />}
        />
      )}
      <Image
        alt="preview"
        src={urls[previewIndex]}
        height={500}
        width={500}
        priority
        className="object-cover overflow-hidden h-full w-full"
      />
      {total > 1 && (
        <Button
          onClick={nextPreview}
          variant="flat"
          className={`absolute group-hover:opacity-100 opacity-0 top-1/2 right-3 -translate-y-1/2 `}
          isIconOnly
          startContent={<ChevronRightIcon className="w-5 h-5" />}
        />
      )}
      {total > 1 && (
        <div
          className={`absolute flex rounded-full gap-1 items-center bottom-3 left-1/2 -translate-x-1/2`}
        >
          {Array(total)
            .fill('')
            .map((_, i) => (
              <div
                key={i}
                onClick={() => setPreviewIndex(i)}
                className={`w-2 h-2 shadow rounded-full cursor-pointer ${
                  i === previewIndex ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
