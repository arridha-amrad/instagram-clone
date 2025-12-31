"use client";

import { PasswordFieldForAuth, TextFieldForAuth } from "@/components/Input";
import { Button } from "@headlessui/react";
import Link from "next/link";
import GoogleAuthButton from "../loginWithGoogle/GoogleAuthButton";
import GithubAuthButton from "../loginWithGithub/GithubAuthButton";
import DividerOr from "@/components/DividerOr";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FormLogin() {
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

  return (
    <fieldset disabled={false}>
      <form className="w-full space-y-2">
        <TextFieldForAuth
          name="email"
          label="Email"
          onChange={handleChange}
          value={formState.email}
        />
        <PasswordFieldForAuth
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <div className="mt-4">
          <Button
            type="submit"
            className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
          >
            Sign Up
            <Loader2 className="size-4 animate-spin" />
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
