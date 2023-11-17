import  {useState,useEffect} from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category:string

}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(String)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

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
    <div >
      <h1 className='text-cyan-600 font-bold underline'>ToDo List</h1>
      <AddTask onAddTask={addTask} />
      <div>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter || ''}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>
      <TaskList tasks={tasks} onCompleteTask={completeTask} onDeleteTask={deleteTask} categoryFilter={categoryFilter}/>
    </div>
  );
};

export default App;
