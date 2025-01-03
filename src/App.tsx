import  { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  description?: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <ThemeToggle />
        <div className="py-8 px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
              Task Manager
            </h1>
            <AddTask onAddTask={handleAddTask} />
            
            <div className="mt-8 flex justify-center items-center gap-4">
              <label htmlFor="categoryFilter" className="text-gray-700 dark:text-gray-300 font-medium">
                Filter by Category:
              </label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Tasks</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <TaskList 
              tasks={tasks} 
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              categoryFilter={categoryFilter}
              onTaskUpdate={handleTaskUpdate}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
