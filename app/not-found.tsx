'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
import { useState, useEffect, useRef } from 'react';

export default function NotFound() {
  const pathname = usePathname();
  const [logs, setLogs] = useState<Array<{ id: number; timestamp: string; type: 'info' | 'warn' | 'error' | 'success'; message: string | JSX.Element }>>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateTimestamp = () => {
      const now = new Date();
      return now.toISOString().split('T')[1].slice(0, 12); // HH:mm:ss.ms
    };

    const initialLogs = [
      { id: 1, type: 'info', message: 'System initialized' },
      { id: 2, type: 'info', message: 'Resolving request path...' },
      { id: 3, type: 'info', message: `GET ${pathname}` },
      { id: 4, type: 'warn', message: 'Path not found in static routes' },
      { id: 5, type: 'info', message: 'Checking dynamic route patterns...' },
      { id: 6, type: 'warn', message: 'No matching pattern found' },
      { id: 7, type: 'error', message: '404: Page Not Found' },
      { id: 8, type: 'info', message: 'Listing available routes:' },
      { id: 9, type: 'success', message: <span className="text-green-400">/          (Home)</span> },
      { id: 10, type: 'success', message: <span className="text-green-400">/projects  (Projects)</span> },
      { id: 11, type: 'success', message: <span className="text-green-400">/blog      (Blog)</span> },
      { id: 12, type: 'success', message: <span className="text-green-400">/contact   (Contact)</span> },
      { id: 13, type: 'error', message: 'Terminating request processing' },
    ] as const;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const addLog = () => {
      if (currentIndex < initialLogs.length) {
        const log = initialLogs[currentIndex];
        setLogs(prev => [...prev, { ...log, timestamp: generateTimestamp() }]);
        currentIndex++;

        // Faster logs for better UX
        const delay = Math.random() * 150 + 50;
        timeoutId = setTimeout(addLog, delay);
      }
    };

    addLog();

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-400';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-500';
      case 'success': return 'text-green-400';
      default: return 'text-zinc-400';
    }
  };

  return (
    <>
      <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-2 sm:p-3 md:p-4 lg:p-6 pb-16 lg:pb-6" style={{ background: '#1a1a1a' }}>
        <div className="flex-1 h-full max-w-article mx-auto w-full flex flex-col font-mono text-xs sm:text-sm">
        {/* Header */}
        <div className="border-b border-zinc-800 px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-[#111111] rounded-t-lg">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-zinc-400 text-xs sm:text-sm">System Status:</span>
            <span className="text-red-500 font-bold text-xs sm:text-sm">404 NOT FOUND</span>
          </div>
          <div className="text-zinc-500 text-[10px] sm:text-xs">
            REQ_ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </div>

        {/* Logs Area */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 space-y-0.5 sm:space-y-1 bg-[#111111] text-zinc-300 border-x border-zinc-800">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-1.5 sm:gap-2 md:gap-4 hover:bg-zinc-900/30 p-1 rounded text-[10px] xs:text-xs sm:text-sm">
              <span className="text-zinc-600 select-none w-16 sm:w-20 md:w-24 flex-shrink-0 text-[9px] xs:text-[10px] sm:text-xs">{log.timestamp}</span>
              <span className={`w-3 sm:w-4 flex-shrink-0 text-center font-bold ${getStatusColor(log.type)}`}>
                {log.type === 'success' ? '✓' : log.type === 'error' ? '⨯' : log.type === 'warn' ? '⚠' : 'ℹ'}
              </span>
              <span className={`flex-1 min-w-0 break-words ${log.type === 'error' ? 'text-red-400' : ''}`}>
                {log.message}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Actions Footer */}
        <div className="border-t border-b border-x border-zinc-800 px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 bg-[#111111] flex items-center gap-3 sm:gap-4 rounded-b-lg">
          <Link
            href="/"
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded hover:bg-zinc-700 transition-colors font-medium text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2"
          >
            <span>~/</span> <span className="hidden xs:inline">Return</span> Home
          </Link>

        </div>
      </div>
      </div>
      <MobileBottomNav />
    </>
  );
}
