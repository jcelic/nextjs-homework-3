'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useTasks } from './hooks/useTasks';
import { useAddTask } from './hooks/useAddTask';
import { useEditTask } from './hooks/useEditTask';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);

  const { data } = useTasks();
  const { mutate: addTask } = useAddTask();
  const { mutate: editTask } = useEditTask();

  const handleEdit = ({
    id,
    title,
    completed,
  }: {
    id: number;
    title: string;
    completed: boolean;
  }) => {
    editTask({ id, title, completed });
    setActiveId(null);
  };

  const handleEditClick = (id: number, title: string) => {
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
            onClick={() => addTask({ title: inputValue, completed: false })}
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {data?.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4"
            >
              {activeId === task.id ? (
                <input
                  type="text"
                  className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-white outline-none focus:border-zinc-500"
                  value={editInputValue}
                  onChange={(e) => setEditInputValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="flex-1">{task.title}</span>
              )}

              {activeId === task.id ? (
                <div className="flex items-center gap-1">
                  <button
                    className="rounded-md p-1.5 transition hover:bg-zinc-800"
                    onClick={() => setActiveId(null)}
                  >
                    <XIcon
                      size={20}
                      className="text-red-400 transition hover:text-red-300"
                    />
                  </button>

                  <button
                    className="rounded-md p-1.5 transition hover:bg-zinc-800"
                    onClick={() =>
                      handleEdit({
                        id: task.id,
                        title: editInputValue,
                        completed: task.completed,
                      })
                    }
                  >
                    <CheckCircleIcon
                      size={20}
                      className="text-green-400 transition hover:text-green-300"
                    />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="rounded-md p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    onClick={() => handleEditClick(task.id, task.title)}
                  >
                    <PencilSimpleIcon size={18} />
                  </button>

                  <input type="checkbox" className="size-4" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
