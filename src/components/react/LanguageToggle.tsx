import * as React from "react";
import { useState, useEffect } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleLanguage = () => {
    const isSpanish = currentPath.startsWith("/es");
    const newPath = isSpanish
      ? currentPath.replace(/^\/es/, "")
      : `/es${currentPath}`;
    window.location.href = newPath || "/";
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className={"mx-2"}
    >
      <Languages className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}