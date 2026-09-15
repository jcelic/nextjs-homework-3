'use client';

import { useState } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTasks } from './hooks/useTasks';
import { useAddTask } from './hooks/useAddTask';
import { useEditTask } from './hooks/useEditTask';
import { useTheme } from './store/useTheme';
import TaskItem from './components/TaskItem';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data } = useTasks();
  const { mutate: addTask } = useAddTask();
  const { mutate: editTask } = useEditTask();

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const handleAdd = () => {
    addTask({ title: inputValue, completed: false });
    setInputValue('');
  };

  const handleEdit = ({
    id,
    title,
    completed,
  }: {
    id: string;
    title: string;
    completed: boolean;
  }) => {
    editTask({ id, title, completed });
    setActiveId(null);
  };

  const handleEditClick = (id: string, title: string) => {
    setActiveId(id);
    setEditInputValue(title);
  };

  return (
    <main
      className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-white px-4 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-white`}
    >
      <div className="mx-auto max-w-xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tasks</h1>

          <button
            onClick={toggleTheme}
            className="rounded-lg border border-zinc-300 p-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>

        <div className="mb-8 flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {data?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              activeId={activeId}
              editInputValue={editInputValue}
              setEditInputValue={setEditInputValue}
              setActiveId={setActiveId}
              handleEdit={handleEdit}
              handleEditClick={handleEditClick}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
