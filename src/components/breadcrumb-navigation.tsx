import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbNavigation() {
  const pathname = usePathname()
  
  // Define breadcrumb paths
  const breadcrumbs = [
    {
      href: "/",
      label: "Home"
    },
    {
      href: "/dashboard",
      label: "Dashboard"
    },
    {
      href: "/dashboard/recetas",
      label: "Recetas"
    },
    {
      href: "/dashboard/recetas/nueva-receta",
      label: "Nueva Receta"
    }
  ]



  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-background rounded-md border px-3 py-2 shadow-xs">
        {breadcrumbs.filter(breadcrumb =>
          pathname.startsWith(breadcrumb.href) ||
          (pathname === "/" && breadcrumb.href === "/")
        ).map((breadcrumb, index, array) => (
          <BreadcrumbItem key={breadcrumb.href}>
            {index === array.length - 1 ? (
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={breadcrumb.href}>
                {breadcrumb.label}
              </BreadcrumbLink>
            )}
            {index < array.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
