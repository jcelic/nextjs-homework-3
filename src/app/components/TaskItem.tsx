import {
  CheckCircleIcon,
  PencilSimpleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  activeId: string | null;
  editInputValue: string;
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  handleEdit: (data: { id: string; title: string; completed: boolean }) => void;
  handleEditClick: (id: string, title: string) => void;
};

const TaskItem = ({
  task,
  activeId,
  editInputValue,
  setEditInputValue,
  setActiveId,
  handleEdit,
  handleEditClick,
}: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {activeId === task.id ? (
        <input
          type="text"
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
            className="rounded-md p-1.5 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => setActiveId(null)}
          >
            <XIcon
              size={20}
              className="text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            />
          </button>

          <button
            className="rounded-md p-1.5 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
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
              className="text-green-600 transition hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            />
          </button>
        </div>
      ) : (
        <>
          <button
            className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            onClick={() => handleEditClick(task.id, task.title)}
          >
            <PencilSimpleIcon size={18} />
          </button>

          <input type="checkbox" className="size-4" />
        </>
      )}
    </div>
  );
};

export default TaskItem;
