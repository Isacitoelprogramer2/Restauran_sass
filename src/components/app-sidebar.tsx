"use client"

import * as React from "react"
import {
  IconClipboardList,
  IconTrendingUp,
  IconInnerShadowTop,
} from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Recetas",
      url: "#",
      icon: IconClipboardList,
    },
    {
      title: "Proyecciones",
      url: "#",
      icon: IconTrendingUp,
    },
  ],
  documents: [],
  navSecondary: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <div className="bg-black text-white h-full flex flex-col">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />     
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}
