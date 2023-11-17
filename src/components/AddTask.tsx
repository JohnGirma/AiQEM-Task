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
      setCategory('')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={handleTitleChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
