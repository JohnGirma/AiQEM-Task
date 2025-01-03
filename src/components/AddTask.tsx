import React, { useState } from 'react';
import axios from 'axios';

interface AddTaskProps {
  onAddTask: (task: any) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }


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
        onChange={handleTitleChange}
        className="p-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      /> 
      <select 
        value={category} 
        onChange={handleCategoryChange}
        className="p-2 w-full sm:w-auto border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <button 
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        type="submit">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
