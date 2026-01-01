"use client";

import Image from "next/image";

export const StoryAvatar = () => {
  const hasStory = true;
  const imageSrc = "https://avatars.githubusercontent.com/u/97165289";
  const username = "username";

  return (
    <div className="flex items-center gap-x-3 overflow-x-auto">
      <div className="flex flex-none flex-col items-center space-y-1 w-max">
        {/* Outer Gradient Ring */}
        <div
          className={`
                flex flex-none items-center justify-center rounded-full p-[2px] 
                ${
                  hasStory
                    ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600"
                    : "bg-gray-300"
                }
              `}
        >
          {/* Inner Gap (Black) */}
          <div className="bg-black flex-none rounded-full p-[2px]">
            {/* Profile Image */}
            <Image
              src={imageSrc}
              alt={username}
              width={100}
              height={100}
              className="size-20 rounded-full object-cover border border-gray-900"
            />
          </div>
        </div>

        {/* Username with Truncate */}
        <span className="text-xs text-foreground truncate w-full text-center">
          {username}
        </span>
      </div>
    </div>
  );
};
