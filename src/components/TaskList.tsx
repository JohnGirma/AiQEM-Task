import React from 'react';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleComplete: (id: number) => void;
  categoryFilter: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleComplete, categoryFilter }) => {
  const filteredTasks = categoryFilter 
    ? tasks.filter(task => task.category === categoryFilter) 
    : tasks;

  return (
    <div className="mt-8 space-y-3">
      {filteredTasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-4 rounded-lg border ${
            task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div className="flex flex-col">
              <span className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {task.title}
              </span>
              <span className={`text-sm ${
                task.category === 'personal' ? 'text-green-600' :
                task.category === 'work' ? 'text-blue-600' : 'text-purple-600'
              }`}>
                {task.category}
              </span>
            </div>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
