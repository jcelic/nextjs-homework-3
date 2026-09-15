'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';

import { Task } from '../types/task';
import { useEditTask } from '../hooks/useEditTask';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(task.title);

  const { mutate: editTask } = useEditTask();

  const handleEditClick = () => {
    setEditInputValue(task.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask({
      id: task.id,
      title: editInputValue,
      completed: task.completed,
    });

    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 transition ${
        task.completed
          ? 'border-zinc-200 bg-zinc-100 opacity-60 dark:border-zinc-800 dark:bg-zinc-900'
          : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          value={editInputValue}
          onChange={(e) => setEditInputValue(e.target.value)}
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${
            task.completed ? 'text-zinc-500 line-through' : ''
          }`}
        >
          {task.title}
        </span>
      )}

      {isEditing ? (
        <div className="flex items-center gap-1">
          <button
            className="rounded-md p-1.5 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => setIsEditing(false)}
          >
            <XIcon
              size={20}
              className="text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            />
          </button>

          <button
            className="rounded-md p-1.5 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={handleSave}
          >
            <CheckCircleIcon
              size={20}
              className="text-green-600 transition hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            />
          </button>
        </div>
      ) : (
        <>
          <button
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            onClick={handleEditClick}
          >
            <PencilSimpleIcon size={18} />
          </button>

          <input
            type="checkbox"
            className="size-4 cursor-pointer"
            checked={task.completed}
            onChange={() =>
              editTask({
                id: task.id,
                title: task.title,
                completed: !task.completed,
              })
            }
          />
        </>
      )}
    </div>
  );
};

export default TaskItem;
