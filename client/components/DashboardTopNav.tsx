"use client"

import { ReactNode } from 'react'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Banknote, Folder, HomeIcon, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { FaTasks, FaUsers } from 'react-icons/fa'
import { FaArrowsTurnRight } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";


export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-6">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Analytics Engine</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/organisations">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Organisations
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/content">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Content
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    <FaTasks className="mr-2 h-4 w-4" />
                    Events
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/recommendations">
                  <Button variant="outline" className="w-full">
                    <FaArrowsTurnRight className="mr-2 h-4 w-4" />
                    Recommendations
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/contacts">
                  <Button variant="outline" className="w-full">
                    <TiContacts className="mr-2 h-4 w-4" />
                    Contacts
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/users">
                  <Button variant="outline" className="w-full">
                    <FaUsers className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-3 ml-auto">
          <h1>Analytics Engine for RHV By Mohamed Ali</h1>
        </div>
      </header>
      {children}
    </div>
  )
}