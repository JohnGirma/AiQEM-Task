import React from 'react';
import { Trash2 } from 'react-feather';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category:string
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  categoryFilter: string
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask,categoryFilter }) => {
    const filteredTasks = categoryFilter ? tasks.filter(task => task.category === categoryFilter) : tasks
    return (
    <ul className='flex flex-col gap-5'>
      {filteredTasks.map((task) => (
        <li key={task.id} className='flex flex-row justify-between gap-24'>
            <div className='flex flex-row justify-start gap-3'>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onCompleteTask(task.id)}
            className="w-6 h-6 rounded-sm border border-primary"
          />
           
          <span className='text-xl font-medium uppercase ' style={{ textDecoration: task.completed ? 'line-through ' : 'none' }}>
            {task.title}
          </span>
            </div>
          <Trash2 color="red"  onClick={() => onDeleteTask(task.id)}/>
          
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
