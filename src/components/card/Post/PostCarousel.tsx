import { IPost } from '@/lib/mongoose/models/Post/types';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  post: IPost;
};

const PostCarousel = ({ post }: Props) => {
  const total = post.images.length;
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
    <div className="w-full group h-full relative max-h-[900px] overflow-hidden border border-skin-base">
      {total > 1 && (
        <Button
          onClick={prevPreview}
          variant="flat"
          className={`absolute group-hover:opacity-100 opacity-0 top-1/2 -translate-y-1/2 left-3`}
          isIconOnly
          startContent={<ChevronLeftIcon className="w-5 h-5" />}
        />
      )}
      <Image
        className="object-cover w-full h-auto"
        width={700}
        height={1000}
        priority
        src={post.images[previewIndex].url}
        alt="post"
      />
      {total > 1 && (
        <Button
          onClick={nextPreview}
          variant="flat"
          className={`absolute group-hover:opacity-100 opacity-0 top-1/2 -translate-y-1/2 right-3  `}
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
};
export default PostCarousel;
