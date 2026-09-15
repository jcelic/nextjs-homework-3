'use client';

import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { useAddTask } from './hooks/useAddTask';
import { useEditTask } from './hooks/useEditTask';
import TaskItem from './components/TaskItem';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data } = useTasks();
  const { mutate: addTask } = useAddTask();
  const { mutate: editTask } = useEditTask();

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
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">Tasks</h1>

        <div className="mb-8 flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
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
