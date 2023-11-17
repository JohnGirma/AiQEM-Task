import React, { useState } from 'react';

interface AddTaskProps {
  onAddTask: (title: string, category: string) => void;
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      onAddTask(title, category);
      setTitle('');
      setCategory(category)
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-4 flex-wrap justify-center text-tertiary'>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={handleTitleChange}
        className='p-1 border border-primary rounded font-medium text-slate-300'
      /> 
      <select 
        value={category} 
        onChange={handleCategoryChange}
        className='p-1  bg-primary rounded font-medium '>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <button 
        className='p-1  bg-primary rounded font-medium text-slate-300'
        type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
