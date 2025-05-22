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
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef, useState } from "react";

const formSchema = z
  .object({
    firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    try {
      await signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
        image: image ? await convertImageToBase64(image) : "",
        callbackURL: "/dashboard",
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success("Conta criada com sucesso!");
            router.push("/sign-in");
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao criar a conta");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Cadastro</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Preencha suas informações para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="João" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input placeholder="Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="j@exemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Senha"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <FormLabel htmlFor="image">
                  Imagem de perfil (opcional)
                </FormLabel>
                <div className="flex items-end gap-4">
                  {imagePreview && (
                    <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                      <Image
                        src={imagePreview}
                        alt="Preview do perfil"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className="flex w-full items-center gap-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                      ref={fileInputRef}
                    />
                    {imagePreview && (
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Criar conta"
                )}
              </Button>

              <div className="mt-4 text-center text-sm">
                Já tem uma conta?{" "}
                <Link href="/sign-in" className="text-primary underline">
                  Entrar
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
