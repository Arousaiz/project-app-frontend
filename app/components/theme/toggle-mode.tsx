import { Moon, Sun } from "lucide-react";

import { useTheme } from "./theme-provider";
import { useEffect } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("animate-fade-out");
      root.classList.add("animate-fade-in");
    } else {
      root.classList.remove("animate-fade-in");
      root.classList.add("animate-fade-out");
    }

    const timer = setTimeout(() => {
      root.classList.remove("animate-fade-in", "animate-fade-out");
    }, 800);

    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <PrimaryButton
      variant="secondary"
      size="icon"
      className="hidden sm:flex"
      onClick={() => {
        if (theme === undefined || theme === null) {
          setTheme("system");
        } else {
          setTheme(theme === "light" ? "dark" : "light");
        }
      }}
    >
      <Sun className="size-8 p-1 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="size-8 p-1 absolute rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </PrimaryButton>
  );
}
