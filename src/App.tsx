import  { useState } from 'react';
import AddTask from './components/AddTask';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <h1>My To-Do List</h1>
      <AddTask onAddTask={addTask} />
    </>
  );
};

export default App;
