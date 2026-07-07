'use client';

import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/links";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-6 flex origin-bottom h-full max-h-14 md:hidden">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-gradient-to-t from-white/90 to-transparent dark:from-black/90 dark:to-transparent pointer-events-none"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-full shadow-2xl shadow-emerald-900/10">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                  )}
                >
                  <item.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-malayalam">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-8 bg-slate-200 dark:bg-slate-800" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                    )}
                  >
                    <social.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
      </Dock>
    </div>
  );
}
