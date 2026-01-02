"use client";

import ChevronIcon from "@/icons/Chevron";
import { cn } from "@/utils";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Button } from "@headlessui/react";
import {
  ActivityIcon,
  BellIcon,
  Compass,
  File,
  HomeIcon,
  Menu,
  MessageSquareQuote,
  MoonIcon,
  PlusSquare,
  SaveIcon,
  Search,
  SettingsIcon,
  SunIcon,
  UserRound,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import LogoutDialog from "./dialog/LogoutDialog";
import MySwitch from "./MySwitch";
import InstagramIcon from "./svg/instagram";

type SidebarProps = {
  username: string;
};

export const Sidebar = ({ username }: SidebarProps) => {
  return (
    <aside className="lg:w-72 sticky top-0 flex flex-col h-screen border-r border-foreground/5 px-2 py-8">
      <SidebarBrand />
      <div className="px-2 space-y-2 flex-1">
        <SidebarLink
          href="/"
          icon={<HomeIcon className="size-6" />}
          label="Home"
        />
        <SidebarLink
          href="/search"
          icon={<Search className="size-6" />}
          label="Search"
        />
        <SidebarLink
          href="/explore"
          icon={<Compass className="size-6" />}
          label="Explore"
        />
        <SidebarLink
          href="/reels"
          icon={<Video className="size-6" />}
          label="Reels"
        />
        <SidebarLink
          href="/messages"
          icon={<MessageSquareQuote className="size-6" />}
          label="Messages"
        />
        <SidebarLink
          href="/notifications"
          icon={<BellIcon className="size-6" />}
          label="Notifications"
        />
        <SidebarLink
          href={`/${username}`}
          icon={<UserRound className="size-6" />}
          label="Profile"
        />
        <ButtonCreatePost />
      </div>
      <div className="px-2">
        <MoreOptions />
      </div>
    </aside>
  );
};

const SidebarBrand = () => {
  return (
    <div className="px-5.5 mb-8">
      <div className="lg:hidden block">
        <InstagramIcon />
      </div>
      <Link href="/" className="font-title text-4xl hidden lg:block">
        Instagram
      </Link>
    </div>
  );
};

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
};
const SidebarLink = ({ href, icon, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={cn(
        "flex items-center text-xl p-1.5 font-medium hover:bg-foreground/10 gap-2 lg:pr-4 w-max rounded-xl",
        isActive && "bg-foreground/10"
      )}
      href={href}
    >
      <div className="p-2">{icon}</div>
      <span className={isActive ? "font-bold" : ""}>{label}</span>
    </Link>
  );
};

const ButtonCreatePost = () => {
  return (
    <Button className="flex mt-2 items-center gap-2 text-xl p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl">
      <div className="p-2">
        <PlusSquare className="size-6" />
      </div>
      <span className="hidden lg:block">Create Post</span>
    </Button>
  );
};

const ButtonMore = () => {
  return (
    <Button className="flex mt-2 items-center text-xl gap-2 p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl">
      <div className="p-2">
        <Menu className="size-6" />
      </div>
      <span className="hidden lg:block">More</span>
    </Button>
  );
};

function MoreOptions() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(5), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);

  const [openTheme, setOpenTheme] = useState(false);
  const { theme } = useTheme();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const logout = async () => {};

  const t = useTranslations("Sidebar");
  return (
    <>
      <Button
        onClick={() => {
          setOpenTheme(false);
          setOpen((val) => !val);
        }}
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex mt-2 items-center text-xl gap-2 p-1.5 font-medium hover:bg-foreground/10 lg:pr-4 w-max rounded-xl"
      >
        <div className="p-2">
          <Menu className="size-6" />
        </div>
        <span className="hidden lg:block">More</span>
      </Button>

      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className={cn(
                  "bg-skin-elevated-separator w-max space-y-2 overflow-hidden rounded-lg p-2 drop-shadow-sm"
                )}
              >
                {openTheme ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    <div className="flex h-12 items-center justify-between gap-4 pr-2">
                      <ChevronIcon
                        onClick={() => setOpenTheme(false)}
                        className="size-4"
                      />
                      <h1 className="block">{t("switchAppearance")}</h1>
                      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                    </div>
                    <div className="flex h-12 justify-between px-2">
                      <h1>{t("darkMode")}</h1>
                      <SwitchTheme />
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <OptionsButton
                      icon={<SettingsIcon />}
                      label={t("settings")}
                    />
                    <OptionsButton
                      icon={<ActivityIcon />}
                      label={t("recentActivity")}
                    />
                    <OptionsButton icon={<SaveIcon />} label={t("bookMark")} />
                    <OptionsButton
                      onClick={() => {
                        setOpenTheme(true);
                      }}
                      icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
                      label={t("switchAccount")}
                    />
                    <OptionsButton
                      icon={<File />}
                      label={t("reportAProblem")}
                    />
                    <hr className="bg-skin-muted/20 my-2 h-px w-full border-0" />
                    <OptionsButton label={t("switchAccount")} />
                    <OptionsButton onClick={logout} label={t("logout")} />
                  </>
                )}
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
      <LogoutDialog open={isPending} />
    </>
  );
}

export function SwitchTheme() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MySwitch
      isChecked={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}

export const OptionsButton = ({
  icon,
  label,
  ...props
}: {
  label: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      className="hover:bg-foreground/10 flex h-10 w-full cursor-pointer items-center gap-4 rounded-lg p-4"
    >
      {icon}
      {label}
    </Button>
  );
};
