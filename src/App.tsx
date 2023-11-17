import  {useState,useEffect} from 'react';
import './App.css'
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

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
    const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#todo', popover: { title: 'Welcome to ToDo list', description: 'simple ToDo app allows users to add tasks', side: 'top', align: 'start' } },
      { element: '#form', popover: { title: 'Enter task title', description: 'Add tasks with titles and categories' , side: 'right', align: 'end'} },
      { element: '#category', popover: { title: 'Categorize tasks', description: 'Categorize tasks using the dropdown menu', side: 'right', align: 'start' } },
     ]
  });
  driverObj.drive();
  },[]);

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
    <div className="bg-secondery ">
      <h1 id='todo' className='text-primary font-bold text-center text-5xl md:text-7xl pt-16'>ToDo List</h1>
      <div className='flex flex-col  h-screen   items-center gap-10 mt-24 text-white  '>
        <div id='form'>
      <AddTask onAddTask={addTask} />
      </div>
      <div id='category' className='flex items-center gap-2'>
        <label htmlFor="categoryFilter"  className="font-bold text-2xl">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter || ''}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="shadow-2xl rounded bg-primary text-white uppercase p-1 text-tertiary"
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
