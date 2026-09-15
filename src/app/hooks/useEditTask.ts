import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask } from '../api/tasksApi';

export const useEditTask = () => {
  const queryCleint = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryCleint.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
