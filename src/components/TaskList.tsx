import React from 'react';

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
  categoryFilter: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask,categoryFilter }) => {
    const filteredTasks = categoryFilter ? tasks.filter(task => task.category === categoryFilter) : tasks
    return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onCompleteTask(task.id)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
