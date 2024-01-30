import { Button, Divider, Link, Spacer } from '@nextui-org/react';

import FacebookButton from '@/components/button/FacebookButton';
import ThemeButton from '@/components/button/ThemeButton';
import SuggestedUserCard from '@/components/card/SuggestedUserCard';
import HomeFooter from '@/components/footer/HomeFooter';
import LoginForm from '@/components/form/LoginForm';
import SearchInput from '@/components/input/SearchInput';
import PhoneSlide from '@/components/phone-slide';
import StoryBar from '@/components/top-bar/StoryBar';
import TopBar from '@/components/top-bar/TopBar';
import getServerSideSession from '@/utils/getServerSideSession';
import Image from 'next/image';
import NextLink from 'next/link';
import PostListContainer from '@/components/HomePage/PostListContainer';

export default async function Page() {
  const session = await getServerSideSession();
  return session ? <Home /> : <HomeLogin />;
}

function HomeLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="fixed bottom-5 right-5">
        <ThemeButton />
      </div>
      <div className="lg:w-[936.62px] w-full flex">
        <div className="flex-1 lg:block hidden">
          <div className="h-full w-full mr-0">
            <PhoneSlide />
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-sm lg:mx-0 mx-auto">
            <div className="border border-skin-base rounded-lg px-4">
              <Spacer y={9} />
              <h1 className="text-5xl text-center font-display">nextgram</h1>
              <Spacer y={9} />
              <LoginForm />
              <div className="my-6 relative">
                <Divider />
                <p className="absolute bg-background px-4 py-1 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-skin-accent">
                  OR
                </p>
              </div>
              <FacebookButton type="light" />
              <Spacer y={2} />
              <div className="w-full text-center">
                <Link size="sm" as={NextLink} href="/accounts/password/reset">
                  forgot password?
                </Link>
              </div>
              <Spacer y={4} />
            </div>
            <Spacer y={4} />
            <div className="max-w-sm border border-skin-base rounded-lg py-6">
              <p className="text-center text-small">
                Don&apos;t have an account?{' '}
                <Link
                  as={NextLink}
                  size="sm"
                  className="font-bold text-primary"
                  href="/accounts/emailsignup"
                >
                  Create
                </Link>
              </p>
            </div>
            <Spacer y={4} />
            <div className="max-w-sm">
              <p className="text-center">Get the app</p>
              <Spacer y={4} />
              <div className="flex items-center gap-4 justify-center">
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/y1/r/mgodbVDc7bL.png"
                  alt="App Store"
                  width={136}
                  height={40}
                />
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/yT/r/wA97xtdkY1T.png"
                  alt="App Store"
                  width={136}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  return (
    <div className="flex h-full w-full gap-4">
      <div className="flex-[2] h-full w-full">
        <TopBar />
        <div className="h-max max-w-xl w-full mx-auto xl:pb-6 ">
          <StoryBar />
        </div>
        <Spacer y={10} />
        <PostListContainer />
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
};
