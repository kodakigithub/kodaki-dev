'use client';

import { useRef } from 'react';
import { TerminalHeader, TerminalContent } from './terminal';
import { useKeyboardShortcuts, usePrefetch } from '@/hooks/terminal';
import DitherLifeBackground from './DitherLifeBackground';
import { TERMINAL_COLORS } from '@/constants/terminal';

const TerminalInterface = () => {
  const terminalContentRef = useRef<HTMLDivElement>(null);

  usePrefetch();
  useKeyboardShortcuts();

  return (
    <div
      className="terminal-main relative h-full rounded-lg shadow-lg overflow-hidden"
      style={{ background: TERMINAL_COLORS.background }}
    >
      <DitherLifeBackground />
      <div className="relative z-10 flex flex-col h-full">
        <TerminalHeader />
        <TerminalContent ref={terminalContentRef} />
      </div>
    </div>
  );
};

export default TerminalInterface;
