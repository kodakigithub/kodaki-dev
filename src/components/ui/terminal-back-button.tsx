import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalBackButtonProps {
  onClick: () => void;
  variant?: 'purple' | 'amber';
  className?: string;
}

const TerminalBackButton: React.FC<TerminalBackButtonProps> = ({ 
  onClick, 
  variant = 'purple',
  className 
}) => {
  const baseStyles = "ml-2 px-2 py-0.5 text-sm border rounded cursor-pointer transition-colors";
  const variantStyles = {
    purple: "text-purple-400 border-purple-800/30 hover:bg-purple-900/20",
    amber: "text-terminal-amber border-terminal-amber/30 hover:bg-terminal-amber/10"
  };

  return (
    <div 
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
    >
      ← back
    </div>
  );
};

export default TerminalBackButton; 