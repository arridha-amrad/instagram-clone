"use client";

import DividerOr from "@/components/DividerOr";
import { PasswordFieldForAuth, TextFieldForAuth } from "@/components/Input";
import { Button } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import GithubAuthButton from "../loginWithGithub/GithubAuthButton";
import GoogleAuthButton from "../loginWithGoogle/GoogleAuthButton";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

const initialState = {
  error: "",
  success: false,
  validationErrors: undefined,
};

export default function FormLogin() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const [state, action, pending] = useActionState(loginAction, initialState);

  const emailErr = state?.validationErrors?.email?.errors[0];
  const passwordErr = state?.validationErrors?.password?.errors[0];

  useEffect(() => {
    if (state.success) {
      router.replace("/");
    }
  }, [state.success]);

  return (
    <fieldset disabled={pending}>
      <div className="mb-4">
        <p className="text-red-400 text-center text-sm">{state?.error}</p>
      </div>
      <form className="w-full space-y-2" action={action}>
        <TextFieldForAuth
          name="email"
          label="Email"
          onChange={handleChange}
          value={formState.email}
          error={emailErr}
        />
        <PasswordFieldForAuth
          name="password"
          value={formState.password}
          onChange={handleChange}
          error={passwordErr}
        />
        <div className="mt-4">
          <Button
            type="submit"
            className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
          >
            Login
            {pending && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </div>
      </form>

      <DividerOr />

      <div className="flex gap-4 items-center justify-center mb-4">
        <GoogleAuthButton />
        <GithubAuthButton />
      </div>

      <div className="text-center my-4">
        <Link className="text-sm font-medium" href="/auth/login">
          Forgot Password?
        </Link>
      </div>

      <div className="flex items-center justify-center font-medium text-sm my-8">
        <span>Don't have an account ?&nbsp;</span>
        <Link className="text-sky-500 font-semibold" href="/auth/signup">
          Sign Up
        </Link>
      </div>
    </fieldset>
  );
}
