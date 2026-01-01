import { TFeedPost } from "@/features/post/query";
import { cn } from "@/utils";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import VerifiedAccountIndicator from "./VerifiedAccountIndicator";

type Props = {
  post: TFeedPost;
};

export default function FeedPostCard({ post }: Props) {
  const hasStory = true;
  const imageSrc = "https://avatars.githubusercontent.com/u/97165289";
  const username = post.owner.username;
  return (
    <div className="my-4">
      <div className="max-w-md mx-auto bg-background text-foreground rounded-lg overflow-hidden">
        {/* 1. HEADER */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            {/* Avatar with Story Ring */}
            <div className="flex flex-none flex-col items-center space-y-1 w-max">
              {/* Outer Gradient Ring */}
              <div
                className={cn(
                  "flex flex-none items-center justify-center rounded-full p[2px",
                  hasStory
                    ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600"
                    : "bg-gray-300"
                )}
              >
                {/* Inner Gap (Black) */}
                <div className="bg-background flex-none rounded-full p-[2px]">
                  {/* Profile Image */}
                  <Image
                    src={post.owner.image ?? "/default.jpg"}
                    alt={"avatar"}
                    width={100}
                    height={100}
                    className="size-8 rounded-full object-cover border border-gray-900"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{post.owner.name}</span>
                <VerifiedAccountIndicator />
                <span className="text-gray-400 text-sm">• 3h</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-none">
                {post.location}
              </p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
        {/* 2. IMAGE CONTENT */}
        <div className="relative aspect-auto w-full bg-zinc-900">
          <img
            src="https://images.unsplash.com/photo-1722478603253-d47ebd662b18?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Post content"
            className="w-full h-full object-cover"
          />
          {/* Overlay Text (optional based on image) */}
          <div className="absolute bottom-10 left-4 right-4">
            <h2 className="text-2xl font-black leading-tight uppercase tracking-tight">
              Zohran Mamdani Sworn In As{" "}
              <span className="text-cyan-400">
                New York City's First Muslim Mayor
              </span>
            </h2>
          </div>
        </div>
        {/* 3. ACTION BUTTONS */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Heart className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
              <MessageCircle className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
              <Send className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
            </div>
            <Bookmark className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
          </div>
          {/* 4. LIKES & CAPTION */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">43.6K likes</p>
            <div className="text-sm">
              <span className="font-semibold mr-2">muslim</span>
              <span className="text-gray-200">
                Zohran Mamdani has officially been sworn in as the 112th Mayor
                of New York City. 🗽
                <span className="text-blue-400 ml-1">@zohrankmamdani</span>
              </span>
            </div>
            <button className="text-gray-400 text-sm block mt-1">
              See translation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
