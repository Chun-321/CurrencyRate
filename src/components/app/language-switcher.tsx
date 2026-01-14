"use client";

import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { LanguageContext } from "@/contexts/language-context";

export function LanguageSwitcher() {
  const { setLanguage, dictionary } = useContext(LanguageContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{dictionary.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          {dictionary.english}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("zh-TW")}>
          {dictionary.traditionalChinese}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
