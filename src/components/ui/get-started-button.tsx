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
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
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
  to,
  href,
  target,
  rel,
  size = "md",
  fullWidth = false,
}: GetStartedButtonProps) {
  const isDisabled = disabled || isLoading;

  const sizeClasses =
    size === "sm"
      ? "h-10 px-5 text-sm"
      : size === "lg"
        ? "h-12 px-7 text-base"
        : "h-11 px-6 text-sm";

  const widthClasses = fullWidth ? "w-full sm:w-auto" : "";

  const commonInteractive =
    "inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background";

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
      "group relative overflow-hidden rounded-2xl",
      sizeClasses,
      widthClasses,
      "bg-card/20 backdrop-blur-md border border-primary/35 text-primary",
      "hover:bg-primary/10 hover:border-primary/60",
      "shadow-lg shadow-black/15",
      className
    );

    const Anchor = href ? (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : 0}
        className={cn(commonInteractive, "transition-colors", isDisabled && "pointer-events-none opacity-50", buttonClasses)}
      >
        {content}
      </a>
    ) : null;

    if (Anchor) return Anchor;

    if (to && !isDisabled) {
      return (
        <Link to={to} className={cn(commonInteractive, "transition-colors", buttonClasses)}>
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
    "group relative overflow-hidden rounded-2xl",
    sizeClasses,
    widthClasses,
    "bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground",
    "ring-1 ring-white/10",
    "shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35",
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
    className
  );

  if (href && !isLoading) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : 0}
        className={cn(commonInteractive, "transition-colors", isDisabled && "pointer-events-none opacity-50", buttonClasses)}
      >
        {content}
      </a>
    );
  }

  if (to && !isLoading && !isDisabled) {
    return (
      <Link
        to={to}
        className={cn(commonInteractive, "transition-colors", buttonClasses)}
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
