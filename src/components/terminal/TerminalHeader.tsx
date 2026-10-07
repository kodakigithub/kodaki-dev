import { TERMINAL_COLORS } from '@/constants/terminal';

export function TerminalHeader() {
  return (
    <div
      className="px-3 sm:px-4 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm"
      style={{ background: TERMINAL_COLORS.backgroundTransparent }}
    >
      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-red-400" />
      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400" />
      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 rounded-full bg-green-400" />
    </div>
  );
}
