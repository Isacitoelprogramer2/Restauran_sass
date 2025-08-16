"use client";


import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { onUserStateChange } from "@/lib/firebase/auth"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"


export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onUserStateChange((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);
  return (
    <div className="bg-black flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-white">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Gestionate
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
