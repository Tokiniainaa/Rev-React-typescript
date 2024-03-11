import { useState } from "react";
import React from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

type Task = {
  id: string;
  title: string;
};
// TODO: create custom hook to manage task state
const useTaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setTasks(newTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    setTitle,
    searchKeyword,
    handleSearch,
    tasks: filteredTasks,
    addTask,
    completeTask,
    updateTask,
    filteredTasks
  };
};

export const TaskManager = () => {
  const {
    title,
    setTitle,
    searchKeyword,
    handleSearch,
    tasks,
    addTask,
    completeTask,
    updateTask,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

   <ul className="container">
        {tasks.map((task: any) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
