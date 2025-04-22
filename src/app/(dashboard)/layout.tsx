import { Stethoscope, LayoutDashboard, History, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSignOut = async () => {
    "use server";
    try {
      await signOut();
      redirect("/sign-in");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Histórico",
      url: "/dashboard/history",
      icon: History,
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/30">
        {/* Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-primary">EscutaMed</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        // isActive={pathname === item.url}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border">
            <Button
              variant="ghost"
              className="flex w-full justify-start gap-2 px-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center bg-background">
          <SidebarTrigger className="mt-2 self-start" />
          <div className="flex w-full max-w-7xl justify-start px-4 py-4"></div>
          <div className="w-full max-w-7xl flex-1 px-4 pb-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
