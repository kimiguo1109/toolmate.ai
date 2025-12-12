"use client";

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export function ProgressBar({ progress, label = "Analyzing Persona..." }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-6 justify-between items-center">
        <p className="text-slate-900 dark:text-gray-300 text-sm font-medium leading-normal">
          {label}
        </p>
      </div>
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

