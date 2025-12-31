import { AuthFooter } from "@/components/Footer"
import FormLogin from "@/features/auth/login/FormLogin"
import Image from "next/image"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex-1 p-10 flex items-center justify-center md:gap-8 max-w-sm md:max-w-4xl mx-auto">
        <div className="hidden md:block flex-2">
          <Image className="w-auto h-auto" src="/landing-2x.png" priority alt="Cover Image" width={500} height={500} />
        </div>
        <div className="flex-1">
          <div className="my-8">
            <h1 className="text-6xl font-title font-bold text-center">Instagram</h1>
          </div>

          <FormLogin />
        </div>

      </div>
      <AuthFooter />
    </main>
  )
}