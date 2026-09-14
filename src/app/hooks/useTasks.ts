import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasksApi';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};
