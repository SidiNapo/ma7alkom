import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface GetStartedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  to?: string;
}

export function GetStartedButton({ 
  children, 
  className, 
  onClick, 
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText,
  variant = "primary",
  icon,
  to
}: GetStartedButtonProps) {
  const isDisabled = disabled || isLoading;

  if (variant === "secondary") {
    const content = (
      <>
        <span className="transition-all duration-300 group-hover:mr-4 flex items-center gap-2">
          {icon}
          {children}
        </span>
        <ChevronRight 
          size={16} 
          strokeWidth={2} 
          aria-hidden="true" 
          className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
        />
      </>
    );

    const buttonClasses = cn(
      "group relative overflow-hidden bg-transparent border-2 border-primary/40 hover:border-primary hover:bg-primary/10 text-primary h-11 px-6 rounded-xl",
      className
    );

    if (to) {
      return (
        <Link to={to} className={cn("inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", buttonClasses)}>
          {content}
        </Link>
      );
    }

    return (
      <Button 
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={buttonClasses}
        size="lg"
      >
        {content}
      </Button>
    );
  }

  // Primary variant
  const content = isLoading ? (
    <span className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      {loadingText || children}
    </span>
  ) : (
    <>
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 flex items-center gap-2">
        {icon}
        {children}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-md z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" className="text-primary-foreground" />
      </i>
    </>
  );

  const buttonClasses = cn(
    "group relative overflow-hidden h-11 px-6 rounded-xl",
    "bg-gradient-to-r from-primary via-primary to-accent",
    "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35",
    className
  );

  if (to && !isLoading) {
    return (
      <Link 
        to={to} 
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-primary-foreground",
          buttonClasses
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button 
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      size="lg"
    >
      {content}
    </Button>
  );
}
