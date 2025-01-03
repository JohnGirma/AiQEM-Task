import React, { useState } from 'react';
import axios from 'axios';

interface TaskDetailProps {
  task: {
    id: number;
    title: string;
    description?: string;
    category: string;
    completed: boolean;
    createdAt: Date;
  };
  onClose: () => void;
  onUpdate: (updatedTask: any) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onUpdate }) => {
  const [description, setDescription] = useState(task.description || '');
  const [isEditing, setIsEditing] = useState(!task.description);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/tasks/${task.id}/description`, {
        description
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {task.title}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              task.category === 'personal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              task.category === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            }`}>
              {task.category}
            </span>
            <span className={`ml-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
              task.completed 
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {task.completed ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </h3>
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a detailed description..."
                  className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                           resize-none text-base"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white
                             font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg
                             transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                {description ? (
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {description}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 italic">
                    No description added yet.
                  </p>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300
                           font-medium transition-colors"
                >
                  {description ? 'Edit Description' : 'Add Description'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(task.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail; 