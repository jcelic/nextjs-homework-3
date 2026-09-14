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
