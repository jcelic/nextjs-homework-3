import { Task } from '../types/task';

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(
    'https://6aa854879b08676cd32bfe49.mockapi.io/api/tasks',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tasks.');
  }

  const data = await response.json();

  return data;
};

export const addTask = async ({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}): Promise<Task> => {
  const response = await fetch(
    'https://6aa854879b08676cd32bfe49.mockapi.io/api/tasks',
    {
      method: 'POST',
      body: JSON.stringify({ title, completed }),
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to add tasks.');
  }

  const data = await response.json();

  return data;
};

export const editTask = async ({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}): Promise<Task> => {
  const response = await fetch(
    `https://6aa854879b08676cd32bfe49.mockapi.io/api/tasks/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ id, title, completed }),
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to edit tasks.');
  }

  const data = await response.json();

  return data;
};
