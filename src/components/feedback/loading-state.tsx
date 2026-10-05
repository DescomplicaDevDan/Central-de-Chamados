type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = "Carregando dados...",
}: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700"
      role="status"
    >
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-700"
      />

      <span>{message}</span>
    </div>
  );
}
