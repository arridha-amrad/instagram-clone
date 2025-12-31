import { AuthFooter } from "@/components/Footer";
import FormSignup from "@/features/auth/signup/FormSignup";

export default function Page() {
  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs mx-auto flex-1 py-8">
        <FormSignup />
      </div>
      <AuthFooter />
    </main>
  );
}
