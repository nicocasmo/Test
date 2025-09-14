import React from 'react';
import type { Subtask } from '../types';

interface SubtaskItemProps {
  subtask: Subtask;
  onToggle: (id: string) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, onToggle }) => {
  return (
    <div className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
      <input
        type="checkbox"
        checked={subtask.completed}
        onChange={() => onToggle(subtask.id)}
        className="h-5 w-5 rounded border-slate-400 text-primary-600 focus:ring-primary-500 cursor-pointer"
      />
      <span className={`flex-grow text-slate-700 dark:text-slate-300 ${subtask.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
        {subtask.text}
      </span>
    </div>
  );
};

export default SubtaskItem;
