import React from "react";
import clsx from "clsx";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-block px-2 py-1 text-xs font-medium rounded-lg",
        "bg-gray-200 text-gray-800",
        className
      )}
    >
      {children}
    </span>
  );
}
