'use client';

import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalContent,
  useDisclosure
} from '@nextui-org/react';
import Image from 'next/image';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { baseURL } from '@/actions/variables';
import { IPost } from '@/lib/mongoose/models/Post/types';

type Props = {
  post: IPost;
};

export default function PostUserWithFollowStatus({ post }: Props) {
  const avatar = post.user.avatar ?? `${baseURL}/default_avatar.jpg`;
  const date = Intl.DateTimeFormat('en-US').format(new Date(post.createdAt));
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <div className="flex items-center gap-4">
        <Image
          width={45}
          height={45}
          className="rounded-full flex-shrink-0 w-[45px] aspect-square "
          alt="avatar"
          src={avatar}
        />
        <div className="font-semibold">
          {post.user.username}
          <span className="text-skin-accent text-sm font-semibold">
            &nbsp; •&nbsp; <span className="text-foreground">Following</span>
          </span>
        </div>
      </div>
      <PostOptions post={post} />
    </div>
  );
}

const PostOptions = ({ post }: { post: IPost }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menu = [
    { key: 'report', callback: () => {}, name: 'Report' },
    { key: 'unfollow', callback: () => {}, name: 'Unfollow' },
    { key: 'addToFavorites', callback: () => {}, name: 'Add to favorites' },
    { key: 'goToPost', callback: () => {}, name: 'Go to post' },
    { key: 'shareTo', name: 'Share to...', callback: () => {} },
    { key: 'copyLink', name: 'Copy Link', callback: () => {} },
    { key: 'embed', name: 'Embed', callback: () => {} },
    { key: 'aboutThisAccount', name: 'About this account', callback: () => {} },
    { key: 'cancel', name: 'Cancel', callback: () => {} }
  ];

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        variant="light"
        isIconOnly
        color="default"
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </Button>

      <Modal
        backdrop="blur"
        size="xs"
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Listbox
                variant="light"
                className="text-center"
                aria-label="Actions"
                onAction={(key) => {
                  if (key !== 'cancel') {
                    alert(key);
                  }
                  onClose();
                }}
              >
                {menu.map(({ key, name }, i) => (
                  <ListboxSection key={key} showDivider={i + 1 !== menu.length}>
                    <ListboxItem
                      key={key}
                      color={i === 0 || i === 1 ? 'danger' : 'default'}
                      className={`${i === 0 || i === 1 ? 'text-danger' : ''}`}
                    >
                      {name}
                    </ListboxItem>
                  </ListboxSection>
                ))}
              </Listbox>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
