'use client';

import Image from 'next/image';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  User,
  useDisclosure
} from '@nextui-org/react';
import { useSidebarContext } from './SidebarContext';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { baseURL } from '@/actions/variables';
import { createPost } from '@/actions/server/post';

export default function CreateBtn() {
  const { isDenseSidebar } = useSidebarContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useSession();
  const [preview, setPreview] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPreview([]);
    }
  }, [isOpen]);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!data?.user.id) return;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        console.log(url);
        setPreview((val) => [...val, url]);
      }
      setFileList(files);
    }
  };

  const nextPreview = () => {
    setPreviewIndex((val) => {
      if (val === preview.length - 1) {
        return 0;
      }
      return (val += 1);
    });
  };

  const prevPreview = () => {
    setPreviewIndex((val) => {
      if (val === 0) {
        return preview.length - 1;
      }
      return (val -= 1);
    });
  };

  const defaultAvatar = data?.user.avatar ?? `${baseURL}/default_profile.jpg`;

  const btnSubmitRef = useRef<HTMLButtonElement | null>(null);

  const submitPost = createPost.bind(null, fileList);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="light"
        size="lg"
        className={`flex ${
          isDenseSidebar
            ? 'justify-center'
            : 'xl:justify-start justify-center xl:pl-4 xl:w-[200px] w-max'
        } `}
        startContent={<PlusCircleIcon className="w-7 h-7" />}
        isIconOnly
      >
        {!isDenseSidebar && (
          <span className={'font-normal xl:block hidden pl-3'}>Create</span>
        )}
      </Button>
      <input
        ref={ref}
        type="file"
        hidden
        multiple
        onChange={onChangeFileInput}
      />
      <Modal
        hideCloseButton
        size={preview.length > 0 ? '4xl' : 'lg'}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="h-[80vh] p-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex border-b border-skin-base gap-1 items-center justify-center">
                {preview.length > 0 && <div className="flex-1" />}
                <div className="flex-1 flex justify-center">Create Post</div>
                {preview.length > 0 && (
                  <div className="flex-1 flex justify-end">
                    <Button
                      onClick={() => btnSubmitRef.current?.click()}
                      className="font-semibold"
                      variant="light"
                      color="primary"
                    >
                      Post
                    </Button>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="flex items-center justify-center">
                {preview.length > 0 ? (
                  <div className="flex gap-2 w-full h-full">
                    <div className="relative max-w-lg w-full h-full rounded-lg">
                      {preview.length > 1 && (
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
                        src={preview[previewIndex]}
                        fill
                        className="object-cover"
                      />
                      {preview.length > 1 && (
                        <Button
                          onClick={nextPreview}
                          variant="flat"
                          className={`absolute top-1/2 right-3 z-50 `}
                          isIconOnly
                          startContent={
                            <ChevronRightIcon className="w-5 h-5" />
                          }
                        />
                      )}
                      {preview.length > 1 && (
                        <div
                          className={`absolute flex rounded-full gap-1 items-center bottom-3 left-1/2 -translate-x-1/2`}
                        >
                          {Array(preview.length)
                            .fill('')
                            .map((_, i) => (
                              <div
                                key={i}
                                onClick={() => setPreviewIndex(i)}
                                className={`w-2 h-2 shadow rounded-full cursor-pointer ${
                                  i === previewIndex
                                    ? 'bg-blue-500'
                                    : 'bg-slate-300'
                                }`}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                    <form
                      action={submitPost}
                      className="w-full flex flex-col items-start gap-4 pl-4 py-2 max-w-xs h-full"
                    >
                      <User
                        name={data?.user.username}
                        avatarProps={{ src: defaultAvatar }}
                      />
                      <textarea
                        name="description"
                        className="h-full bg-transparent outline-none w-full rounded-lg resize-none"
                        placeholder="Enter your description"
                      />
                      <Input
                        name="location"
                        variant="faded"
                        endContent={<MapPinIcon className="w-6 h-6" />}
                        placeholder="Add Location"
                      />
                      <button hidden type="submit" ref={btnSubmitRef} />
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col gap-4">
                    <Icon />
                    <h1 className="font-medium text-lg">
                      Drag and drop your files here
                    </h1>
                    <Button
                      onClick={() => ref.current?.click()}
                      className="font-semibold px-6"
                      color="primary"
                    >
                      Pick files
                    </Button>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const Icon = () => (
  <svg
    aria-label="Ikon untuk mewakili media seperti gambar atau video"
    className="x1lliihq x1n2onr6 x5n08af"
    fill="currentColor"
    height="77"
    role="img"
    viewBox="0 0 97.6 77.3"
    width="96"
  >
    <title>Ikon untuk mewakili media seperti gambar atau video</title>
    <path
      d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
      fill="currentColor"
    ></path>
    <path
      d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
      fill="currentColor"
    ></path>
    <path
      d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
      fill="currentColor"
    ></path>
  </svg>
);
