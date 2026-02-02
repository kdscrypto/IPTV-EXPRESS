import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 glass rounded-lg p-1">
      <Globe className="w-4 h-4 text-muted-foreground mx-1" />
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`h-7 px-2 text-xs font-semibold ${
          language === "en" 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-primary/10"
        }`}
      >
        EN
      </Button>
      <Button
        variant={language === "fr" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("fr")}
        className={`h-7 px-2 text-xs font-semibold ${
          language === "fr" 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-primary/10"
        }`}
      >
        FR
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
