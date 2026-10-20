import type { Task } from '../types';
import { getStatusInfo } from '../status';

// R3: typed props. A Task plus two callbacks that only need the id.
interface TaskCardProps {
  task: Task;
  onAdvance: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TaskCard({ task, onAdvance, onRemove }: TaskCardProps) {
  const { label, next } = getStatusInfo(task.status);

  return (
    <div className={`task-card status-${task.status}`}>
      <div className="task-main">
        <span className="task-title">{task.title}</span>
        {task.priority === 'high' && <span className="priority">high</span>}
      </div>
      <span className={`badge ${task.status}`}>{label}</span>
      <button
        type="button"
        onClick={() => onAdvance(task.id)}
        // Derived from the narrowed status: nothing to advance to after "done".
        disabled={next === null}
        title={next === null ? 'Already done' : `Move to ${getStatusInfo(next).label}`}
      >
        Advance
      </button>
      <button
        type="button"
        className="remove"
        onClick={() => onRemove(task.id)}
        aria-label={`Remove ${task.title}`}
      >
        ×
      </button>
    </div>
  );
}
