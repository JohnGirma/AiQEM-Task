import  {useState,useEffect} from 'react';
import './App.css'
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category:string

}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [categoryFilter, setCategoryFilter] = useState<string>(String)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string,category:string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      category,
    };
    setTasks([...tasks, newTask]);
  };
  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-secondery h-screen ">
      <div className='flex flex-col justify-center items-center gap-4 p-4 text-white'>
      <h1 className='text-primary font-bold  text-4xl'>ToDo List</h1>
      <AddTask onAddTask={addTask} />
      <div className='flex items-center gap-2'>
        <label htmlFor="categoryFilter"  className="font-bold text-2xl">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter || ''}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="shadow-2xl rounded bg-primary text-white uppercase p-1"
        >
          <option value="">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>
      <TaskList tasks={tasks} onCompleteTask={completeTask} onDeleteTask={deleteTask} categoryFilter={categoryFilter}/>
      </div>
    </div>
  );
};

export default App;
