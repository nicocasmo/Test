import React, { useState, useEffect } from 'react';
import type { Task, Subtask } from './types';
import NewTaskForm from './components/NewTaskForm';
import TaskCard from './components/TaskCard';
import DevNotesModal from './components/DevNotesModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  const handleAddTask = (name: string, subtaskTexts: { text: string }[]) => {
    const newSubtasks: Subtask[] = subtaskTexts.map(st => ({
      id: crypto.randomUUID(),
      text: st.text,
      completed: false,
    }));

    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      subtasks: newSubtasks,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const handleAddSubtask = (taskId: string, subtaskText: string) => {
    if (!subtaskText.trim()) return;

    const newSubtask: Subtask = {
      id: crypto.randomUUID(),
      text: subtaskText.trim(),
      completed: false,
    };

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...task.subtasks, newSubtask],
            }
          : task
      )
    );
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(subtask =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <main className="max-w-2xl mx-auto p-4 sm:p-6">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-500">
            Smart Task Manager
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Organize your work and life, one task at a time.
          </p>
        </header>

        <NewTaskForm onAddTask={handleAddTask} />

        <div className="mt-12">
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onDelete={handleDeleteTask}
                        onToggleSubtask={handleToggleSubtask}
                        onAddSubtask={handleAddSubtask}
                    />
                ))
            ) : (
                <div className="text-center py-12 px-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-100">All Clear!</h3>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Add a new task above to get started.</p>
                </div>
            )}
        </div>
      </main>
      <footer className="text-center py-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            Developer & Deployment Notes
          </button>
      </footer>
      <DevNotesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
