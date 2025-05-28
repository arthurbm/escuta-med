"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { forgetPassword } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const loading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      await forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });

      setEmailSent(true);
      toast.success("E-mail de recuperação enviado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao enviar o e-mail de recuperação");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Recuperar Senha</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {!emailSent
              ? "Digite seu e-mail para receber as instruções de recuperação de senha"
              : "Verifique seu e-mail para as instruções de redefinição de senha"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!emailSent ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@exemplo.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Enviar instruções"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="grid gap-4">
              <p className="text-center">
                Enviamos um e-mail com instruções para redefinir sua senha.
                Verifique sua caixa de entrada e também a pasta de spam.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            Lembrou sua senha?{" "}
            <Link href="/sign-in" className="text-primary underline">
              Voltar para o login
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-center border-t py-4">
            <p className="text-center text-xs text-neutral-500">
              Desenvolvido por{" "}
              <Link
                href="https://better-auth.com"
                className="underline"
                target="_blank"
              >
                <span className="dark:text-orange-200/90">better-auth.</span>
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
