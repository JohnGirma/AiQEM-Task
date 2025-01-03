import React, { useState } from 'react';
import axios from 'axios';

interface AddTaskProps {
  onAddTask: (task: any) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/api/tasks', {
          title,
          category
        });
        onAddTask(response.data);
        setTitle('');
        setCategory('personal');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 
                  rounded-md bg-white dark:bg-gray-700 
                  text-gray-800 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 w-full sm:w-auto border border-gray-300 dark:border-gray-600 
                  rounded-md bg-white dark:bg-gray-700 
                  text-gray-800 dark:text-white
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <button 
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 
                  text-white rounded-md transition-colors
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                  dark:focus:ring-offset-gray-900"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
