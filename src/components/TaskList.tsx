import React, { useState } from 'react';
import TaskDetail from './TaskDetail';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
  categoryFilter: string;
  onTaskUpdate: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleComplete, categoryFilter, onTaskUpdate }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const filteredTasks = categoryFilter 
    ? tasks.filter(task => task.category === categoryFilter) 
    : tasks;

  const handleTaskUpdate = (updatedTask: Task) => {
    // Update the task in the parent component
    onTaskUpdate(updatedTask);
  };

  return (
    <div className="mt-8 space-y-3">
      {filteredTasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-4 rounded-lg border
            ${task.completed 
              ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            } hover:shadow-md transition-shadow cursor-pointer`}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest('button') && 
                !(e.target as HTMLElement).closest('input')) {
              setSelectedTask(task);
            }
          }}
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                e.stopPropagation();
                onToggleComplete(task.id);
              }}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 
                        text-blue-500 focus:ring-blue-500 
                        dark:bg-gray-700 dark:checked:bg-blue-500"
            />
            <div className="flex flex-col">
              <span className={`font-medium ${
                task.completed 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-800 dark:text-white'
              }`}>
                {task.title}
              </span>
              <span className={`text-sm ${
                task.category === 'personal' 
                  ? 'text-green-600 dark:text-green-400' 
                  : task.category === 'work' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-purple-600 dark:text-purple-400'
              }`}>
                {task.category}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task.id);
            }}
            className="p-2 text-red-500 dark:text-red-400 
                      hover:text-red-700 dark:hover:text-red-300 
                      hover:bg-red-50 dark:hover:bg-red-900/20 
                      rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default TaskList;
