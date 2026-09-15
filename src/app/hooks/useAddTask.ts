import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '../api/tasksApi';
import { Task } from '../types/task';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onMutate: async (newTask) => {
      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        ...newTask,
      };
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData<Task[]>(['tasks'], (old) => [
        ...(old ?? []),
        optimisticTask,
      ]);
      return { previous };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
