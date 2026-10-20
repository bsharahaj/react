import type { Status, StatusCounts, Task } from './types';

// All statuses in board order. Annotated with Status[] so a typo is a compile error.
export const STATUSES: readonly Status[] = ['todo', 'doing', 'done'];

interface StatusInfo {
  label: string;
  // The status a task moves to on "Advance"; null means it is already final.
  next: Status | null;
}

// R6: maps a Status to its label and next status by narrowing the union
// with a switch. No casting: inside each case TypeScript knows the exact value.
export function getStatusInfo(status: Status): StatusInfo {
  switch (status) {
    case 'todo':
      return { label: 'To-Do', next: 'doing' };
    case 'doing':
      return { label: 'Doing', next: 'done' };
    case 'done':
      return { label: 'Done', next: null };
    default: {
      // Stretch 1: exhaustiveness check. If a new status is added to the
      // union and not handled above, `status` is no longer `never` here
      // and this line becomes a compile error.
      const unhandled: never = status;
      throw new Error(`Unhandled status: ${String(unhandled)}`);
    }
  }
}

// Returns the task moved one step forward; stops at "done" (returns it unchanged).
export function advanceTask(task: Task): Task {
  const { next } = getStatusInfo(task.status);
  return next === null ? task : { ...task, status: next };
}

// R8: counts are derived from the task list on every render, never stored
// or hard-coded, so they can't get out of sync.
export function countByStatus(tasks: readonly Task[]): StatusCounts {
  const counts: StatusCounts = { todo: 0, doing: 0, done: 0 };
  for (const task of tasks) {
    counts[task.status] += 1;
  }
  return counts;
}

// Narrows an unknown value (e.g. from <select> or storage) to Status
// with a real runtime check instead of a cast.
export function isStatus(value: unknown): value is Status {
  return value === 'todo' || value === 'doing' || value === 'done';
}

// Stretch 3: custom type guard used when loading tasks from localStorage,
// where the data is just `unknown` JSON and could be anything.
export function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;
  if (!('id' in value) || typeof value.id !== 'number') return false;
  if (!('title' in value) || typeof value.title !== 'string') return false;
  if (!('status' in value) || !isStatus(value.status)) return false;
  if ('priority' in value && value.priority !== undefined) {
    if (value.priority !== 'low' && value.priority !== 'high') return false;
  }
  return true;
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}
