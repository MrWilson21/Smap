import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'

const NavItems = [
  { name: "Home", href: "/" },
  { name: "Add a smell", href: "/add-smell" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b px-2 backdrop-blur bg-teal-500">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/smap.png" alt="smap" width={40} height={40} />
            <span className="hidden font-bold sm:inline-block">
              Smap
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium text-white">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink href="/" className="flex items-center" onOpenChange={() => {}}>
              <span className="h-6 w-6 bg-primary rounded-full mr-2" aria-hidden="true" />
              <span className="font-bold">Smell Tracker</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {NavItems.map((item) => (
                  <MobileLink
                    key={item.name}
                    href={item.href}
                    onOpenChange={() => {}}
                  >
                    {item.name}
                  </MobileLink>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search input or other elements here if needed */}
          </div>
          <nav className="flex items-center">
            {/* You can add user-related items here, like a profile button */}
          </nav>
        </div>
      </div>
    </header>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={
        `text-foreground/70 transition-colors hover:text-foreground
        ${className ?? ''}`
      }
    >
      {children}
    </Link>
  )
}