"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className="flex w-full justify-start gap-2 px-2"
      onClick={handleSignOut}
    >
      <LogOut className="h-5 w-5" />
      <span>Sair</span>
    </Button>
  );
}
