"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      id: 0,
      content: {
        label: "Main",
        href: "/main",
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )}
    },
    {
      id: 1,
      content:{
        label: "Profile",
        href: "/profile",
        icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )}
    },
    {
      id: 2,
      content: {
        label: "Create",
        href: "/create",
        icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )}
    },
    {
      id: 3,
      content: {
        label: "Search",
        href: "/search",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )}
    },
  ];
  const [open, setOpen] = useState(false);
  return (
      <div
          className={cn(
              "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
              "h-screen w-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
          )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo/> : <LogoIcon/>}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link) => (
                    <SidebarLink key={link.id} link={link.content}/>
                ))}
              </div>
            </div>
            <div>
              {open ? <UserButton showName/> : <UserButton/>}
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="p-1 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col justify-between gap-4 w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
  );
}
export const Logo = () => {
  return (
      <Link
          href="#"
          className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <div
            className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-black dark:text-white whitespace-pre"
        >
          Acet Labs
        </motion.span>
      </Link>
  );
};
export const LogoIcon = () => {
  return (
      <Link
          href="#"
          className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      </Link>
  );
};
