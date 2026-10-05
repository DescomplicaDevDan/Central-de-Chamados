import type { ReactNode } from "react";

type ErrorStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function ErrorState({
  action,
  description,
  title,
}: ErrorStateProps) {
  return (
    <section
      className="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold text-red-950">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-800">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}