import PostCard from '@/components/card/Post/PostCard';
import SuggestedUserCard from '@/components/card/SuggestedUserCard';
import HomeFooter from '@/components/footer/HomeFooter';
import SearchInput from '@/components/input/SearchInput';
import StoryBar from '@/components/top-bar/StoryBar';
import TopBar from '@/components/top-bar/TopBar';
import { Button, Spacer } from '@nextui-org/react';

export default async function HomePage() {
  return (
    <div className="flex h-full w-full gap-4">
      <div className="flex-[2] h-full w-full">
        <TopBar />
        <div className="h-max max-w-xl w-full mx-auto xl:pb-6 ">
          <StoryBar />
        </div>
        <div className="mx-auto z-50 h-max lg:max-w-lg md:max-w-md sm:max-w-sm w-full flex flex-col gap-10 xl:pb-20 pb-10">
          <PostCard />
          <PostCard />
        </div>
      </div>
      <div className="flex-1 sticky h-screen top-0 max-w-[300px] lg:block hidden">
        <div className="h-[90px] w-full sticky top-0 flex items-center">
          <SearchInput />
        </div>
        <div className="px-2">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm text-skin-accent">
              Suggested for you
            </h1>
            <Button
              color="default"
              size="sm"
              variant="light"
              href="/"
              className="font-semibold text-skin-accent"
            >
              See all
            </Button>
          </div>
        </div>
        <Spacer y={2} />
        <>
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
          <SuggestedUserCard />
        </>
        <Spacer y={4} />
        <HomeFooter />
        <Spacer y={4} />
        <p className="uppercase text-skin-accent text-sm">
          &copy; {new Date().getFullYear()} nextgram by arridha amrad
        </p>
      </div>
    </div>
  );
}
