import {
  RiGoogleFill,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="bg-neutral-800 border-neutral-500 text-white">
        <RiGoogleFill
          className="me-1 text-neutral-400 dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Ingresar con Google
      </Button>      
    </div>
  )
}
