
import React, { useState } from 'react';

interface NewTaskFormProps {
  onAddTask: (name: string, subtasks: { text: string }[]) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName, []);
      setTaskName('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            New Task Name
          </label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g., Plan a weekend trip"
            className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition"
          />
        </div>
        <button
          type="submit"
          disabled={!taskName.trim()}
          className="w-full px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;