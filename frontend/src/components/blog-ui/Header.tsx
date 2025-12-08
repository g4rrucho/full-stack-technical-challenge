import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/theme";
import { Switch } from "@/components/ui/switch";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-md">
      <div className="container mx-auto py-4 px-4 max-w-4xl justify-between flex-row flex items-center">
        <h1 className="text-2xl font-bold">AI Daily Blog</h1>
        <div className="flex gap-2 items-center">
          <Sun />
          <Switch checked={theme === "light"} onCheckedChange={toggleTheme} />
          <Moon />
        </div>
      </div>
    </header>
  );
};

export default Header;
