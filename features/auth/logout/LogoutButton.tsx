import { OptionsButton } from "@/components/sidebarOld/Options";
import { authClient } from "@/lib/authClient";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { TransitionStartFunction } from "react";

type Props = {
  st: TransitionStartFunction;
};

export default function LogoutButton({ st }: Props) {
  const t = useTranslations("Sidebar");
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut();
    st(() => {
      router.replace("/auth/login");
    });
  };

  return <OptionsButton onClick={logout} label={t("logout")} />;
}
