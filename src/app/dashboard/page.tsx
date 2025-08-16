"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { getDocuments } from "@/lib/firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setDataLoading(true);
        const allDocs = await getDocuments("dashboardData"); // Cambia "dashboardData" por el nombre de tu colección
        setUserData(allDocs.filter((doc: any) => doc.uid === user.uid));
        setDataLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading || dataLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" user={{
        name: user?.displayName || "Usuario",
        email: user?.email || "",
        avatar: user?.photoURL || "/avatars/default.svg"
      }} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-black text-white min-h-screen">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={userData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
