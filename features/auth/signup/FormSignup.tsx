"use client";

import { PasswordFieldForAuth, TextFieldForAuth } from "@/components/Input";
import { Button } from "@headlessui/react";
import Link from "next/link";
import GoogleAuthButton from "../loginWithGoogle/GoogleAuthButton";
import GithubAuthButton from "../loginWithGithub/GithubAuthButton";
import DividerOr from "@/components/DividerOr";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { signupAction } from "./action";

const initState = {
  message: "",
};

export default function FormSignup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const [state, action, pending] = useActionState(signupAction, initState);

  const fullNameErr = state.validationErrors?.fullname?.errors[0];
  const emailErr = state.validationErrors?.email?.errors[0];
  const passwordErr = state.validationErrors?.password?.errors[0];
  const usernameErr = state.validationErrors?.username?.errors[0];

  return (
    <fieldset disabled={pending}>
      <div className="border w-full border-foreground/20 rounded-lg px-4 py-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-title font-bold text-center">
            Instagram
          </h1>
          <p className="font-bold text-foreground/50 text-center">
            Sign up to see photos and videos from your friends.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center my-4">
          <GoogleAuthButton />
          <GithubAuthButton />
        </div>
        <DividerOr />
        {!!state.message && (
          <div className="mb-4">
            <p className="text-center text-xs font-light text-green-500">
              {state.message}
            </p>
          </div>
        )}
        <form className="w-full space-y-2" action={action}>
          <TextFieldForAuth
            name="email"
            label="Email"
            value={formState.email}
            onChange={handleChange}
            error={emailErr}
          />
          <PasswordFieldForAuth
            onChange={handleChange}
            name="password"
            value={formState.password}
            error={passwordErr}
          />
          <TextFieldForAuth
            onChange={handleChange}
            name="fullname"
            label="Fullname"
            value={formState.fullname}
            error={fullNameErr}
          />
          <TextFieldForAuth
            onChange={handleChange}
            name="username"
            label="Username"
            value={formState.username}
            error={usernameErr}
          />
          <div className="mt-4">
            <p className="text-center text-xs font-light text-foreground/50">
              People who use our service may have uploaded your contact
              information to Instagram. Learn More
            </p>
          </div>
          <div className="my-4">
            <p className="text-center text-xs font-light text-foreground/50">
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </p>
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
            >
              Sign Up
              {pending && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </div>

      <div className="border-foreground/20 flex w-full max-w-sm items-center justify-center mt-4 border rounded-lg py-6">
        <p className="text-sm">
          Have an account ?&nbsp;
          <Link className="text-skin-primary font-semibold" href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </fieldset>
  );
}
