import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-card dark:bg-dark-surface rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3
      className={`text-xl font-semibold text-foreground dark:text-dark-text ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p
      className={`text-sm text-gray-600 dark:text-dark-text-secondary mt-1 ${className}`}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 sm:px-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div
      className={`px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
