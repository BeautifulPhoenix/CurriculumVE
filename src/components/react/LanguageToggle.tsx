import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

export function LanguageToggle() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const changeLanguage = (lang: string) => {
    let newPath;
    if (currentPath.startsWith("/es") || currentPath.startsWith("/ca")) {
      newPath = currentPath.replace(/^\/(es|ca)/, "");
    }
    newPath = newPath || currentPath;
    
    if (lang !== "en") {
      newPath = `/${lang}${newPath}`;
    }
    window.location.href = newPath || "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={"mx-2 hover:bg-accent hover:text-accent-foreground"}
        >
          <Languages className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          🇪🇸 Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ca")}>
          🏴󠁥󠁳󠁣󠁴󠁿 Català
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}