import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children, className, ...props }: LabelProps) {
  const classes = [
    "block text-sm font-medium text-slate-800",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}