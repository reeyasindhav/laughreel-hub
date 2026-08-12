"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { specials, comedians, clips } from "@/lib/data";
import { comedianName } from "@/lib/data";

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/specials", label: "Specials" },
  { to: "/tours", label: "Tours" },
  { to: "/comedians", label: "Comedians" },
  { to: "/clips", label: "Laughter Shots" },
  { to: "/pricing", label: "Membership" },
  { to: "/about", label: "About Laughreel" },
  { to: "/artists", label: "For Artists" },
  { to: "/contact", label: "Contact" },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      setOpen(false);
      router.navigate({ to });
    },
    [router],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search specials, comedians, clips..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {PAGES.map((page) => (
            <CommandItem key={page.to} onSelect={() => navigate(page.to)}>
              {page.label}
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Specials">
          {specials.map((special) => (
            <CommandItem key={special.id} onSelect={() => navigate(`/specials/${special.id}`)}>
              {special.title} — {comedianName(special.comedian)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Comedians">
          {comedians.map((c) => (
            <CommandItem key={c.slug} onSelect={() => navigate(`/comedians/${c.slug}`)}>
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Clips">
          {clips.map((clip) => (
            <CommandItem key={clip.id} onSelect={() => navigate(`/comedians/${clip.comedian}`)}>
              {clip.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
