'use client';
import { useTasks } from './hooks/useTasks';

export default function Home() {
  const { data } = useTasks();

  return <div></div>;
}
