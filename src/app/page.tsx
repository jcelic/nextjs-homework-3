'use client';

import { useTasks } from './hooks/useTasks';

export default function Home() {
  const { data } = useTasks();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold">Tasks</h1>

        <div className="mb-8 flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
          />

          <button className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
            Add
          </button>
        </div>

        <div className="space-y-3">
          {data?.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4"
            >
              <span className="flex-1">{task.title}</span>
              <input type="checkbox" className="size-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
