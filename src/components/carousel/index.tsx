'use client';

import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon';

type Props = {
  urls: string[];
};

export default function Carousel({ urls }: Props) {
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
    <div className="relative max-w-lg w-full h-full rounded-lg">
      {total > 1 && (
        <Button
          onClick={prevPreview}
          variant="flat"
          className={`absolute top-1/2 left-3 z-50`}
          isIconOnly
          startContent={<ChevronLeftIcon className="w-5 h-5" />}
        />
      )}
      <Image
        alt="preview"
        src={urls[previewIndex]}
        fill
        className="object-cover"
      />
      {total > 1 && (
        <Button
          onClick={nextPreview}
          variant="flat"
          className={`absolute top-1/2 right-3 z-50 `}
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
