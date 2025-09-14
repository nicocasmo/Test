import React, { useState } from 'react';
import type { Task } from '../types';
import SubtaskItem from './SubtaskItem';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, subtaskText: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggleSubtask, onAddSubtask }) => {
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtaskText.trim()) {
        onAddSubtask(task.id, newSubtaskText);
        setNewSubtaskText('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{task.name}</h3>
        <button 
          onClick={() => onDelete(task.id)} 
          className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full"
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {task.subtasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Progress
            </span>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              {completedSubtasks} / {totalSubtasks}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {task.subtasks.map(subtask => (
          <SubtaskItem 
            key={subtask.id} 
            subtask={subtask} 
            onToggle={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
          />
        ))}
        {task.subtasks.length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 py-4">No subtasks for this item.</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleAddSubtask} className="flex gap-2">
              <input
                  type="text"
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  placeholder="Add a new subtask..."
                  className="flex-grow px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:text-white transition"
                  aria-label="New subtask text"
              />
              <button
                  type="submit"
                  disabled={!newSubtaskText.trim()}
                  className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-sm hover:bg-primary-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition"
                  aria-label="Add new subtask"
              >
                  Add
              </button>
          </form>
      </div>
    </div>
  );
};

export default TaskCard;
